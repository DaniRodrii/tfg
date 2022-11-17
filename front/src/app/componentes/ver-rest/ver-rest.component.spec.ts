import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRestComponent } from './ver-rest.component';

describe('VerRestComponent', () => {
  let component: VerRestComponent;
  let fixture: ComponentFixture<VerRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerRestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
