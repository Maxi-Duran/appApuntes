import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesPage } from './notes.page';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
describe('NotesPage', () => {
  let component: NotesPage;
  let fixture: ComponentFixture<NotesPage>;
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesPage],
      imports: [
        AngularFirestoreModule,
        AngularFireModule.initializeApp(firebaseConfig),
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(NotesPage);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
