import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { FirestoreService } from './services/firestore.service';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private firestore: FirestoreService) {}

  ngOnInit() {
    this.firestore.getUser().subscribe((user) => {
      if (user) {
        //autenticado redirige a home-2
        if (this.router.url !== '/home-2') {
          this.router.navigate(['/home-2']);
        }
      } else {
        // no autenticado redirige a home-2
        if (this.router.url !== '/home') {
          this.router.navigate(['/home']);
        }
      }
    });
  }
}
