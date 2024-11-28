import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginEmailPage } from './login-email.page';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
describe('LoginEmailPage', () => {
  let component: LoginEmailPage;
  let fixture: ComponentFixture<LoginEmailPage>;
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginEmailPage],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(LoginEmailPage);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
