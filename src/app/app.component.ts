import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'indianvaccinator';
  constructor(public auth:AuthService,public route:Router){
    this.route.navigateByUrl('auth')
    this.auth.authenticationState.subscribe(val => {
      if(val){
        this.route.navigateByUrl('home')
      }else{
        this.route.navigateByUrl('auth')
      }
    })
  }

  closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
  }
  openNav() {
    document.getElementById("mySidenav")!.style.width = "100%";
  }
}
