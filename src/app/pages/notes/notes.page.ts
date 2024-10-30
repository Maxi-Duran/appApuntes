import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes: any[] = [];
  userId: string = '';
  loading: boolean = false;
  selectedNote: any;
  errorMessage: string = '';
  constructor(
    private firestore: FirestoreService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.loading = true;
    this.firestore.getNotes().subscribe((res) => {
      this.notes = res.map((note) => ({
        name: note.name,
        id: note.id,
      }));
      this.loading = false;
    });
  }
  onNoteSelect(note: any) {
    this.router.navigate(['/text', note.id]); // Navegar a la página de la nota seleccionada
    console.log('Navegando a la nota con ID:', note.id);
  }

  deleteNote(id: string, event: Event) {
    event.stopPropagation();
    console.log('eliminando');
    this.firestore.deleteNote(id).then(() => {
      this.errorMessage = 'Eliminado';
      this.presentToast('top', this.errorMessage, 3000, 'success');
      console.log('eliminado');
      this.getNotes();
    });
  }
  navigateToUpdateText(id: string) {
    this.router.navigate(['/text', id]);
    console.log('navegando');
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
