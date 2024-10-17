import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  notes: any[] = [];
  disableSelect = new FormControl(false);
  task: any = {
    name: '',
    asignatura: '',
    endDate: '',
  };
  constructor(
    private firestore: AngularFirestore,
    private firestoreget: FirestoreService
  ) {}

  ngOnInit() {}
}
