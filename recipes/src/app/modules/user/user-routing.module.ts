// user-routing.module.ts
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AllRecipesComponent } from '../recipes/all-recipes/all-recipes.component';
import { AddRecipeComponent } from '../recipes/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from '../recipes/recipe-details/recipe-details.component';
import { EditRecipeComponent } from '../recipes/edit-recipe/edit-recipe.component';

const USER_ROUTES:Routes=[
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"all-recipes", component:AllRecipesComponent},
  {path:"add-recipe", component:AddRecipeComponent},
  {path:"recipe-details", component:RecipeDetailsComponent},
  {path:"edit-recipe", component:EditRecipeComponent}

]

@NgModule({
  // declarations: [],
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports:[RouterModule]
})
export class UserRoutingModule { }
