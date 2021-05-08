import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User;
  authenticationState = new BehaviorSubject(false);
  constructor(public auth:AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      if (user){
        this.user = user;
        this.authenticationState.next(true)
      } else {
        this.authenticationState.next(false)
      }
    })
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.auth.signOut()
  }
}
