import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestorePasswordPage } from './restore-password.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';
describe('RestorePasswordPage', () => {
  let component: RestorePasswordPage;
  let fixture: ComponentFixture<RestorePasswordPage>;
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestorePasswordPage],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(RestorePasswordPage);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
