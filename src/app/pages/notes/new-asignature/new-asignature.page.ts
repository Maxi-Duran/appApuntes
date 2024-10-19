import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar el servicio de autenticación
import { FormControl } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
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
    teacher: '',
  };
  userId: string = ''; // Variable para almacenar el uid del usuario

  constructor(
    private firestore: AngularFirestore,

    private firestoreget: FirestoreService
  ) {}

  ngOnInit() {}

  createNotes() {
    console.log('agregando');
    const id = this.firestore.createId(); // Genera un ID único automáticamente
    const data = {
      id: id,
      name: this.note.name,
      text: this.note.text,
      teacher: this.note.teacher,
    };

    this.firestoreget.createNote(data, id).then(() => {
      console.log('Tarea creada con éxito');
      // Aquí puedes agregar lógica adicional, como limpiar el formulario
    });
  }
}
