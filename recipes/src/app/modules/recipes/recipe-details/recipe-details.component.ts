// recipe-details.component.ts
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Category } from '../category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { UserService } from '../../user/user.service';
import { error } from 'console';
import { User } from '../../user/user.model';
import Swal from 'sweetalert2';
import { PreparationTimePipe } from '../preparation-time.pipe';
import { SessionStorageService } from '../../../session-storage.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})

export class RecipeDetailsComponent implements OnInit {

  recipe!: Recipe;
  category!: Category;
  thisUser!: boolean;
  difficultyStars: string = "";
  dateToShow!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private userService: UserService,
    private sessionStorageService: SessionStorageService
  ) { }



  ngOnInit(): void {
    // var recipeId = this.recipeService.thisReciveCode;
    this.recipeService.getRecipeByName(this.recipeService.getThisRecipeName()).subscribe((recipe: Recipe) => {
      // this.recipeService.getRecipeByName("Saled").subscribe((recipe: Recipe) => {
      if (recipe) { // בדיקה אם קיים מתכון
        this.recipe = recipe;
        console.log(this.recipe);
        for (let index = 0; index < this.recipe.difficulty; index++) {
          this.difficultyStars += "* "
        }
        console.log(this.recipe.dateAdded)
        // this.dateToShow=this.recipe.dateAdded.toISOString().split('T')[0];
        this.dateToShow = new Date(this.recipe.dateAdded).toISOString().split('T')[0];
        // this.thisUser=(recipe.userCode===this.userService.getUserByName(this.userService.getUserName()).code);
        // this.userService.getUserByName(this.userService.getUserName()).subscribe((user: User) => {

        this.thisUser = this.recipe.userCode === this.sessionStorageService.getItem('user').userCode;
        console.log(this.sessionStorageService.getItem('user'))
        console.log(this.sessionStorageService.getItem('user').code)
        console.log(this.recipe.userCode)
        console.log(this.thisUser)

        // }, error => {
        //   console.error('Error occurred:', error);
        // });

        this.recipeService.getCategoryByCode(this.recipe.categoryCode).subscribe((category: Category) => {
          this.category = category;
          console.log(category)
        }, error => {
          console.log('Error occurred:', error);
          // console.error('Error occurred:', error);
        });
      }

    }, error => {
      console.error('Error occurred:', error);
    });

  }
  getIcon(ingredient: string): string {
    switch (ingredient) {
      case 'flour':
        return 'fas fa-wheat';
      case 'sugar':
        return 'fas fa-candy-cane';
      case 'oil':
        return 'fas fa-oil-can';
      default:
        return 'fas fa-question';
    }
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipe.code).subscribe((res) => {
      Swal.fire({
        title: "Great!",
        text: "the recipe was delete successfully!!",
        imageUrl: this.recipe.imageRoute,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
      this.router.navigate(['/recipes/all-recipes', { user: this.sessionStorageService.getItem('user').name }]); // הפניה לדף המתכונים לאחר הצלחה

    }, error => {
      Swal.fire("ops! something not good")
    });
  }
  // getRecipe() {
  //   this.recipe= this.recipeService.getRecipeByName(this.recipe.name);
  //  }
}
