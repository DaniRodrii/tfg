import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniadirRestComponent } from './aniadir-rest.component';

describe('AniadirRestComponent', () => {
  let component: AniadirRestComponent;
  let fixture: ComponentFixture<AniadirRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AniadirRestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AniadirRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
