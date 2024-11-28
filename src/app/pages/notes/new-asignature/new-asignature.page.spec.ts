import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAsignaturePage } from './new-asignature.page';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
describe('NewAsignaturePage', () => {
  let component: NewAsignaturePage;
  let fixture: ComponentFixture<NewAsignaturePage>;
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAsignaturePage],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(NewAsignaturePage);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
