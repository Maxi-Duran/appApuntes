import { Component, OnInit } from '@angular/core';
import { RiveModule } from 'ng-rive';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [RiveModule],
  standalone: true,
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
