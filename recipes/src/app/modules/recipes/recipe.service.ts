import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public thisRecipeCode!:string;
  constructor(private http: HttpClient) { }
  private readonly recipeAPI_URL = 'http://localhost:5113/Recipe';
  private readonly categoryAPI_URL = 'http://localhost:5113/Category';
  
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeAPI_URL);
  }
  setRecipe(recipe:Recipe){
    return this.http.post(this.recipeAPI_URL, recipe)
  }
  getRecipeById(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipeAPI_URL}/${recipeId}`);
  }
  deleteRecipe(code:string){
    return this.http.delete(`${this.recipeAPI_URL}/${code}`);
  }
  ///
  getCategories():Observable<any> {
    return this.http.get<Category[]>(this.categoryAPI_URL)
  }
  getCategoryByCode(code:string):Observable<Category>{
    return this.http.get<Category>(`${this.categoryAPI_URL}/${code}`);
  }
  setThisRecipeCode(x:string){
    this.thisRecipeCode=x;
  }
  getThisRecipeCode(){
    return this.thisRecipeCode;
  }
}
