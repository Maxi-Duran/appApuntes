import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router
  ) {}

  // USUARIO
  loginWithEmail(data: any) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }
  Logout() {
    return this.auth.signOut().then(() => {
      // Después de cerrar sesión, navegamos a la página de login y eliminamos los datos del usuario
      this.router.navigate(['/login']);
    });
  }
  getUser(): Observable<any> {
    return this.auth.authState;
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

  getName(): Observable<any> {
    const user = firebase.auth().currentUser;

    if (user) {
      return this.firestore.collection('users').doc(user.uid).valueChanges();
    } else {
      return new Observable<any[]>();
    }
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

  getTaskById(id: string): Observable<any> {
    const user = firebase.auth().currentUser;

    if (user) {
      return this.firestore
        .collection('users')
        .doc(user.uid)
        .collection('Tasks')
        .doc(id)
        .valueChanges();
    } else {
      return new Observable<any[]>();
    }
  }

  updateTask(id: string, data: any) {
    const user = firebase.auth().currentUser;

    if (user) {
      return this.firestore
        .collection('users')
        .doc(user.uid)
        .collection('Tasks')
        .doc(id)
        .update(data);
    } else {
      return new Observable<any[]>();
    }
  }
  //NOTAS
  getNotes(): Observable<any[]> {
    const user = firebase.auth().currentUser;

    if (user) {
      const userId = user.uid;

      return this.firestore
        .collection('users')
        .doc(userId)
        .collection('Notes')
        .valueChanges();
    } else {
      return new Observable<any[]>();
    }
  }
  createNote(data: any, id: string) {
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;

      return this.firestore
        .collection('users')
        .doc(userId)
        .collection('Notes')
        .doc(id)
        .set(data);
    } else {
      return Promise.reject('Usuario no autenticado');
    }
  }

  deleteNote(id: string) {
    const user = firebase.auth().currentUser;

    if (user) {
      const userId = user.uid;
      return this.firestore
        .collection('users')
        .doc(userId)
        .collection('Notes')
        .doc(id)
        .delete();
    } else {
      return Promise.reject('id no encontrado');
    }
  }
  getNoteById(id: string): Observable<any> {
    const user = firebase.auth().currentUser;

    if (user) {
      return this.firestore
        .collection('users')
        .doc(user.uid)
        .collection('Notes')
        .doc(id)
        .valueChanges();
    } else {
      return new Observable<any[]>();
    }
  }

  updateNote(id: string, data: any) {
    const user = firebase.auth().currentUser;

    if (user) {
      return this.firestore
        .collection('users')
        .doc(user.uid)
        .collection('Notes')
        .doc(id)
        .update(data);
    } else {
      return new Observable<any[]>();
    }
  }
}
