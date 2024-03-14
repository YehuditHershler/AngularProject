import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Category } from '../category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { UserService } from '../../user/user.service';
import { error } from 'console';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})




export class RecipeDetailsComponent implements OnInit {

  recipe!: Recipe;
  category!: Category;
  thisUser!: boolean;
  difficultyStars: string="";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private userService: UserService,
    ) { }


  ngOnInit(): void {
    // var recipeId = this.recipeService.thisReciveCode;
    this.recipeService.getRecipeById(this.recipeService.getThisRecipeCode()).subscribe((recipe: Recipe) => {
      this.recipe = recipe;
      console.log(this.recipe)
    }, error => {
      console.error('Error occurred:', error);
    });
    // this.thisUser=(recipe.userCode===this.userService.getUserByName(this.userService.getUserName()).code);
    this.userService.getUserByName(this.userService.getUserName()).subscribe((user: User) => {
      this.thisUser = this.recipe.userCode === user.code;
    }, error => {
      console.error('Error occurred:', error);
    });


    this.recipeService.getCategoryByCode(this.recipe?.categoryCode).subscribe((category: Category) => {
      this.category = category;
    }, error => {
      console.error('Error occurred:', error);
    });
    for (let index = 0; index < this.recipe.difficulty; index++) {
      this.difficultyStars+="* "
      
    }
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipe.code).subscribe((res) => {
      alert("the recipe was delete successfully!!")
      this.router.navigate(['/recipes/all-recipes', { user: this.userService.getUserName() }]); // הפניה לדף המתכונים לאחר הצלחה

    }, error => {
      alert("ops! something not good")
    });
  }

  // getRecipe() {
  //  this.recipe= this.recipeService.getRecipeById(this.recipe.code);
  // }
}
