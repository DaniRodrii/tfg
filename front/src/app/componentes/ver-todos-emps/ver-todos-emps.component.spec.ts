import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTodosEmpsComponent } from './ver-todos-emps.component';

describe('VerTodosEmpsComponent', () => {
  let component: VerTodosEmpsComponent;
  let fixture: ComponentFixture<VerTodosEmpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTodosEmpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTodosEmpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
