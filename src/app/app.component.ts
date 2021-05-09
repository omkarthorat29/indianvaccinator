import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'indianvaccinator';
  constructor(public auth:AuthService,public route:Router,public user:UserService,private spinner: NgxSpinnerService){
    this.auth.authenticationState.subscribe(val => {
      spinner.show()
      if(!val) this.route.navigateByUrl('auth')
      if(val){
        this.user.getuserData(this.auth.currentUserId)
        .subscribe((data:any) => {
          if(!data) this.route.navigateByUrl('user-data')
          if(data){
            if(!data.phoneNumber || !data.pincode || !data.bod){
              this.route.navigateByUrl('user-data')
            }else{
              this.route.navigateByUrl('home');
            }
          }
        })
      }else{
        this.route.navigateByUrl('auth')
        this.spinner.hide()
      }
    })

    route.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.spinner.show();
      }else{
        this.spinner.hide();
        this.closeNav();
      }
    });
  }

  closeNav() {
    if(!document.getElementById("mySidenav")) return
    document.getElementById("mySidenav")!.style.width = "0";
  }
  openNav() {
    document.getElementById("mySidenav")!.style.width = "100%";
  }
  logout() {
    this.auth.logout()
    this.closeNav()
  }
}
