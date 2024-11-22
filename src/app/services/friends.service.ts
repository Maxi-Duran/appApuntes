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
    return this.firestore
      .collection('users')
      .doc(senderId)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc?.exists) {
          const data = doc.data() as User;
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
          throw new Error(`El usuario con ID ${senderId} no existe.`);
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
}
