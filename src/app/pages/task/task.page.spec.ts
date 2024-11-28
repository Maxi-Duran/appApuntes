import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPage } from './task.page';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
describe('TaskPage', () => {
  let component: TaskPage;
  let fixture: ComponentFixture<TaskPage>;
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskPage],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(TaskPage);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
