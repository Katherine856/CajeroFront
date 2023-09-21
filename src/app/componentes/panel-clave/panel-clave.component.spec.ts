import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelClaveComponent } from './panel-clave.component';

describe('PanelClaveComponent', () => {
  let component: PanelClaveComponent;
  let fixture: ComponentFixture<PanelClaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelClaveComponent]
    });
    fixture = TestBed.createComponent(PanelClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
