//recipe.model.ts
export class Recipe {
  code!: string;
  name!: string;
  categoryCode!: string;
  preparationTime!: number;
  difficulty!: number;
  dateAdded!: Date;
  ingredients!: string[];
  preparationMethod!: string[];
  userCode!: string;
  imageRoute!: string;
}
