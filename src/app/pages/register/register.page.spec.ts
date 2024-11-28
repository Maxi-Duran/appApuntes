import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
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
});
