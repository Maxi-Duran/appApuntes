import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    const request = {
      sender: senderId,
      receiver: receiverId,
      status: 'pending',
      date: new Date(),
    };

    return this.firestore
      .collection('users')
      .doc(receiverId)
      .collection('requests')
      .doc(senderId)
      .set(request);
  }
  //aceptar solicitud
  acceptFriendRequest(requestId: string, senderId: string, receiverId: string) {
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
      .set({ friendId: senderId })
      .then(() => {
        return senderFriends.set({ friendId: receiverId });
      })
      .then(() => {
        return this.firestore
          .collection('users')
          .doc(receiverId)
          .collection('requests')
          .doc(requestId)
          .delete();
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
      .valueChanges();
  }
}
