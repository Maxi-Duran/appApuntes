import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {}

  // USUARIO
  loginWithEmail(data: any) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signup(data: any) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data: any) {
    return this.firestore.collection('users').doc(data.uid).set(data);
  }

  getDetails(data: any) {
    return this.firestore.collection('users').doc(data.uid).valueChanges();
  }

  // TAREAS
  createTask(data: any, id: string) {
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;

      return this.firestore
        .collection('users')
        .doc(userId)
        .collection('Tasks')
        .doc(id)
        .set(data);
    } else {
      return Promise.reject('Usuario no autenticado');
    }
  }

  getTask(): Observable<any[]> {
    const user = firebase.auth().currentUser;

    if (user) {
      const userId = user.uid;

      return this.firestore
        .collection('users')
        .doc(userId)
        .collection('Tasks')
        .valueChanges();
    } else {
      return new Observable<any[]>();
    }
  }

  deleteTask(id: string) {
    const user = firebase.auth().currentUser;

    if (user) {
      const userId = user.uid;
      return this.firestore
        .collection('users')
        .doc(userId)
        .collection('Tasks')
        .doc(id)
        .delete();
    } else {
      return Promise.reject('id no encontrado');
    }
  }

  async getTaskById(id: string): Promise<Observable<any>> {
    const user = await this.auth.currentUser;
    if (user) {
      const userId = user.uid;
      return this.firestore
        .collection('users')
        .doc(userId)
        .collection('Tasks')
        .doc(id)
        .valueChanges();
    } else {
      return new Observable();
    }
  }

  async updateTask(id: string, data: any) {
    const user = await this.auth.currentUser;
    if (user) {
      const userId = user.uid;
      return this.firestore
        .collection('users')
        .doc(userId)
        .collection('Tasks')
        .doc(id)
        .update(data);
    }
  }
}
