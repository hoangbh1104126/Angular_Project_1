import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class checkComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public msg: Messenger
  ) { }

  ngOnInit(): void {
  }

}

export interface Messenger {
  msg: string,
  check: boolean,
}
