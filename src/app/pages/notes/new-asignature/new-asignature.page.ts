import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar el servicio de autenticación
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-asignature',
  templateUrl: './new-asignature.page.html',
  styleUrls: ['./new-asignature.page.scss'],
})
export class NewAsignaturePage implements OnInit {
  disableSelect = new FormControl(false);
  note: any = {
    name: '',
    text: '',
  };
  userId: string = ''; // Variable para almacenar el uid del usuario

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth // Servicio de autenticación
  ) {}

  ngOnInit() {
    // Obtener el uid del usuario logueado
    this.auth.currentUser.then((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  createNote() {
    if (!this.userId) {
      console.error('No se puede crear la asignatura. Usuario no autenticado.');
      return;
    }

    console.log('Agregando asignatura');
    const id = this.firestore.createId();
    const data = {
      id: id,
      name: this.note.name,
      text: this.note.text,
      userId: this.userId, // Asociar la asignatura al usuario logueado
    };
    const path = `Notes/`;

    this.firestore
      .collection(path)
      .doc(id)
      .set(data)
      .then(() => {
        console.log('Asignatura creada con ID:', id);
      })
      .catch((error) => {
        console.error('Error al crear la asignatura', error);
      });
  }
}
