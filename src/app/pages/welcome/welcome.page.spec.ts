import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePage } from './welcome.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { FirestoreService } from 'src/app/services/firestore.service';
describe('WelcomePage', () => {
  let component: WelcomePage;
  let fixture: ComponentFixture<WelcomePage>;
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomePage],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(WelcomePage);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
