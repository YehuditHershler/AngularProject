//add-recipe.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { UserService } from '../../user/user.service';
import { Category } from '../category.model';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { getLocaleDateTimeFormat } from '@angular/common';
import { User } from '../../user/user.model';
import { SessionStorageService } from '../../../session-storage.service';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  RecipeForm!: FormGroup;
  categories!: Category[];
  ingredients!: FormArray;
  instructions!: FormArray;
  // public _recipe = new Recipe("1","!",2,3,{"r","at"},{"5",},"5");
public _recipe=new Recipe();
  constructor(private recipeService: RecipeService, private _userService: UserService, private sessionStorageService: SessionStorageService , private router: Router,route: ActivatedRoute) { }

  ngOnInit() {
    this.RecipeForm = new FormGroup({
      "name": new FormControl(this._recipe.name, Validators.required),
      "recipeCode": new FormControl(this._recipe.code, Validators.required),
      "categoryCode": new FormControl(this._recipe.categoryCode, Validators.required),
      "preparationTime": new FormControl(this._recipe.preparationTime, Validators.required),
      "difficultyLevel": new FormControl(this._recipe.difficulty, [Validators.required, Validators.min(1), Validators.max(5)]),
      "ImageRoute": new FormControl(this._recipe.imageRoute, Validators.required),
      // instructions: new FormControl('', Validators.required),
    });

    this.recipeService.getCategories().subscribe(categories => this.categories = categories);

    this.ingredients = new FormArray([
      new FormGroup({
        name: new FormControl('')
      })
    ]);
    this.instructions = new FormArray([
      new FormGroup({
        name: new FormControl('')
      })
    ]);
  }

  addIngredient() {
    this.ingredients.push(new FormGroup({
      name: new FormControl('')
    }));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  addInstruction() {
    this.instructions.push(new FormGroup({
      name: new FormControl('') // שימוש ב-FormControl ישירות (ללא שם משתנה)
    }));
  }

  removeInstruction(i: number) {
    this.instructions.removeAt(i);
  }

  onSubmit() {
    this._recipe = this.RecipeForm.value;

    // בדיקה אופציונלית למחיקת שדות ריקים לפני השמירה
    this.cleanEmptyFields();
    this._recipe.dateAdded=new Date(Date.now());
    this._recipe.userCode=this.sessionStorageService.getItem('user').userCode;
    // var temp=this._userService.getUserByName(this._userService.getUserName());
    // שליחת המתכון לשרת
    this.recipeService.setRecipe(this._recipe).subscribe(
      (res) => {
        // Swal.fire("The recipe added succesfully!");
        Swal.fire({
          title: "Sweet!",
          text: "Modal with a custom image.",
          imageUrl: this._recipe.imageRoute,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image"
        });
      }
    );
    // this.router.navigate(['/recipes/all-recipes', { user: this._userService.getUserName() }]); // הפניה לדף המתכונים לאחר הצלחה
    this.router.navigate(['/recipes/all-recipes', { user: this.sessionStorageService.getItem('user').name }]); // הפניה לדף המתכונים לאחר הצלחה

  }

  trackByFn(index: number, item: any) {
    return index;
  }

  cleanEmptyFields() {
    // לולאה למחיקת שדות ריקים מ-ingredients
    for (let i = this.ingredients.length - 1; i >= 0; i--) {
      if (this.ingredients.at(i).get("name")?.value === '') {
        this.ingredients.removeAt(i);
      }
    }

    // לולאה למחיקת שדות ריקים מ-instructions (חזרה על אותו עיקרון)
    for (let i = this.instructions.length - 1; i >= 0; i--) {
      if (this.instructions.at(i).get('name')?.value === '') {
        this.instructions.removeAt(i);
      }
    }
  }
}
