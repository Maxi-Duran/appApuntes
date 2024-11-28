import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateTaskPage } from './update-task.page';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
describe('UpdateTaskPage', () => {
  let component: UpdateTaskPage;
  const firebaseConfig = environment.firebaseConfig;
  let fixture: ComponentFixture<UpdateTaskPage>;
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => {
          'mockValue';
        },
      },
    },
  };
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [UpdateTaskPage],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [
        FirestoreService,
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();
  });

  it('Deberia crear page', () => {
    fixture = TestBed.createComponent(UpdateTaskPage);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
