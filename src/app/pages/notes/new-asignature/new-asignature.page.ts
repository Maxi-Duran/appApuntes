import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar el servicio de autenticación
import { FormControl } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-asignature',
  templateUrl: './new-asignature.page.html',
  styleUrls: ['./new-asignature.page.scss'],
})
export class NewAsignaturePage implements OnInit {
  loading: boolean = false;
  errorMessage: string = '';
  disableSelect = new FormControl(false);
  note: any = {
    name: '',
    text: '',
    teacher: '',
  };

  userId: string = '';

  constructor(
    private firestore: AngularFirestore,

    private firestoreget: FirestoreService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  createNotes() {
    this.loading = true;
    console.log('agregando');
    const id = this.firestore.createId(); // genera id
    const data = {
      id: id,
      name: this.note.name,
      text: this.note.text,
      teacher: this.note.teacher,
    };

    this.firestoreget.createNote(data, id).then(() => {
      this.loading = false;
      this.errorMessage = 'Asignatura Creada';
      this.presentToast('top', this.errorMessage, 3000, 'success');
      this.router.navigate(['/notes']);
    });
  }
  async presentToast(
    position: 'top' | 'middle' | 'bottom',
    msg: string,
    duration?: number,
    color?: string
  ) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2500,
      position: position,
      color: color,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }
}
