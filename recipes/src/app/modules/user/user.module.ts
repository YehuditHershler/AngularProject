// user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, UserRoutingModule
  ],
  providers:[UserService],
  // exports:[LoginComponent]
})
export class UserModule { }
