import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { PetriflowInfoDialogComponent } from './petriflow-info-dialog.component';

describe('PetriflowInfoDialogComponent', () => {
  let component: PetriflowInfoDialogComponent;
  let fixture: ComponentFixture<PetriflowInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule, MatButtonModule ],
      declarations: [ PetriflowInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetriflowInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
