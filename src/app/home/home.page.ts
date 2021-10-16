import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userId: any;
  userName: string;
  scanDetails;
  qrCode;

  constructor(private firestore: AngularFirestore) {
    let user = firebase.auth().currentUser;
    this.userId = user.uid;

    this.firestore.collection('users').doc(this.userId).valueChanges().subscribe( details => {
      this.userName = details['name'];
    })

    this.firestore.collection('users').doc(this.userId).collection('qr-details').valueChanges().subscribe( details => {
      this.scanDetails = details;

      this.qrCode = JSON.stringify(this.scanDetails);
    })
  }




}
