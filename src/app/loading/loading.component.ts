import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(public router: Router,) {
    setTimeout(() => {
      this.router.navigateByUrl('/account_management');
    }, 1000);
  }

  ngOnInit(): void {
  }

}
