import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendsPage } from './friends.page';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
describe('FriendsPage', () => {
  const firebaseConfig = environment.firebaseConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriendsPage],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });
  it('Deria crear pagina', async () => {
    const fixture = TestBed.createComponent(FriendsPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
