import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServicesService } from '../services/login-services.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {


  registerForm = this.fb.group({
    correo: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  nombre_usuario :string = "";

  constructor(private loginService: LoginServicesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.registerForm.controls['password'].value !== this.registerForm.controls['confirmPassword'].value){
      alert("Las contraseñas no coinciden")
      return
    }
    this.nombre_usuario = this.registerForm.controls['correo'].value.split("@")[0];
    const data : FormData = new FormData();
    data.append("name", this.registerForm.controls['correo'].value);
    data.append("password",this.registerForm.controls['password'].value)
    data.append("correo",this.registerForm.controls['correo'].value)
    data.append("finca","1")
    data.append("is_recolector", "true")
    data.append("is_admin","false")
    data.append("cedula","123456789")
    data.append("celular","3155484285")
    data.append("fecha","2000-12-12 11:44:59")
    this.loginService.register(data).subscribe( (data: any) =>  this.completedLogIn(data),
    (error: any) => {                              
      console.error('error caught in component', error)
      alert("Registro Fallido");
    })    
  }

  completedLogIn(data: any) {
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("username", this.nombre_usuario);
    localStorage.setItem("token_access", data.access);
    localStorage.setItem("token_refresh", data.refresh);
    alert("Registro Exitoso");
    this.router.navigate(['home']).then(this.refresh);  
  }

  refresh(){
    window.location.reload();
  }

}
