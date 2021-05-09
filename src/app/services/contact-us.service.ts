import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private firestore: AngularFirestore) { }

  contactUs(data){
    return this.firestore.collection('contactus')
    .doc(data.uid).set(data, { merge: true })
  }
}
