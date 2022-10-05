import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Router } from '@angular/router';
import { ConfirmComponent, ConfirmDialogModel } from '../confirm/confirm.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-inf-scroll',
  templateUrl: './test-inf-scroll.component.html',
  styleUrls: ['./test-inf-scroll.component.scss']
})
export class TestInfScrollComponent implements OnInit {

  dataSource: User[] = [];
  addData: User[] = [];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public router: Router,
    private _snackBar: MatSnackBar,
  ) {
    let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow;
    this.newUser =
    {
      "account_number": this.userTotal+1,
      "balance": Math.floor(Math.random() * (50000 - 0)),
      "firstname": this.randomString(Math.floor(Math.random() * (8 - 3) + 3)),
      "lastname": this.randomString(Math.floor(Math.random() * (8 - 3) + 3)),
      "age": Math.floor(Math.random() * (40 - 20) + 20),
      "gender": "MF".charAt(Math.floor(Math.random()*2)),
      "address": this.randomString(Math.floor(Math.random() * (20 - 6) + 6)),
      "employer": this.randomString(Math.floor(Math.random() * (10 - 6) + 6)),
      "email": this.randomString(Math.floor(Math.random() * (12 - 6) + 6)) + "@" + this.randomString(Math.floor(Math.random() + 5)) + "." + this.randomString(Math.floor(3)) ,
      "city": this.randomString(Math.floor(Math.random() * (10 - 6) + 6)),
      "state": this.randomString(Math.floor(Math.random() * (10 - 6) + 6)),
      "new": true,
    }
  }

  currentPage: number = 1;
  currentRow: number = 30;
  userTotal: number = 1000;

  users: User[] = []
  ngOnInit(): void {
    let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow;
    this.http.get<User[]>(url).subscribe((res: User[]) => {
      this.dataSource = res;
    });
  }

  isFilter: boolean = false;
  filterContent: string = '';
  filterID: string = '';

  displayList: string[] = ['account_number', 'balance', 'firstname', 'age', 'gender', 'address', 'employer', 'email', 'city', 'state'];
  onDisplayList: string[] = ['account_number', 'balance', 'firstname', 'age', 'gender', 'address', 'employer', 'email', 'city', 'state'];

  display = new FormControl(this.onDisplayList);

  slt : string[] = ["select"];
  edt : string[] = ["edit"];

  displayedCol = this.onDisplayList.concat(this.edt);
  displayedColumns: string[] = this.onDisplayList; //this.slt.concat(this.displayedCol);

  isClosed: boolean = false;

  refreshDisplayColumns(){
    this.displayedCol = this.onDisplayList.concat(this.edt);
    this.displayedColumns = this.onDisplayList; //this.slt.concat(this.displayedCol);
    if(this.onDisplayList.length>=8) this.isClosed = false;
    else this.isClosed = true;
  }

  onTableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 350;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      this.currentPage = this.currentPage + 1;
      let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow;
      this.http.get<User[]>(url).subscribe((res: User[]) => {
        this.addData = res;
        this.dataSource = this.dataSource.concat(res);
      });
    }
  }

  filterText = '';
  userShowMenu !: number;
  menuOpened : boolean = false;

  filter_all(){
    this.filterID = '';
    this.currentPage = 1;
    let filter: string | undefined = this.filterContent == '' ? undefined : '&q=' + this.filterContent;
    let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow + filter;
    this.http.get<User[]>(url).subscribe((res: User[]) => {
      this.dataSource = res;
    })
  }
  filter_ID(){
    this.filterContent = '';
    this.currentPage = 1;
    let filter: string | undefined = this.filterID == '' ? undefined : '&account_number=' +  this.filterID;
    let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow + filter;
    this.http.get<User[]>(url).subscribe((res: User[]) => {
      this.dataSource = res;
    })
  }
  more(){
    this.currentRow = this.currentRow == 5? 10 : this. currentRow == 10 ? 15 : 5;
    this.http.get<User[]>('http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow).subscribe((res: User[]) => {
      this.dataSource = res;
    })
  }

  getUsers(number: number) {
    return this.http.get('http://localhost:3000/users/' + number);
  }

  editUser(number: number){
    this.getUsers(number).subscribe(data => {
      let enterAnimationDuration = '500ms'; let exitAnimationDuration = '500ms';
      const dialogRef = this.dialog.open(EditUserComponent, {
        width: '65%',
        height: '65%',
        enterAnimationDuration,
        exitAnimationDuration,
        data: data,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined && result.length != 0){
          this.http.put('http://localhost:3000/users/' + number, result).subscribe(data => {
            console.log(data);
            this._snackBar.open("User #" + number + " edited!", "Continue", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2500,
            });
          })
        }
      });
    })

    this.http.get<User[]>('http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow).subscribe((res: User[]) => {
      this.dataSource = res;
    })
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

  sort_click: number[] = Array(26).fill(0);
  order: string = 'asc';

  sort(att: string){
    let count = this.sort_click[this.countClick(att)];
    this.order = count % 3 == 1? 'asc' : count % 3 == 2 ? 'desc' : '';
    let isOrder: string | undefined = this.order == '' ? undefined : '&_order=' + this.order;
    let attSort = att == 'name' ? 'firstname,lastname' : att;
    this.http.get<User[]>('http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow + '&_sort=' + attSort + isOrder).subscribe((res: User[]) => {
      this.dataSource = res;
    })
  }

  countClick(att: string): number{
    switch(att){
      case 'account_number': {
        this.sort_click[0] = this.sort_click[0] + 1;
        return 0;
      }
      case 'balance': {
        this.sort_click[1] = this.sort_click[1] + 1;
        return 1;
      }
      case 'name': {
        this.sort_click[2] = this.sort_click[2] + 1;
        return 2;
      }
      case 'age': {
        this.sort_click[3] = this.sort_click[3] + 1;
        return 3;
      }
      case 'gender': {
        this.sort_click[4] = this.sort_click[4] + 1;
        return 4;
      }
      case 'address': {
        this.sort_click[5] = this.sort_click[5] + 1;
        return 5;
      }
      case 'employer': {
        this.sort_click[6] = this.sort_click[6] + 1;
        return 6;
      }
      case 'email': {
        this.sort_click[7] = this.sort_click[7] + 1;
        return 7;
      }
      case 'city': {
        this.sort_click[8] = this.sort_click[8] + 1;
        return 8;
      }
      case 'state': {
        this.sort_click[9] = this.sort_click[9] + 1;
        return 9;
      } default: return -1;
    }
  }

  newUser: User;

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

  addUser(){
    let enterAnimationDuration = '500ms'; let exitAnimationDuration = '500ms';
    let randomUser : User = this.newUser;
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '65%',
      height: '65%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: randomUser,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.newUser = result;
        this.http.post('http://localhost:3000/users', result as Object).subscribe(data => {
          console.log(data);
          this._snackBar.open("Add user #" + this.userTotal + ": " + this.newUser.firstname + " " + this.newUser.lastname + "!", "Continue", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2500,
          });
        })
        this.http.get<User[]>('http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow).subscribe((res: User[]) => {
          this.dataSource = res;
        })
        this.userTotal = this.userTotal + 1;
        this.newUser.account_number = this.userTotal + 1;
      }
    });
  }

  deleteUser(){
    this.http.delete('http://localhost:3000/users/' + this.selectUser).subscribe(data => {
      console.log(data);
      this._snackBar.open("User #" + this.selectUser + " deleted!", "Continue", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 2500,
      });
    })
    let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow;
    this.http.get<User[]>(url).subscribe((res: User[]) => {
      this.dataSource = res;
    })
  }


  selectUser: string = '';
}

export interface User{
  account_number : number;
  balance : number;
  firstname : string;
  lastname : string;
  age : number
  gender : string;
  address ?: string;
  employer ?: string;
  email ?: string;
  city ?: string;
  state ?: string;
  new ?: boolean;
}
