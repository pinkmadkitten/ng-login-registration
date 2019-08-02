import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { takeUntil } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit, OnDestroy {
  public username: string;
  public password: string;
  public authorized$: Observable<boolean>;

  private destroyed$ = new ReplaySubject<boolean>();

  constructor(private dataService: DataService, private router: Router) {
  }

  public ngOnInit() {
    this.dataService.authorize({login: null, password: null});
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public onLogin() {
    if (!this.authorized$) {
      this.authorized$ = this.dataService.authorized$();
    }
    this.dataService.authorize({ login: this.username, password: this.password })
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/info']);
        }
    });
  }
}
