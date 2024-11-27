import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TextPage } from './text.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';
//prueba unitaria para verificar que el componente textpage se cree correctamente
describe('TextPage', () => {
  let component: TextPage;
  let fixture: ComponentFixture<TextPage>;
  const firebaseConfig = environment.firebaseConfig;
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
      declarations: [TextPage],
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  it('Deberia crear un la pagina de texto', () => {
    fixture = TestBed.createComponent(TextPage);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
