// //register.component.ts
import { AllRecipesComponent } from '../../recipes/all-recipes/all-recipes.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Recipe } from '../../recipes/recipe.model';
import { SessionStorageService } from '../../../session-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  private readonly route: ActivatedRoute = new ActivatedRoute;
    hide: boolean = true;
  _userName!: string;
  registerForm!: FormGroup;
  errorMessage: string = "";
  public _user = new User();
  
  //  constructor(private _userService: UserService, private router: Router) {}
  constructor(private _userService: UserService, private _sessionStorageService: SessionStorageService , private router: Router,route: ActivatedRoute) {
    this.route=route;
    // this._userName=this._userService.getUserName()
    this._userName=this.route.snapshot.params['user'];
  }
  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      "code": new FormControl(this._user.code, [Validators.required]),
      "userName": new FormControl(this._user.name, [Validators.required, Validators.minLength(3)]),
      "address": new FormControl(this._user.address, [Validators.required]),
      "email": new FormControl(this._user.email, [Validators.required]),
      "password": new FormControl(this._user.password, [Validators.required, Validators.minLength(4)]),
    });
  }
  
  registerUser() {
    if (this.registerForm.invalid) {
      this.errorMessage = "יש לתקן את השגיאות בטופס";
      return;
    }

    // קבלת ערכי הטופס
    this._user = this.registerForm.value;
console.log(this._user)



 

    // שליחת המשתמש לשרת באמצעות UserService
    this._userService.addUserToServer(this._user).subscribe(
      (res)=>{
        this.errorMessage = "";
        this._sessionStorageService.setItem(this._user.name, this._user);
        Swal.fire({
          title: "hello to "+this._user.name,
          text: "User successfully created :)",
          icon: "success"
        });
        this.router.navigate(['/recipes/all-recipes', { user: this._user.name }]); // הפניה לדף המתכונים לאחר הצלחה
      }, (error) => {
        this.errorMessage = "אירעה שגיאה בעת התחברות המשתמש"; // הצגת הודעת שגיאה
      });
  }
}



// @Component({
//    selector: 'app-register',  
//   //  standalone: true,
//   //  imports: [],
//    templateUrl: './register.component.html',
//    styleUrl: './register.component.css'
//  })




//   ngOnInit(): void {
  //     // const name = this.route.snapshot.paramMap.get('user');
  //     if(this.route.snapshot.paramMap.get('User')!=null)
  //       this._userName = this.route.snapshot.paramMap.get('User');
  //     // this._userService.setUserName(this.userName);
//     // if (localStorage.getItem("user") != null) {
  //     //   let x = localStorage.getItem("user")
  //     //   if (x != null){
    //     //     console.log(x);
    //     // }
    
    //     // }
    //   }
    //   registerForm!: FormGroup;
    //   private _user: User | null = new User();
    //   public get user(): User | null {
      //     return this._user;
      //   }
      //   @Input()
      //   public set user(value: User) {
        //     var userName=""
        //     const u = localStorage.getItem("user");
        //     if (u) {
          //       const us = JSON.parse(u);
          //       userName = us.userName;
          //     }
          //     this._user = value;
          //     if (this.user != undefined) {
            //       this.registerForm = new FormGroup({
              //         userName: new FormControl(userName, [Validators.required, Validators.minLength(3)]),
              //         address: new FormControl(this.user.address, [Validators.required]),
              //         email: new FormControl(this.user.email, [Validators.required,Validators.email]),
              //         password: new FormControl(this.user.password, [Validators.required, Validators.minLength(4)]),
              //       })
              //     }
              //   }
              //   registerUser() {
                
      //     this.user = this.registerForm.value;          
      //     console.log(this.user);
      //     this._userService.addUserToServer(this._user);
      //     this.router.navigate(['/recipes/all-recipes'])
      //   }
      // }
      // // import { Component, OnInit } from '@angular/core';
      // // import { FormControl, FormGroup, Validators } from '@angular/forms';
      
      // // @Component({
        // //   selector: 'app-register',
        // //   templateUrl: './register.component.html',
        // //   styleUrls: ['./register.component.css']
        // // })
        // // export class RegisterComponent implements OnInit {
          
          // //   registerForm: FormGroup | undefined;
          // //   errorMessage: string = "";
          
          // //   constructor() {
            // //       this.registerForm = new FormGroup({});
            // //    }
            
            // //   ngOnInit(): void {
              // //     this.registerForm = new FormGroup({
                // //       code: new FormControl('', Validators.required),
                // //       name: new FormControl('', [Validators.required, Validators.minLength(3)]),
                // //       address: new FormControl('', Validators.required),
                // //       email: new FormControl('', [Validators.required, Validators.email]),
                // //       password: new FormControl('', [Validators.required, Validators.minLength(4)]),
                // //     });
                // //   }
                
                // //   onSubmit(): void {
                  // //     // TODO: בדוק אם המשתמש קיים
                  // //     if (this.registerForm.invalid) {
                    // //       this.errorMessage = "יש לתקן את השגיאות בטופס";
                    // //       return;
                    // //     }
                    
                    // //     // TODO: הוסף את המשתמש למערכת
                    // //     // ...
                    
                    // //     // הצג הודעה מוצלחת והפנה לדף המתכונים
                    // //     this.errorMessage = "";
                    // //     window.location.href = "/recipes";
                    // //   }
                    // // }
                                        
