//app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from './modules/login/login.component';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from './session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
// imports: [ LoginComponent,  ] // יבא את LoginComponent כאן
// RouterModule.forRoot(routes),RouterModule.forChild(routes)
export class AppComponent {
  title = 'recipes';

  constructor(private _SessionStorageService: SessionStorageService) { }


  logout() {
    try {
      let x = this._SessionStorageService.getItem('user').name
      this._SessionStorageService.removeItem('user');
      Swal.fire({
        title: "Goodbye " + x,
        text: "We hope to see you again soon :)",
      });
    }
    catch { console.log('upsa!') }
    // ניתוב לדף אחר
    // this.router.navigate(['/']);
  }

}
