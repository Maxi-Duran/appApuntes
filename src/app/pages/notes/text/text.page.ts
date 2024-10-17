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

  ngOnInit() {}
}
