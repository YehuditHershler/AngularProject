// // import { Component } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
// import { Recipe } from '../../../recipe.model';
// import { SmallRecipesComponent } from '../small-recipes/small-recipes.component';

// @Component({
//   selector: 'app-all-recipes',
//   templateUrl: './all-recipes.component.html',
//   styleUrls: ['./all-recipes.component.css']
// })
// export class AllRecipesComponent implements OnInit {

//   recipes: Recipe[] = [];

//   constructor() { }

//   ngOnInit(): void {
//     // קבלת נתוני מתכונים ממאגר נתונים או שירות API
//     this.recipes = [
//       {
//         code: '1',
//         name: 'מתכון ראשון',
//         categoryCode: '1',
//         preparationTime: 60,
//         difficulty: 3,
//         dateAdded: new Date(),
//         ingredients: ['מרכיב 1', 'מרכיב 2'],
//         preparationMethod: ['שלב 1', 'שלב 2'],
//         userCode: '1',
//         imageRoute: 'assets/images/recipe1.jpg'
//       },
//       {
//         code: '2',
//         name: 'מתכון שני',
//         categoryCode: '2',
//         preparationTime: 30,
//         difficulty: 2,
//         dateAdded: new Date(),
//         ingredients: ['מרכיב 3', 'מרכיב 4'],
//         preparationMethod: ['שלב 3', 'שלב 4'],
//         userCode: '2',
//         imageRoute: 'assets/images/recipe2.jpg'
//       }
//     ];
//   }

// }

import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { SmallRecipesComponent } from '../small-recipes/small-recipes.component';

@Component({
  selector: 'app-all-recipes',
  // standalone: true,
  // imports: [],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent implements OnInit{
  recipes!: Recipe[];
  constructor(private recipeService: RecipeService) { }
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
          next: (res: Recipe[]) => {
            this.recipes = res
            console.log(this.recipes)
          },
          error: (err: any) => {
            
            console.log(err);
          }
        })
  }

}
