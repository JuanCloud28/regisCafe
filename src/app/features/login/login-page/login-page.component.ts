import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = this.fb.group({
    correo: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private loginService: LoginServicesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  submit(){
    this.loginService.login(this.loginForm.value).subscribe( (data: any) =>  this.completedLogIn(data),
    (error: any) => {                              
      console.error('error caught in component', error)
      alert("Autenticación Fallida");
    })    
    console.log(this.loginForm.value)
  }

  completedLogIn(data: any) {
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("username", data.username);
    localStorage.setItem("token_access", data.access);
    localStorage.setItem("token_refresh", data.refresh);
    alert("Autenticación Exitosa");
  }

}
