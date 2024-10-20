import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  errorMessage: string = '';
  loading: boolean = false;
  notes: any[] = [];
  disableSelect = new FormControl(false);
  task: any = {
    name: '',
    asignatura: '',
    endDate: '',
  };
  constructor(
    public toastController: ToastController,
    public router: Router,
    private firestore: AngularFirestore,
    private firestoreget: FirestoreService
  ) {}

  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.firestoreget.getNotes().subscribe((res) => {
      this.notes = res; // Guardar las tareas en la variable
      console.log(this.notes);
    });
  }

  createTask() {
    this.loading = true;
    console.log('agregando');
    const id = this.firestore.createId(); // Genera un ID único automáticamente
    const data = {
      id: id,
      name: this.task.name,
      completed: false,
      asignatura: this.task.asignatura,
      endDate: this.task.endDate, // Usa la fecha seleccionada
    };

    this.firestoreget.createTask(data, id).then(() => {
      this.errorMessage = 'Tarea Agregada';
      this.presentToast('top', this.errorMessage, 3000, 'success');
      this.router.navigate(['/task']);
      this.loading = false;
      // Aquí puedes agregar lógica adicional, como limpiar el formulario
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
