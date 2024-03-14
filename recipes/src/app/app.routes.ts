//app.routes.ts
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import path from 'path';

export const routes: Routes = [
     {path: '',  redirectTo:"user/login",pathMatch:"full"},
     // {path: 'login', loadChildren:()=>import("./modules/user/login/login.component").then(m=>m.LoginComponent)}, 
     { path: "user", loadChildren:()=>import("./modules/user/user.module").then(m=>m.UserModule) },
     { path: "recipes", loadChildren:()=>import("./modules/recipes/recipes.module").then(m=>m.RecipesModule) },      
     { path: "**",  redirectTo:"user",pathMatch:"full" }      
    ];