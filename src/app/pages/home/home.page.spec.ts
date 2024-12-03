import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  const firebaseConfig = environment.firebaseConfig;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireStorageModule,
      ],
      providers: [FirestoreService],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  //verificar la funcionalida de las animaciones
});
