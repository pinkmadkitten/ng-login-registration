import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '../app.interfaces';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {

  constructor(private dataService: DataService) { }

  resolve(): Observable<User> {
    return this.dataService.getCurrentUser();
  }
}
