import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeModeComponent } from './theme-mode.component';

describe('ThemeModeComponent', () => {
  let component: ThemeModeComponent;
  let fixture: ComponentFixture<ThemeModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
