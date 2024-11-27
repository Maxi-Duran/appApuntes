import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap, timestamp } from 'rxjs/operators';
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
    const timestamp = new Date().getTime();
    const filePath = `${uid}/profile_images/${timestamp}_${file.name}`;
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
  //eliminar imagen
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const fileRef = this.storage.refFromURL(imageUrl);
      await fileRef.delete().toPromise();
      console.log('Imagen eliminada de Firebase Storage:', imageUrl);
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      throw error;
    }
  }

  //obtener url de la imagen de perfil

  async getCurrentImageUrl(uid: string): Promise<string | null> {
    const userDoc = await this.firestore
      .collection<User>('users')
      .doc(uid)
      .get()
      .toPromise();
    const userData = userDoc?.data();
    return userData?.profileImageUrl || null;
  }
  //obtener urls de las imagenes de los apuntes
  async getImagesUrls(uid: string): Promise<string[]> {
    const filePath = `${uid}/notes-images/`;
    const fileRef = this.storage.ref(filePath);
    const imageUrls: string[] = [];

    try {
      // Obtener todos los archivos en la carpeta
      const result = await fileRef.listAll().toPromise(); // Asegúrate de convertir a Promesa

      // Asegúrate de que result tiene la propiedad items (tipo ListResult)
      if (result && result.items) {
        for (const item of result.items) {
          const url = await item.getDownloadURL();
          imageUrls.push(url);
        }
      }

      return imageUrls;
    } catch (error) {
      console.error('Error obteniendo las URLs de las imágenes:', error);
      return [];
    }
  }
  //guarda la url de la imagen
  saveImageUrl(url: string, uid: string): Promise<void> {
    return this.firestore
      .collection('users')
      .doc(uid)
      .update({ profileImageUrl: url });
  }
  //subir imagen a firebase storage de los apuntes
  async uploadImageToStorage(file: File, uid: string): Promise<string> {
    const timestamp = new Date().getTime();
    const filePath = `${uid}/notes-images/${timestamp}-${file.name}`;
    const fileRef = this.storage.ref(filePath);

    await this.storage.upload(filePath, file);

    return await fileRef.getDownloadURL().toPromise();
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
