import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PushNotifications } from '@capacitor/push-notifications';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Capacitor, Plugins } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { GoogleAuthProvider } from 'firebase/auth';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { switchMap } from 'rxjs/operators';
import { User } from '../interfaces/diccionario';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage,
    private platform: Platform
  ) {
    this.persistencia();
  }
  persistencia() {
    this.auth
      .setPersistence('local')
      .then(() => {
        console.log('Persistencia local');
      })
      .catch((error) => {
        console.error('Error al configurar la persistencia', error);
      });
  }

  // USUARIO
  loginWithEmail(data: any) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }
  Logout() {
    return this.auth.signOut();
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

  createUser(user: firebase.User | null) {
    if (!user) return;

    const userRef = this.firestore.collection('users').doc(user.uid);

    userRef.get().subscribe((doc) => {
      if (!doc.exists) {
        userRef.set({
          uid: user.uid,
          email: user.email,
          name: user.displayName,

          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    });
  }
  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
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

  //Camara o imagenes
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: this.platform.is('hybrid')
        ? CameraSource.Camera
        : CameraSource.Prompt,
    });

    return image.webPath || '';
  };

  async uploadImage(file: File, uid: string): Promise<string> {
    const filePath = `profile_images/${new Date().getTime()}_${file.name}`;
    const task = this.storage.upload(filePath, file);

    // tarea de carga se complete
    await task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          return this.storage.ref(filePath).getDownloadURL().toPromise();
        })
      )
      .toPromise();

    // bbtener la url de descarga
    const url = await this.storage.ref(filePath).getDownloadURL().toPromise();

    // guardar la url en Firestore según el UID
    await this.saveImageUrl(url, uid);

    return url;
  }
  //guarda la url de la imagen
  saveImageUrl(url: string, uid: string): Promise<void> {
    return this.firestore
      .collection('users')
      .doc(uid)
      .update({ profileImageUrl: url });
  }
  //obtener id del usuario actual
  getUserId(): string {
    const user = firebase.auth().currentUser;
    return user ? user.uid : '';
  }
  user: any = {
    profileImageUrl: '',
  };
}
