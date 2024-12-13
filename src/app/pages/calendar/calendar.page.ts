import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  tasks: any[] = [];
  constructor(public firestore: FirestoreService) {}
  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.firestore.getTask().subscribe((res) => {
      this.tasks = res;
    });
  }
}
