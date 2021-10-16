import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../app/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(
  private auth: AuthService,
  private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
    //   return this.auth.user$.pipe(
    //     take(1),
    //     map(user => user ? true : false),
    //     tap(isLoggedIn => {
    //       if(!isLoggedIn)
    //       {
    //         this.router.navigate(['/login']);
    //         return false;
    //       }
    //     return true;
    //     })
    //   );
    // }

      return new Promise( (resolve, reject)=>{
        firebase.auth().onAuthStateChanged((user: firebase.User)=>{
           if(user){
            resolve(true);
          }else{
            reject(true);
            this.router.navigate(['login']);
          }
        });
      });
    }
  }
