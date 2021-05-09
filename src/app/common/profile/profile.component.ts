import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(public auth:AuthService,public user:UserService) { }

  ngOnInit(): void {
    this.user.getuserData(this.auth.currentUserId)
    .subscribe(data => {
      this.userData = data;
    })
  }

}
