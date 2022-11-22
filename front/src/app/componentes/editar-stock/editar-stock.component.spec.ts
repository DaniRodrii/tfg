import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarStockComponent } from './editar-stock.component';

describe('EditarStockComponent', () => {
  let component: EditarStockComponent;
  let fixture: ComponentFixture<EditarStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
