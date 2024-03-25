//login.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {
  FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '../../../session-storage.service';
import Swal from 'sweetalert2';

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
  public user: any;
  // public get user(): User {
  //   return this._user;
  // }
  userName: string = '';
  constructor(private userService: UserService, private _SessionStorageService: SessionStorageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  // ngOnInit(): void {
  //   // קבלת מסר מ-queryParams
  //   const message = this.activatedRoute.snapshot.queryParams['message'];
  //   // הצגת מסר
  //   console.log(`Message: ${message}`);
  //   if (message != null) {
  //     this._SessionStorageService.removeItem('user');
  //     console.log('user removed')
  //   }
  //   this.loginForm = new FormGroup({
  //     "name": new FormControl(this._user.name, [Validators.required, Validators.minLength(3)]),
  //     "password": new FormControl(this._user.password, [Validators.required, Validators.minLength(4)]),
  //   });
  // }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "name": new FormControl(this._user.name, [Validators.required, Validators.minLength(3)]),
      "password": new FormControl(this._user.password, [Validators.required, Validators.minLength(4)]),
      "address": new FormControl(this._user.address),
      "code": new FormControl(this._user.code),
      "email": new FormControl(this._user.email),
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = "יש לתקן את השגיאות בטופס";
      return;
    }
    const user = new User();
    user.name = this.loginForm.value.name;
    user.password = this.loginForm.value.password;
    //   this._user = this.loginForm.value;
    //  //         if (res.name === this._user.name) {
    //   console.log(this._user);
    this.userService.getUserByName(user.name).subscribe({
      //   this.userService.getUserByName(this._user.name).subscribe({
      next: (res) => {
        if (res != null) {
          // בדוק סיסמה
          if (res.password === user.password) {
//          if (res.password != this._user.password) {
//       console.log(this._user.name)
//       // this.userService.setUserName(this._user.name);

// שמור את כל פרטי המשתמש ב-sessionStorage
            this._SessionStorageService.setItem('user', JSON.stringify(res));
            console.log(res);
//             Swal.fire({
//               title: "opps!",
//               text: "invalid password!!",
//               icon: "error"
//             });
//           } else {
//             // localStorage.setItem("user", JSON.stringify(this._user))
//             this.user = this.userService.getUserByName(this._user.name);
//             console.log(this.user)
//             this._SessionStorageService.setItem('user', JSON.stringify(this._user));
            // המשך עם ניווט לדף הרצוי
            Swal.fire({
              title: "hello!",
              text: "welcome " + res.name,
              icon: "success"
            });
            this.router.navigate(['/recipes/all-recipes', { user: res.name }]);


          } else {
            // הצג הודעת שגיאה - סיסמה שגויה
            Swal.fire({
              title: "opps!",
              text: "invalid password!!",
              icon: "error"
            });
          }
        } else {
          // הצג הודעת שגיאה - משתמש לא קיים
          Swal.fire({
            title: "Ho! you not know here!!",
            text: "go to register page ->",
            icon: "error"
          });
          this.router.navigate(['/user/register', { user: user.name }]);
        }
      },
      error: (err) => console.log(err)
    });
  }

}


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
