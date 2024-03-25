//small-recipes.component.ts

import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { PreparationTimePipe } from '../preparation-time.pipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../session-storage.service';

@Component({
  selector: 'app-small-recipes',
  templateUrl: './small-recipes.component.html',
  styleUrls: ['./small-recipes.component.css']
})
export class SmallRecipesComponent {
   constructor(private recipeService: RecipeService, private sessionStorageService: SessionStorageService, private router: Router) {}

  ngOnInit() {    
//     // משוך או קבל נתוני מתכון והקצה אותם ל-recipein
//     // דוגמה:
//     // this.recipeService.getRecipeById(recipeId) // החלף עם הלוגיקה שלך
//     //   .subscribe(recipe => this.recipein = recipe);
    // const recipeCode = this.route.snapshot.params['code']; // קבלת קוד המתכון מ-URL
    // // this.recipein = this.getRecipeByCode(recipeCode); // פונקציה לאחזור מתכון לפי קוד
  }
  redirectToRecipeDetails(){
    console.log(this.recipein.name)
    // this.recipeService.setThisRecipe(this.recipein.code);
    // this.recipeService.thisRecipeName=this.recipein.code;
    if(this.sessionStorageService.getItem('user'))
      this.router.navigate(['/recipes/recipe-details']);
  }
  redirectToEditDetails(){
    // this.recipeService.setThisRecipeName(this.recipein.name);
    // console.log(this.recipein.name)
    console.log(this.recipein.name)
    // this.recipeService.setThisRecipe(this.recipein.code);
    // this.recipeService.thisRecipeName=this.recipein.code;
    if(this.sessionStorageService.getItem('user'))
    this.router.navigate(['/recipes/edit-recipe']);
  }
  @Input()
  recipein!: Recipe;
}
