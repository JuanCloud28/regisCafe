import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/storage.service';
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

  constructor(private loginService: LoginServicesService, private fb: FormBuilder, private storageService: StorageService,private router: Router) { }

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
    this.storageService.setStorageItem({key: "isAuth", value: "true", storageArea: "localStorage" });
    this.storageService.setStorageItem({key: "username", value: this.loginForm.controls['correo'].value.split("@")[0], storageArea: "localStorage" });
    this.storageService.setStorageItem({key: "token_access", value: data.access, storageArea: "localStorage" });
    this.storageService.setStorageItem({key: "token_refresh", value: data.refresh, storageArea: "localStorage" });    
    alert("Autenticación Exitosa");
    this.router.navigate(['home']).then(this.refresh);  
  }

  refresh(){
    window.location.reload();
  }

}
