// recipes-routing.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { SmallRecipesComponent } from './small-recipes/small-recipes.component';
import { Router } from 'express';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';


const USER_ROUTES:Routes=[
   {path:"all-recipes", component:AllRecipesComponent},
   {path:"small-recipes", component:SmallRecipesComponent},
   {path:"add-recipe", component:AddRecipeComponent},
   { path: 'recipe-details', component: RecipeDetailsComponent },
   { path: 'edit-recipe', component: EditRecipeComponent },

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports:[RouterModule]
})
export class RecipesRoutingModule { }
