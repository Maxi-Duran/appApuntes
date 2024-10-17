import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  task: any = {
    name: '',
    asignatura: '',
    endDate: '',
  };

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {}
}
