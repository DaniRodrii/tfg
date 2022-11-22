import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniadirStockComponent } from './aniadir-stock.component';

describe('AniadirStockComponent', () => {
  let component: AniadirStockComponent;
  let fixture: ComponentFixture<AniadirStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AniadirStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AniadirStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
