import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import usersData from 'src/accounts.json';
import { filterUser, User } from '../user';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';
import { AddUserComponent } from '../add-user/add-user.component';


@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss'],
})
export class AccountDataComponent implements OnInit {

  sortedData: User[];
  show : boolean = false;

  constructor(private _api: UserService, public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {
    this.sortedData = this.UsersData.slice();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddUserComponent, {
      width: '80%',
      height: '70%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  Users : User[] = usersData;
  UsersData = this.Users;
  val = this.UsersData.length;

  ngOnInit(){ }

  selection = new SelectionModel<User>(true, []);

  /*

  filterAccount_number !: number;
  filterBalance !: number;
  filterName !: string;
  filterAge !: number;
  filterGender !: string;

  filterUser(num : number){
    switch(num){
      case 1: {
        if(typeof(this.filterAccount_number) != undefined || this.filterAccount_number.toString().length != 0){
          this.sortedData = this.sortedData.filter(
            (obj) => {
              return obj.account_number.toString().includes(this.filterAccount_number.toString());
            }
          );
        } break;
      }
      case 2: {
        if(typeof(this.filterBalance) != undefined||this.filterBalance.toString().length != 0){
          this.sortedData = this.sortedData.filter(
            (obj) => { return obj.balance.toString().includes(this.filterBalance.toString());}
          );
        } break;
      }
      case 3: {
        if(typeof(this.filterName) != undefined || this.filterName.length != 0){
          this.sortedData = this.sortedData.filter(
            (obj) => { return (obj.firstname + " " + obj.lastname).includes(this.filterName);}
          );
        } break;
      }
      case 4: {
        if(typeof(this.filterAge) != undefined || this.filterAge.toString().length != 0){
          this.sortedData = this.sortedData.filter(
            (obj) => { return obj.age.toString().includes(this.filterAge.toString());}
          );
        } break;
      }
      case 5: {
        if(typeof(this.filterGender) != undefined || this.filterGender.length != 0){
          this.sortedData = this.sortedData.filter(
            (obj) => { return obj.gender.toString().includes(this.filterGender);}
          );
        } break;
      }
    }
    this.val = this.sortedData.length;
  }

  */

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'account_number':
          return compare(a.account_number, b.account_number, isAsc);
        case 'balance':
          return compare(a.balance, b.balance, isAsc);
        case 'name':
          return compare(a.firstname + " " + a.lastname, b.firstname + " " + b.lastname, isAsc);
        case 'age':
          return compare(a.age, b.age, isAsc);
        case 'gender':
          return compare(a.gender, b.gender, isAsc);
        default:
          return 0;
      }
    });
  }

  display = new FormControl('');

  displayList: string[] = ['account_number', 'balance', 'firstname', 'age', 'gender', 'address', 'employer', 'email', 'city', 'state'];
  onDisplayList: string[] = ['account_number', 'balance', 'firstname', 'age', 'gender'];

  test : string[] = ["select"];


  displayedColumns: string[] = this.test.concat(this.onDisplayList);
  dataSource = new MatTableDataSource<User>(this.Users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.account_number}`;
  }


  @ViewChild(MatSort) sort!: MatSort;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  newUser!: User;

  minBalance = Math.min.apply(Math, this.dataSource.data.map(function(obj) { return obj.balance }));
  maxBalance = Math.max.apply(Math, this.dataSource.data.map(function(obj) { return obj.balance }));;
  minAge = Math.min.apply(Math, this.dataSource.data.map(function(obj) { return obj.age }));;
  maxAge = Math.max.apply(Math, this.dataSource.data.map(function(obj) { return obj.age }));;

  addRandomUser(){
    this.newUser =
    {
      "account_number": Math.max.apply(Math, this.dataSource.data.map(function(obj) { return obj.account_number })) + 1,
      "balance": Math.floor(Math.random() * (this.maxBalance - this.minBalance) + this.minBalance),
      "firstname": this.randomString(Math.floor(Math.random() * (20 - 6) + 6)),
      "lastname": this.randomString(Math.floor(Math.random() * (20 - 6) + 6)),
      "age": Math.floor(Math.random() * (this.maxAge - this.minAge) + this.minAge),
      "gender": "M",
      "address": this.randomString(Math.floor(Math.random() * (20 - 6) + 6)),
      "employer": this.randomString(Math.floor(Math.random() * (20 - 6) + 6)),
      "email": this.randomString(Math.floor(Math.random() * (20 - 6) + 6)),
      "city": this.randomString(Math.floor(Math.random() * (20 - 6) + 6)),
      "state": this.randomString(Math.floor(Math.random() * (20 - 6) + 6)),
    }

    this.dataSource.data.push(this.newUser);
  }

  randomString(length : number) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
   }
   return result.charAt(0).toUpperCase() + result.slice(1);
}

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
