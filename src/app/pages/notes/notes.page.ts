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
  constructor(private firestore: FirestoreService, private router: Router) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.firestore.getAsignature().subscribe((res) => {
      this.notes = res;
      console.log(this.notes);
    });
  }
  navigateToUpdateNotes(id: string) {
    this.router.navigate(['/text', id]);
    console.log('aa');
  }
}
