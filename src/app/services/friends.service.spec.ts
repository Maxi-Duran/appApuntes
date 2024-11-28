import { TestBed } from '@angular/core/testing';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirestoreService } from './firestore.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FriendsService } from './friends.service';

describe('FriendsService', () => {
  let service: FriendsService;
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should be created', () => {
    service = TestBed.inject(FriendsService);

    expect(service).toBeTruthy();
  });
});
