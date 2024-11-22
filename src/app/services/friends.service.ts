import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../interfaces/diccionario';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  //aceptar solicitud
  acceptFriendRequest(requestId: string, senderId: string, receiverId: string) {
    return this.firestore
      .collection('users')
      .doc(senderId)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc?.exists) {
          const data = doc.data() as User;

          const name = data.name || 'sin datos';
          const receiverFriends = this.firestore
            .collection('users')
            .doc(receiverId)
            .collection('friends')
            .doc(senderId);
          const senderFriends = this.firestore
            .collection('users')
            .doc(senderId)
            .collection('friends')
            .doc(receiverId);

          return receiverFriends
            .set({ friendId: senderId, name: name })
            .then(() => {
              return senderFriends.set({
                friendId: receiverId,
                name: data?.name,
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
}
