import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NavComponent } from './nav.component';
import { ActivatedRoute } from '@angular/router';

//prueba unitaria para verificar que el componente de navegación se cree correctamente
describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

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
      declarations: [NavComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();
  });
  it('Deberia crear un componente de navegación', () => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
