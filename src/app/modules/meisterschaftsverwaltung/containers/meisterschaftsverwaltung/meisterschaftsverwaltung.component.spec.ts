import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeisterschaftsverwaltungComponent } from './meisterschaftsverwaltung.component';

describe('MeisterschaftsverwaltungComponent', () => {
  let component: MeisterschaftsverwaltungComponent;
  let fixture: ComponentFixture<MeisterschaftsverwaltungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeisterschaftsverwaltungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeisterschaftsverwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
