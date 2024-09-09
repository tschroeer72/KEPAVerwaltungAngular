import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from '../../../services/backend.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private backendService: BackendService,
              private router: Router) {
  }

  canActivate(routeSnapshot: ActivatedRouteSnapshot,
              routerSnapshot: RouterStateSnapshot): Observable<boolean> | boolean {

    console.log(routeSnapshot);
    console.log(routerSnapshot);

    if (!this.backendService.isLoggedIn()) {
      const redirect = encodeURI(routerSnapshot.url);
      this.router.navigate(['/login'], {queryParams: {redirect: redirect}});
    }
    return true;
  }
}
