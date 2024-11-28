import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTaskPage } from './new-task.page';

import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
describe('NewTaskPage', () => {
  let component: NewTaskPage;
  let fixture: ComponentFixture<NewTaskPage>;
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTaskPage],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(NewTaskPage);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
