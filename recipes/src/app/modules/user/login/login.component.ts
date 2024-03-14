//login.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [ ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {  
  loginForm!: FormGroup;
  errorMessage: string = "";
  public _user = new User();
  // public get user(): User {
    //   return this._user;
    // }
    userName: string = '';
    constructor(private userService: UserService, private router: Router) { }
    
    ngOnInit(): void {
      this.loginForm = new FormGroup({
        "name": new FormControl(this._user.name, [Validators.required, Validators.minLength(3)]),
        "password": new FormControl(this._user.password, [Validators.required, Validators.minLength(4)]),
      });
    }

    login() {
        if (this.loginForm.invalid) {
          this.errorMessage = "יש לתקן את השגיאות בטופס";
          return;
        }
        
      this._user = this.loginForm.value;
      console.log(this._user);
      this.userService.getUserByName(this._user.name).subscribe({
        next: (res) => {
          this.userService.setUserName(this._user.name);
          if (res != null) {
            console.log(res);
            if (res.name === this._user.name) {
              if (res.password != this._user.password) {
                alert("invalid password!!");
              } else {
                // localStorage.setItem("user", JSON.stringify(this._user))
                alert("hello!!")//אם קיים שולח הודעה
               this.router.navigate(['/recipes/all-recipes', { user: this._user.name }])
                // שלח את פרטי המשתמש לגוף הבקשה (תלוי ב-API שלך)
                // this.userService.loginUser(this._user).subscribe({
                //   next: () => {
                //     this.router.navigate(['/recipes/all-recipes']); // ללא פרמטר user בכתובת ה-URL
                //   },
                //   error: (err: any) => console.log(err)
                // });
              }
            }
          } else {
            this.router.navigate(['/user/register', { user: this._user.name }]);
          }
        },
        error: (err) => console.log(err)
      });
    
    // this._user = this.loginForm.value;
    // console.log(this._user);
    // this.userService.getUserByName(this._user.name).subscribe({
    //   next: (res) => {
    //     if (res != null) {
    //       console.log(res);
    //       if (res.name === this._user.name) {
    //         if (res.password != this._user.password)
    //           alert("invalid password!!")
    //         else {
    //           localStorage.setItem("user", JSON.stringify(this._user))
    //           // this.router.navigate(['/user/register', { user: this._user.name }])
    //           this.router.navigate(['/recipes/all-recipes', { user: this._user.name }])
    //         }
    //       }
    //     }
    //     else{
    //       this.router.navigate(['/user/register', { user: this._user.name }])
    //     }
    //   }
    // }), (err: any) => console.log(err);
  }

}
