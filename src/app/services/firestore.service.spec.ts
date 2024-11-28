import { TestBed } from '@angular/core/testing';

import { FirestoreService } from './firestore.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
describe('FirestoreService', () => {
  let service: FirestoreService;
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
    }).compileComponents();
    service = TestBed.inject(FirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
