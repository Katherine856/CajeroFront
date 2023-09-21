import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsularSaldoComponent } from './consular-saldo.component';

describe('ConsularSaldoComponent', () => {
  let component: ConsularSaldoComponent;
  let fixture: ComponentFixture<ConsularSaldoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsularSaldoComponent]
    });
    fixture = TestBed.createComponent(ConsularSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
