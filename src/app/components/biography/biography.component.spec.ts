import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyComponent } from './biography.component';

describe('BiographyComponent', () => {
  let component: BiographyComponent;
  let fixture: ComponentFixture<BiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiographyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
