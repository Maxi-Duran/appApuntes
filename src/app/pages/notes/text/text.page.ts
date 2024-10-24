import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage implements OnInit {
  note: any = {
    name: '',
    text: '',
    teacher: '',
  };

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService
  ) {}

  foto() {
    this.firestore.takePicture();
  }
  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.getNote(noteId);
    }
  }

  getNote(id: string) {
    this.firestore.getNoteById(id).subscribe((note) => {
      this.note = note;
    });
  }

  updateNote() {
    const data = {
      name: this.note.name,
      text: this.note.text,
      teacher: this.note.teacher,
    };
    this.firestore.updateNote(this.note.id, data);
    console.log('actualizando');
  }
}
