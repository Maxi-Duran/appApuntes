import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(private firestore: FirestoreService) {}
  user: any = {
    id: '',
    image: '',
  };
  ngOnInit() {}

  profileImageUrl: string | null = null;
  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const uid = this.firestore.getUserId();

    if (file) {
      try {
        this.profileImageUrl = await this.firestore.uploadImage(file, uid);
        console.log('Image URL:', this.profileImageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }
}
