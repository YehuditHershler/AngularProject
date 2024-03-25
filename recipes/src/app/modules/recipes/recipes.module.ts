// recipes.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { SmallRecipesComponent } from './small-recipes/small-recipes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from '../user/user-routing.module';
import { RecipeService } from './recipe.service';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [AllRecipesComponent, SmallRecipesComponent, AddRecipeComponent, RecipeDetailsComponent, EditRecipeComponent],
  imports: [
    CommonModule,  FormsModule, ReactiveFormsModule, UserRoutingModule, FormsModule, ReactiveFormsModule,
  ],
  providers:[RecipeService],

})
export class RecipesModule { }
