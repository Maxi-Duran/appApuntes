import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PushNotifications } from '@capacitor/push-notifications';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
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

  loginWithGoogle() {
    return this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        // Si el inicio de sesión es exitoso, crea el usuario en Firestore
        this.createUser(result.user);
      });
  }
  private createUser(user: firebase.User | null) {
    if (!user) return;

    const userRef = this.firestore.collection('users').doc(user.uid);

    userRef.get().subscribe((doc) => {
      if (!doc.exists) {
        userRef.set({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    });
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

  //NOTIFICACIONES
  initPushNotifications() {
    // Verifica si la plataforma es Android o iOS antes de inicializar
    if (Capacitor.getPlatform() !== 'web') {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          PushNotifications.register();
        } else {
          console.log('Permisos no otorgados para recibir notificaciones.');
        }
      });

      PushNotifications.addListener('registration', (token) => {
        console.log('Token de registro:', token.value);
      });

      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification) => {
          console.log('Notificación recibida:', notification);
        }
      );
    } else {
      console.log('Las notificaciones push no están disponibles en la web.');
    }
  }
}
