import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../interfaces/diccionario';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    public auth: AngularFireAuth,

    public firestore: AngularFirestore
  ) {}

  //enviar solicitud
  sendFriendRequest(senderId: string, receiverId: string) {
    //verificar si ya son amigos
    return this.firestore
      .collection('users')
      .doc(senderId)
      .collection('friends')
      .doc(receiverId)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc?.exists) {
          return Promise.reject(
            new Error(`ya eres amigo del usuario ${receiverId}.`)
          );
        }
        //verifica si el usuario existe
        return this.firestore
          .collection('users')
          .doc(receiverId)
          .get()
          .toPromise();
      })
      .then((receiverDoc) => {
        if (!receiverDoc?.exists) {
          return Promise.reject(
            new Error(`El usuario no existe ${receiverId}`)
          );
        }

        return this.firestore
          .collection('users')
          .doc(senderId)
          .get()
          .toPromise();
      })
      .then((senderDoc) => {
        if (senderDoc?.exists) {
          const data = senderDoc.data() as User;
          const name = data.name || 'sin datos';

          const request = {
            sender: senderId,
            receiver: receiverId,
            status: 'pending',
            date: new Date(),
            name: name,
          };

          return this.firestore
            .collection('users')
            .doc(receiverId)
            .collection('requests')
            .doc(senderId)
            .set(request);
        } else {
          return Promise.reject(
            new Error(`El usuario con ID ${senderId} no existe.`)
          );
        }
      });
  }

  acceptFriendRequest(requestId: string, senderId: string, receiverId: string) {
    return this.firestore
      .collection('users')
      .doc(senderId)
      .get()
      .toPromise()
      .then((senderDoc) => {
        if (senderDoc?.exists) {
          const senderData = senderDoc.data() as User;
          const senderName = senderData.name || 'sin datos';
          const friendImage = senderData.profileImageUrl || 'sin datos';

          return this.firestore
            .collection('users')
            .doc(receiverId)
            .get()
            .toPromise()
            .then((receiverDoc) => {
              if (receiverDoc?.exists) {
                const receiverData = receiverDoc.data() as User;
                const receiverName = receiverData.name || 'sin datos';

                const chatId = this.firestore.createId(); // ID único compartido

                const senderFriendRef = this.firestore
                  .collection('users')
                  .doc(senderId)
                  .collection('friends')
                  .doc(receiverId);
                const receiverFriendRef = this.firestore
                  .collection('users')
                  .doc(receiverId)
                  .collection('friends')
                  .doc(senderId);

                const chatRef = this.firestore.collection('chats').doc(chatId);

                return senderFriendRef
                  .set({
                    friendId: receiverId,
                    name: receiverName,
                    chatId,
                    friendImage: friendImage,
                  })
                  .then(() => {
                    return receiverFriendRef.set({
                      friendId: senderId,
                      name: senderName,
                      chatId,
                      friendImage: friendImage,
                    });
                  })
                  .then(() => {
                    return chatRef.collection('messages').doc().set({
                      msg: 'Chat iniciado',
                      timestamp: new Date(),
                    });
                  })
                  .then(() => {
                    return this.firestore
                      .collection('users')
                      .doc(receiverId)
                      .collection('requests')
                      .doc(requestId)
                      .delete();
                  });
              } else {
                throw new Error(`El usuario con ID ${receiverId} no existe.`);
              }
            });
        } else {
          throw new Error(`El usuario con ID ${senderId} no existe.`);
        }
      });
  }

  //rechazar solicitud
  rejectFriendRequest(requestId: string, senderId: string, receiverId: string) {
    return this.firestore
      .collection('users')
      .doc(receiverId)
      .collection('requests')
      .doc(requestId)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc?.exists) {
          return this.firestore
            .collection('users')
            .doc(receiverId)
            .collection('requests')
            .doc(requestId)
            .delete()
            .then(() => {
              console.log(`ssolicitud de amistad rechazada: ${requestId}`);
            });
        } else {
          throw new Error(`la solicitud con ID ${requestId} no existe.`);
        }
      })
      .catch((error) => {
        console.error(`Error al rechazar la solicitud:`, error);
        throw error;
      });
  }

  //obtener lista de amigos
  getFriends(userId: string): Observable<any[]> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('friends')
      .valueChanges();
  }
  //obtener solicitud pendientes
  getFriendRequests(userId: string): Observable<any[]> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('requests')
      .valueChanges({ idField: 'id' });
  }
  //eliminar amigo
  deleteFriend(friendId: string, userId: string) {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('friends')
      .doc(friendId)
      .delete()
      .then(() => {
        return this.firestore
          .collection('users')
          .doc(friendId)
          .collection('friends')
          .doc(userId)
          .delete();
      })
      .then(() => {
        console.log(`Amigo ${friendId} eliminado correctamente`);
      })
      .catch((error) => {
        console.error(`Error al eliminar amigo ${friendId}:`, error);
        throw error;
      });
  }
  //chats
  //obtner id friend

  //mostrar chat user

  listChats(userId: string, friendId: string): Observable<any[]> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('friends')
      .doc(friendId)
      .get()
      .pipe(
        switchMap((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const chatId = data?.['chatId'];
            if (chatId) {
              return this.firestore
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .valueChanges();
            } else {
              throw new Error('El chatId no existe en el documento de amigos.');
            }
          } else {
            throw new Error('El documento de amigos no existe.');
          }
        })
      );
  }

  //enviar mensaje
  sendMessage(
    chatId: string,
    senderId: string,
    message: string
  ): Promise<void> {
    const messageId = this.firestore.createId();
    const timestamp = new Date();

    return this.firestore
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .doc(messageId)
      .set({
        msg: message,
        senderId: senderId,
        timestamp: timestamp,
      });
  }
  //obtener idchat
  async getChatId(
    userId: string,
    friendId: string
  ): Promise<string | undefined> {
    const docSnapshot = await lastValueFrom(
      this.firestore
        .collection('users')
        .doc(userId)
        .collection('friends')
        .doc(friendId)
        .get()
    );

    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      return data?.['chatId'];
    }

    return undefined;
  }
}
