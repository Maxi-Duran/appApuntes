import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FirestoreService } from 'src/app/services/firestore.service';
describe('LoginPage', () => {
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  //comprobar la funcion de login
  it('Deberia iniciar sesion', () => {});
});
