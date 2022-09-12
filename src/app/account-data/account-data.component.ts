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
import { User } from '../user';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';
import { AddUserComponent } from '../add-user/add-user.component';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { EditUserComponent } from '../edit-user/edit-user.component';


@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss'],
})
export class AccountDataComponent implements OnInit {

  sortedData: User[];
  show : boolean = false;
  menuOpened : boolean = false;
  userShowMenu !: number;

  constructor(private _api: UserService, public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer, private _snackBar: MatSnackBar) {
    this.sortedData = this.UsersData.slice();
  }

  ngOnInit(): void {

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

  selection = new SelectionModel<User>(true, []);

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

  slt : string[] = ["select"];
  edt : string[] = ["edit"];

  displayedCol = this.onDisplayList.concat(this.edt);

  displayedColumns: string[] = this.slt.concat(this.displayedCol);
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
      "firstname": this.randomString(Math.floor(Math.random() * (10 - 6) + 6)),
      "lastname": this.randomString(Math.floor(Math.random() * (10 - 6) + 6)),
      "age": Math.floor(Math.random() * (this.maxAge - this.minAge) + this.minAge),
      "gender": "MF".charAt(Math.floor(Math.random()*2)),
      "address": this.randomString(Math.floor(Math.random() * (20 - 6) + 6)),
      "employer": this.randomString(Math.floor(Math.random() * (10 - 6) + 6)),
      "email": this.randomString(Math.floor(Math.random() * (12 - 6) + 6)) + "@" + this.randomString(Math.floor(Math.random() + 5)) + "." + this.randomString(Math.floor(3)) ,
      "city": this.randomString(Math.floor(Math.random() * (10 - 6) + 6)),
      "state": this.randomString(Math.floor(Math.random() * (10 - 6) + 6)),
      "new": true,
    }

    this.dataSource.data.push(this.newUser);
    this._snackBar.open("Add user #" + this.newUser.account_number + ": " + this.newUser.firstname + " " + this.newUser.lastname + "!", "Continue", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 2500,
    });
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

  styleGender(element : User): Object {
    if (element.gender == "M"){
        return {
          'background-color': '#e8fff3',
          'color': '#95cf89'
        }
    }
    return {
      'background-color': '#fff5f8',
      'color': '#f27d9d'
    }
  }

  userSelected : number[] = [];

  selectRow($event : any, dataSource ?: User) {
    this.selection.toggle(dataSource!); //? Not console.log
    // console.log($event.checked);
    if ($event.checked) {
      this.userSelected.push(dataSource!.account_number);
      console.log("ss" + dataSource!.account_number);
    } else {
      this.userSelected = this.userSelected.filter((o) => o != dataSource!.account_number);
      console.log("dm" + dataSource!.account_number);
    }
  }

  deleteSelectedUser() {
    console.log(this.userSelected);
    this.userSelected.forEach(user => this.deleteUser(user));
  }

  editUser(number : number, enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(EditUserComponent, {
      width: '80%',
      height: '70%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteUser(number : number) {
    this.dataSource.data = this.dataSource.data.filter((item) => item.account_number !== number)
  }

  deleteNewUser(){

  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
