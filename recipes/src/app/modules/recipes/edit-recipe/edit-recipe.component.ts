import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../category.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  //@Input()
   recipe!: Recipe;
  editForm!: FormGroup;
  categories: Category[] = [];
  category!: Category;

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.recipeService.getRecipeByName(this.recipeService.getThisRecipeName()).subscribe((recipe: Recipe) => {
      // this.recipeService.getRecipeByName("Saled").subscribe((recipe: Recipe) => {
      if (recipe) { // בדיקה אם קיים מתכון
        this.recipe = recipe;
        console.log(this.recipe);
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
    console.log(this.recipe)
    console.log(this.category)
    this.editForm = new FormGroup({
      'name': new FormControl(this.recipe.name, [Validators.required]),
      'categoryCode': new FormControl(this.recipe.categoryCode, [Validators.required]),
      'preparationTime': new FormControl(this.recipe.preparationTime, [Validators.required, Validators.min(1)]),
      'difficultyLevel': new FormControl(this.recipe.difficulty, [Validators.required, Validators.min(1), Validators.max(5)]),
      'ingredients': new FormControl(this.recipe.ingredients, [Validators.required]),
      'instructions': new FormControl(this.recipe.preparationMethod, [Validators.required]),
      'image': new FormControl(this.recipe.imageRoute, [Validators.required]),
    });
    this.recipeService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.log(err)
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    const updatedRecipe = new Recipe(
      // this.recipe.code,
      this.editForm.value.name,
      this.editForm.value.categoryCode,
      this.editForm.value.preparationTime,
      this.editForm.value.difficultyLevel,
      this.editForm.value.ingredients,
      this.editForm.value.instructions,
      this.editForm.value.image,
    );

    this.recipeService.updateRecipe(this.recipe.code, updatedRecipe).subscribe({
      next: () => {
        Swal.fire({
          title: "המתכון עודכן בהצלחה!",
          icon: "success"
        });
        this.router.navigate(['/recipes/all-recipes']);
      },
      error: (err) => console.log(err)
    });
  }

  onCancel(): void {
    this.router.navigate(['/recipes/all-recipes']);
  }

}
