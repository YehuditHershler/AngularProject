import { FormArray } from "@angular/forms";

//recipe.model.ts
export class Recipe {
  code!: string;
  name!: string;
  categoryCode!: string;
  preparationTime!: number;
  difficulty!: number;
  dateAdded!: Date;
  ingredients!: FormArray[];
  preparationMethod!: FormArray[];
  userCode!: string;
  imageRoute!: string;

  constructor(
    code: string = '',
    name: string = '',
    _categoryCode: string = '',
    _preparationTime: number = 0,
    _difficulty: number = 0,
    _ingredients: FormArray[] = [],
    _instructions: FormArray[] = [],
    _userCode: string = '',
    _imageRout: string = ''
  ) {
    this.code = code;
    this.name = name;
    this.categoryCode = _categoryCode;
    this.preparationTime = _preparationTime;
    this.difficulty = _difficulty;
    this.ingredients = _ingredients;
    this.preparationMethod = _instructions;
    this.userCode = _userCode;
    this.imageRoute = _imageRout;
  }

  update(recipe: Recipe) {
    recipe.code = this.code;
    if (recipe.name != '') {
      this.name = recipe.name;
    }
    if (recipe.categoryCode != '') {
      this.categoryCode = recipe.categoryCode;
    }
    recipe.preparationTime;

    if (recipe.code != '') {
      this.code = recipe.code;
    }


  }
}


// this.code="1234";
// this.name="secret";
// this.categoryCode="1";
// this.preparationTime=1;
// this.difficulty=1;
// // this.dateAdded=;
// // this.ingredients=new String["a","b","c"];
// // this.preparationMethod!: string[];
// this.userCode="1234";
// this.imageRoute="";
