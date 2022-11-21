import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpComponent } from './editar-emp.component';

describe('EditarEmpComponent', () => {
  let component: EditarEmpComponent;
  let fixture: ComponentFixture<EditarEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
