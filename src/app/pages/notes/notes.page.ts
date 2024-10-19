import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes: any[] = [];
  userId: string = '';
  constructor(private firestore: FirestoreService, private router: Router) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.firestore.getNotes().subscribe((res) => {
      this.notes = res; // Guardar las tareas en la variable
      console.log(this.notes);
    });
  }
  deleteNote(id: string) {
    console.log('eliminando');
    this.firestore.deleteNote(id).then(() => {
      console.log('eliminado');
      this.getNotes();
    });
  }
  navigateToUpdateText(id: string) {
    this.router.navigate(['/text', id]);
    console.log('navegando');
  }
}
