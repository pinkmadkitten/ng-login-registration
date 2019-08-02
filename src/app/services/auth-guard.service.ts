import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.dataService.isAuthenticated()) {
      this.router.navigate([ '/login' ]);
      return false;
    }
    return true;
  }
}
