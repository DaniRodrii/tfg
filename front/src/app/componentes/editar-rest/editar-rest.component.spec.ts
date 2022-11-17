import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRestComponent } from './editar-rest.component';

describe('EditarRestComponent', () => {
  let component: EditarRestComponent;
  let fixture: ComponentFixture<EditarRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
