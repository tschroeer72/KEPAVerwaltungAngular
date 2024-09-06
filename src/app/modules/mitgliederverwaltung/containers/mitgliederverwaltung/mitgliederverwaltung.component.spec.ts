import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitgliederverwaltungComponent } from './mitgliederverwaltung.component';

describe('MitgliederverwaltungComponent', () => {
  let component: MitgliederverwaltungComponent;
  let fixture: ComponentFixture<MitgliederverwaltungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MitgliederverwaltungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitgliederverwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
