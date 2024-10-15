import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  //TAREAS
  createTask(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);

    return collection.doc(id).set(data);
  }

  getTask(): Observable<any[]> {
    return this.firestore.collection('Tasks').valueChanges();
  }
  deleteTask(id: string): Promise<void> {
    return this.firestore.collection('Tasks').doc(id).delete();
  }
  getTaskById(id: string): Observable<any> {
    return this.firestore.collection('Tasks').doc(id).valueChanges();
  }

  updateTask(id: string, data: any) {
    return this.firestore.collection('Tasks').doc(id).update(data);
  }

  //NOTAS

  createAsignature(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);

    return collection.doc(id).set(data);
  }

  getAsignature(): Observable<any[]> {
    return this.firestore.collection('Notes').valueChanges();
  }
  deleteAsignature(id: string): Promise<void> {
    return this.firestore.collection('Notes').doc(id).delete();
  }
  getAsignatureById(id: string): Observable<any> {
    return this.firestore.collection('Notes').doc(id).valueChanges();
  }

  updateText(id: string, data: any) {
    return this.firestore.collection('Notes').doc(id).update(data);
  }
}
