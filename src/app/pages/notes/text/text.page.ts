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
  };

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {
    const getAsignature = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la tarea
    if (getAsignature) {
      this.getNote(getAsignature);
    }
  }

  getNote(id: string) {
    this.firestore.getAsignatureById(id).subscribe((note) => {
      this.note = note;
    });
  }

  updateText() {
    const data = {
      name: this.note.name,
      asignatura: this.note.asignatura,
      endDate: this.note.endDate,
    };
    this.firestore.updateText(this.note.id, data).then(() => {
      console.log('Tarea actualizada');
    });
  }
}
