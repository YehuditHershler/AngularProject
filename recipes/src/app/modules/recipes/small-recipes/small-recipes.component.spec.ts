import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallRecipesComponent } from './small-recipes.component';

describe('SmallRecipesComponent', () => {
  let component: SmallRecipesComponent;
  let fixture: ComponentFixture<SmallRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
