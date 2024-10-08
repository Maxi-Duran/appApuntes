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

  createTask() {
    this.firestore.collection('Tasks').add;
  }

  getTask(): Observable<any[]> {
    return this.firestore.collection('Tasks').valueChanges();
  }
}
