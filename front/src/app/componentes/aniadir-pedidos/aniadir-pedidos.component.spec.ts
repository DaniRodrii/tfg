import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniadirPedidosComponent } from './aniadir-pedidos.component';

describe('AniadirPedidosComponent', () => {
  let component: AniadirPedidosComponent;
  let fixture: ComponentFixture<AniadirPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AniadirPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AniadirPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
