import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  // canActivate(): Observable<boolean> {
  //   return this.auth.currentUser$.pipe(
  //     filter((currentUser) => currentUser !== undefined),
  //     map((currentUser) => {
  //       if (!currentUser) {
  //         this.router.navigate(['login']);
  //         return false;
  //       }
  //       return true;
  //     })
  //   );
  // }
}
