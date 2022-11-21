import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEmpComponent } from './ver-emp.component';

describe('VerEmpComponent', () => {
  let component: VerEmpComponent;
  let fixture: ComponentFixture<VerEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
