import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';

import usersData from 'src/accounts.json';
import { User } from '../user';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DialogRef } from '@angular/cdk/dialog';


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

  constructor(
    private _api: UserService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private _snackBar: MatSnackBar,
  ) {
    this.sortedData = this.UsersData.slice();
  }

  ngOnInit(): void {

  }

  refresh() {
    this.userTotal = this.userTotal;
    this.dataSource.data = this.dataSource.data;
  }

  dialogRef !: DialogRef;
  editedUser !: User;

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, type: string, number ?: number): void {
    this.editedUser != undefined;
    if(type == "add"){
      this.addRandomUser(false);
      let randomUser : User | undefined = this.dataSource.data.find((user) => user.account_number == number);
      const dialogRef = this.dialog.open(AddUserComponent, {
        width: '80%',
        height: '70%',
        enterAnimationDuration,
        exitAnimationDuration,
        data: randomUser,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined){
        this.editedUser = result;
        this.dataSource.data = this.dataSource.data.map((user) => user.account_number == number ? this.editedUser : user);
        this.refresh();
        } else {
          this.dataSource.data = this.dataSource.data.filter((user) => user.account_number != number);
          this.userTotal = this.userTotal - 1;
        }
      });
      return;
    }

    let dataEdit : User | undefined = this.dataSource.data.find((user) => user.account_number == number);

    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '80%',
      height: '70%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: dataEdit,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
      this.editedUser = result;
      this.dataSource.data = this.dataSource.data.map((user) => user.account_number == number ? this.editedUser : user);
    }});
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
        case 'user id':
          return compare(a.account_number, b.account_number, isAsc);
        case 'balance':
          return compare(a.balance, b.balance, isAsc);
        case 'name':
          return compare(a.firstname + " " + a.lastname, b.firstname + " " + b.lastname, isAsc);
        case 'age':
          return compare(a.age, b.age, isAsc);
        case 'gender':
          return compare(a.gender, b.gender, isAsc);
        case 'address':
          return compare(a.address as string, b.address as string, isAsc);
        case 'employer':
          return compare(a.employer as string, b.gender as string, isAsc);
        case 'email':
          return compare(a.email as string, b.email as string, isAsc);
        case 'city':
          return compare(a.city as string, b.city as string, isAsc);
        case 'state':
          return compare(a.state as string, b.state as string, isAsc);
        default:
          return 0;
      }
    });
  }

  display = new FormControl('');

  displayList: string[] = ['user id', 'balance', 'name', 'age', 'gender', 'address', 'employer', 'email', 'city', 'state'];
  onDisplayList: string[] = ['user id', 'balance', 'name', 'age', 'gender'];

  slt : string[] = ["select"];
  edt : string[] = ["edit"];

  displayedCol = this.onDisplayList.concat(this.edt);

  displayedColumns: string[] = this.slt.concat(this.displayedCol);
  dataSource = new MatTableDataSource<User>(this.Users);

  refreshDisplayColumns(){
    this.displayedCol = this.onDisplayList.concat(this.edt);
    this.displayedColumns = this.slt.concat(this.displayedCol);
    this.refresh();
  }

  userTotal : number = Math.max.apply(Math, this.dataSource.data.map(function(obj) { return obj.account_number })) + 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.userSelected.splice(0);
      return;
    }
    this.dataSource.data.forEach((user) => this.userSelected.push(user.account_number));
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

  addCustomUser() {
    this.openDialog("500ms", "500ms", "add", this.userTotal);
  }

  newUser!: User;

  minBalance = Math.min.apply(Math, this.dataSource.data.map(function(obj) { return obj.balance }));
  maxBalance = Math.max.apply(Math, this.dataSource.data.map(function(obj) { return obj.balance }));;
  minAge = Math.min.apply(Math, this.dataSource.data.map(function(obj) { return obj.age }));;
  maxAge = Math.max.apply(Math, this.dataSource.data.map(function(obj) { return obj.age }));;

  addRandomUser(showNoti : boolean){
    this.newUser =
    {
      "account_number": this.userTotal,
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
    this.userTotal = this.userTotal + 1;
    if(showNoti){
      this._snackBar.open("Add user #" + this.newUser.account_number + ": " + this.newUser.firstname + " " + this.newUser.lastname + "!", "Continue", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 2500,
      });
      this.refresh();
    }
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

  selectRow(dataSource ?: User) {
    this.selection.toggle(dataSource!);
    if (!this.userSelected.includes(dataSource!.account_number)) {
      this.userSelected.push(dataSource!.account_number);
    } else {
      this.userSelected = this.userSelected.filter((o) => o != dataSource!.account_number);
    }
  }

  deleteSelectedUser() {
    this._snackBar.open("Delete " + this.userSelected.length + " user!", "Continue", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 2500,
    });
    this.userSelected.forEach(user => this.deleteUser(user));
    this.userSelected.splice(0);
    this.selection.clear();
    this.refresh();
  }

  editUser(number : number) {
    this.openDialog("550ms", "500ms", "edit", number);
    this.refresh();
  }

  deleteUser(number : number) {
    this.dataSource.data = this.dataSource.data.filter((item) => item.account_number !== number);
    this.refresh();
  }

  deleteNewUser(){
    this._snackBar.open("Delete all new user!", "Continue", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 2500,
    });
    this.dataSource.data = this.dataSource.data.filter((user) => !user.new);
    this.refresh();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
