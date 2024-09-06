import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielergebnisseComponent } from './spielergebnisse.component';

describe('SpielergebnisseComponent', () => {
  let component: SpielergebnisseComponent;
  let fixture: ComponentFixture<SpielergebnisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpielergebnisseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielergebnisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
