import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../app/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  user: User;

  constructor(
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) {
    this.user$ = this.afauth.authState.pipe(
      switchMap(user=>
        {
          if(user)
          {
            this.afs.doc(`users/${user.uid}`).valueChanges();
          }else{
            return of(null);
          }
        })
    );
   } //end of constructor

   async login(email, pass)
   {
     const loading = await this.loadingCtrl.create({
       message: 'Authenticating..',
       spinner: 'crescent',
       showBackdrop: true
     });

     loading.present();

     this.afauth.signInWithEmailAndPassword(email,pass).then((data)=> {
       if(!data.user.emailVerified)
       {
         loading.dismiss();
         this.toast('Please verified your email', 'danger');
         this.logout();
       }else{
         loading.dismiss();
         this.router.navigate(['/home']);
       }
     });
   } //end of login

   logout(){
     this.afauth.signOut().then(()=> {
       this.router.navigate(['/auth/login']);
     });
   }

   async toast(message, status)
   {
     const toast = await this.toastr.create({
       message:message,
       position: 'top',
       color: status,
       duration: 1000
     });

     toast.present();
    }

}
