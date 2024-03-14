//app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from './modules/login/login.component';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
  
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
// imports: [ LoginComponent,  ] // יבא את LoginComponent כאן
// RouterModule.forRoot(routes),RouterModule.forChild(routes)
export class AppComponent {
  title = 'recipes';
}
