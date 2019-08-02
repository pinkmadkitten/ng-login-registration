import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: [ './user-info.component.scss' ]
})
export class UserInfoComponent implements OnInit {

  public data: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) {
  }

  public ngOnInit() {
    this.data = this.route.snapshot.data;
  }

  public onDelete() {
    this.dataService.deleteUser(this.data.user.login)
      .subscribe(() => {
        this.router.navigate([ '/login' ]);
      });
  }

}
