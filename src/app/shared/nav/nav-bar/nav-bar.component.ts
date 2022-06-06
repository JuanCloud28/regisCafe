import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, pluck } from "rxjs/operators";
import { StorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public logoPath = "/assets/regiscafeWhite.png";
  public isLogged$: boolean;
  public username = ""
  constructor(private storageService: StorageService, private router: Router) {
    this.isLogged$ = (localStorage.getItem("isAuth") === "true");
    this.username = localStorage.getItem("username") as string;
  }

  ngOnInit(): void {
  }

  cerrar(){
    localStorage.clear();
    this.router.navigate(['home']).then(this.refresh);    
  }

  refresh(){
    window.location.reload();
  }

}
