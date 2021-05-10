import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  showAlert = true;
  user: firebase.User;
  authenticationState = new BehaviorSubject(false);
  authState: any = null;
  constructor(public auth:AngularFireAuth, public userService: UserService, private firestore: AngularFirestore) {
    this.auth.authState.subscribe(user => {
      if (user){
        this.authState = user
        this.userService.addUser(this.userData).then(data => {})
        this.authenticationState.next(true)
      } else {
        this.authenticationState.next(false)
      }
    })
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }

  get userData(): any {
    if ( ! this.isAuthenticated ) {
      return {};
    }

    return {
        uid: this.authState.uid,
        displayName: this.authState.displayName,
        email: this.authState.email,
        phoneNumber: this.authState.phoneNumber,
        photoURL: this.authState.photoURL,
      }
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.auth.signOut().then(() => { this.authenticationState.next(false); location.reload() })
  }

  deleteUser(uid){
    return firebase.auth().currentUser.delete().then(() => {
      this.firestore.collection('users').doc(uid).delete();
      this.authenticationState.next(false)
      location.reload()
    })
  }
}
