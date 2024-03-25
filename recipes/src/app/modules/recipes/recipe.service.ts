// recipe-details.component.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public thisRecipeName!:string;
  constructor(private http: HttpClient) { }
  private readonly recipeAPI_URL = 'http://localhost:5113/Recipe';
  private readonly categoryAPI_URL = 'http://localhost:5113/Category';
  
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeAPI_URL);
  }
  setRecipe(recipe:Recipe): Observable<any>{
    return this.http.post(this.recipeAPI_URL, recipe)
  }
  getRecipeByName(recipeName: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipeAPI_URL}/${recipeName}`);
  }
  updateRecipe(code:string, recipe:Recipe):Observable<any>{
    return this.http.put(`${this.recipeAPI_URL}/${code}`, recipe);
  }
  deleteRecipe(code:string){
    return this.http.delete(`${this.recipeAPI_URL}/${code}`);
  }

  ///
  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryAPI_URL)
  }
  getCategoryByCode(code:string):Observable<Category>{
    return this.http.get<Category>(`${this.categoryAPI_URL}/${code}`);
  }
  setThisRecipeName(_name:string){
    this.thisRecipeName=_name;
  }
  getThisRecipeName(){
    return this.thisRecipeName;
  }
}
