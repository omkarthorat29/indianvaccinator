import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: boolean;
  userData: any;
  wantAlert = true;
  constructor(public auth:AuthService,public fauth:AngularFireAuth,public user:UserService,public route: Router) { }

  ngOnInit(): void {
    this.user.getuserData(this.auth.currentUserId).subscribe(data => {
      this.userData = data;
    })
    this.auth.authenticationState.subscribe(val=> {
      if(!val) this.route.navigateByUrl('auth')
    })
  }

  onChnage(){
    let data = {wantAlert: this.wantAlert, uid: this.auth.currentUserId};
    this.user.updateUser(data);
  }

}
