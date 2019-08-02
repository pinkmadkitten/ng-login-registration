import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormType, User } from '../../app.interfaces';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { of, ReplaySubject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: [ './user-form.component.scss' ]
})
export class UserFormComponent implements OnChanges, OnDestroy {

  @Input() public type: FormType = 'edit';
  @Input() public userInfo: User;

  public error: string;
  public editable = true;
  public userForm = this.fb.group({
    name: [ '', Validators.required ],
    login: [ '', Validators.required ],
    city: [ '', Validators.required ],
    password: [ '', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/((?=.*[a-z])(?=.*[$@$!%*?&])(?=.*[A-Z]).+)/gm)
    ]
    ],
    contacts: [ '' ]
  });

  public cities: string[] = [
    'Kharkiv',
    'Kyiv',
    'Lviv',
    'Vinnytsia',
    'Other'
  ];

  get name() {
    return this.userForm.get('name');
  }

  get login() {
    return this.userForm.get('login');
  }

  get city() {
    return this.userForm.get('city');
  }

  get password() {
    return this.userForm.get('password');
  }

  private destroyed$ = new ReplaySubject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private dataService: DataService) {
  }

  public ngOnChanges(changeObj: SimpleChanges) {
    if (changeObj.userInfo) {
      this.populateForm(this.userInfo);
    }
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public onSubmit() {
    if (this.type === 'register') {
      this.dataService.addUser(this.userForm.value)
        .pipe(
          catchError(error => {
            this.error = error.message;
            return of(null);
          }),
          switchMap(() => this.dataService.authorize(this.userForm.value)),
          takeUntil(this.destroyed$)
        )
        .subscribe(() => {
          this.router.navigate(['/info']);
        });
    } else {
      this.dataService.editUser(this.userForm.value).subscribe();
    }
  }

  public onCancel() {
    this.editable = false;
    this.router.navigate([ '/login' ]);
  }

  public onEdit() {
    this.editable = true;
    this.userForm.enable();
  }

  public populateForm(data) {
    this.userForm.disable();
    this.userForm.patchValue({
      ...data
    });
    this.editable = false;
  }

}
