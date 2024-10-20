import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage implements OnInit {
  constructor(private firestore: FirestoreService) {}
  email: string = '';
  ngOnInit() {}

  onResetPassword() {
    this.firestore.resetPassword(this.email);
  }
}
