import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { LoginRoutingModule } from './login-routing.module';
import { NavModule } from 'src/app/shared/nav/nav.module';



@NgModule({
  declarations: [
    LoginPageComponent,
    SignUpPageComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NavModule
  ]
})
export class LoginModule { }
