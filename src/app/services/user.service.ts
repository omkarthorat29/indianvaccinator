import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  async addUser(data){
    this.getuserData(data.uid)
    .subscribe((res:any) => {
      if(!res){
        data.pincode = null;
        data.wantAlert = true;
        this.firestore.collection('users').doc(data.uid)
        .set(data, { merge: true });
      }
    })
  }

  updateUser(userData){
    return this.firestore.collection('users')
    .doc(userData.uid).set(userData, { merge: true })
  }

  getuserData(uid){
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  feedback(data){
    return this.firestore.collection('feedback')
    .doc(data.uid).set(data, { merge: true })
  }
}
