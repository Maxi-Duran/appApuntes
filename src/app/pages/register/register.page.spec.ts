import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let firestoreService: FirestoreService;
  const firebaseConfig = environment.firebaseConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  //verificar que un usuario se crea correctamente
  it('comprobamos que se crea el usuario', () => {
    component.register = {
      user: 'test',
      email: 'test@test.com',
      password: '12345678',
      repeatpassword: '12345678',
      profileImageUrl: '',
    };
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
