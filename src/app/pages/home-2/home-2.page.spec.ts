import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Home2Page } from './home-2.page';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';

//prueba unitaria verifica que la page home-2 se cree correctamente en un entorno donde firestore y firebase esten configurados.
describe('Home2Page', () => {
  const firebaseConfig = environment.firebaseConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Home2Page],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [FirestoreService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('Creado correctamente', () => {
    const fixture = TestBed.createComponent(Home2Page);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
