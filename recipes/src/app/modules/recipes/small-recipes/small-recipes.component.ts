// //small-recipes.component.ts

import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { PreparationTimePipe } from '../preparation-time.pipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-small-recipes',
  templateUrl: './small-recipes.component.html',
  styleUrls: ['./small-recipes.component.css']
})
export class SmallRecipesComponent {
   constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    // const recipeCode = this.route.snapshot.params['code']; // קבלת קוד המתכון מ-URL
    // // this.recipein = this.getRecipeByCode(recipeCode); // פונקציה לאחזור מתכון לפי קוד
  }
  redirectToRecipeDetails(){
    this.recipeService.thisRecipeCode=this.recipein.code;
    this.router.navigate(['/recipes/recipe-details']);
  }
  redirectToEditDetails(){
    this.recipeService.setThisRecipeCode(this.recipein.code);
    this.router.navigate(['/recipes/edit-recipe']);
  }
  @Input()
  recipein!: Recipe;
}
