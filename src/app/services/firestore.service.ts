import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PushNotifications } from '@capacitor/push-notifications';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Capacitor, Plugins } from '@capacitor/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { GoogleAuthProvider } from 'firebase/auth';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { switchMap } from 'rxjs/operators';
import { User } from '../interfaces/diccionario';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage
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
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
  };

  async uploadImage(file: File, uid: string): Promise<string> {
    const filePath = `profile_images/${new Date().getTime()}_${file.name}`;
    const task = this.storage.upload(filePath, file);

    // Esperar a que la tarea de carga se complete
    await task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          return this.storage.ref(filePath).getDownloadURL().toPromise();
        })
      )
      .toPromise();

    // Obtener la URL de descarga
    const url = await this.storage.ref(filePath).getDownloadURL().toPromise();

    // Guardar la URL en Firestore según el UID
    await this.saveImageUrl(url, uid);

    return url;
  }
  private saveImageUrl(url: string, uid: string): Promise<void> {
    // Actualiza el documento correspondiente al UID del usuario en Firestore
    return this.firestore
      .collection('users')
      .doc(uid)
      .update({ profileImageUrl: url });
  }
  getUserId(): string {
    const user = firebase.auth().currentUser;
    return user ? user.uid : '';
  }
  user: any = {
    profileImageUrl: '',
  };

  async updateProfileImage(file: File, uid: string): Promise<void> {
    try {
      const userDocRef = this.firestore.collection('users').doc(uid);

      const userData = await userDocRef.get().toPromise();
      const user = userData?.data() as User;

      const currentImageUrl = user?.profileImageUrl || '';

      if (currentImageUrl) {
        const storageRef = this.storage.storage.refFromURL(currentImageUrl);
        await storageRef.delete();
        console.log('Imagen anterior eliminada:', currentImageUrl);
      }

      const filePath = `profile_images/${new Date().getTime()}_${file.name}`;
      const task = this.storage.upload(filePath, file);

      await task.snapshotChanges().toPromise();

      const newImageUrl = await this.storage
        .ref(filePath)
        .getDownloadURL()
        .toPromise();

      await userDocRef.update({ profileImageUrl: newImageUrl });

      console.log('URL de la nueva imagen guardada:', newImageUrl);
    } catch (error) {
      console.error('Error actualizando la imagen de perfil:', error);
    }
  }
}
