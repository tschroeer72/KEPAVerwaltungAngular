import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpieleingabeComponent } from './spieleingabe.component';

describe('SpieleingabeComponent', () => {
  let component: SpieleingabeComponent;
  let fixture: ComponentFixture<SpieleingabeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpieleingabeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpieleingabeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
