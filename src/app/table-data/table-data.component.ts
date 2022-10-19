import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Router } from '@angular/router';
import { ConfirmComponent, ConfirmDialogModel } from '../confirm/confirm.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { checkComponent } from '../confirm/action/check.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {

  @Input() modeLoading!: string;
  @Input() showLoading!: boolean;
  @Input() row!: string;
  @Input() displayCol!: string[];

  dataSource: User[] = [];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public router: Router,
    private _snackBar: MatSnackBar,
  ) {
    // Replace all localhost to https://server-prj-1-angular.herokuapp.com (Method put delete post not working)
    let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow;
    this.remakePaging(url, true);
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

  changeRow: boolean = false;

  currentPage: number = 1;
  currentRow: number = Number(this.row);
  userTotal: number = 1000;
  maxPage:number = Math.ceil(this.userTotal/this.currentRow);

  users: User[] = []
  ngOnInit(): void {
    this.currentRow = Number(this.row);
    this.onDisplayList = this.displayCol;
    this.display = new FormControl(this.onDisplayList);
    this.maxPage = Math.ceil(this.userTotal/this.currentRow);
    this.isLoading = true;
    let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow;
    this.http.get<User[]>(url).subscribe((res: User[]) => {
      this.dataSource = res;
      this.isLoading = false;
    })
    this.refreshDisplayColumns();
    this.remakePaging(url, true);
  }

  onFilter: string = "";

  isFilter: boolean = false;
  filterSearch: string = '';

  displayList: string[] = ['account_number', 'balance', 'firstname', 'age', 'gender', 'address', 'employer', 'email', 'city', 'state'];
  onDisplayList: string[] = ['account_number', 'balance', 'firstname', 'age', 'gender'];

  slt : string[] = ["select"];
  edt : string[] = ["edit"];

  displayedCol = this.onDisplayList.concat(this.edt);
  displayedColumns: string[] = this.slt.concat(this.displayedCol);

  display = new FormControl(this.onDisplayList);

  isClosed: boolean = false;

  refreshDisplayColumns(){
    this.displayedCol = this.onDisplayList.concat(this.edt);
    this.displayedColumns = this.slt.concat(this.displayedCol);
    if(this.onDisplayList.length>=8) this.isClosed = false;
    else this.isClosed = true;
  }

  isLoading = true;

  filterText = '';
  userShowMenu !: number;
  menuOpened : boolean = false;

  remakePaging(url: string, check ?: boolean){
    this.http
    .get<any>(url, {observe: 'response'})
    .subscribe(resp => {
      this.userTotal = Number(resp.headers.get('X-Total-Count'));
      this.maxPage = Math.ceil(this.userTotal/this.currentRow);
      if(check){
        this.newUser.account_number = this.userTotal + 1;
      }
    });
  }

  filter_Search(){
    switch(this.onFilter){
      case '': {
        this.filterAll(); return;
      }
      case 'id': {
        this.filter_ID(); return;
      }
      default: {
        this.filterAll();
      }
    }
  }

  resetFilter(){
    this.onFilter='';
    this.filter_Search();
    this.isFilter = false;
    this.filterSearch = '';
  }

  filterAll(){
    this.currentPage = 1;
    this.isLoading = true;
    this.filterText = this.filterSearch == '' ? '' : '&q=' + this.filterSearch;
    let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow + this.filterText;
    this.http.get<User[]>(url).subscribe((res: User[]) => {
      this.dataSource = res;
      this.isLoading = false;
    })
    this.remakePaging(url);
  }
  filter_ID(){
    this.currentPage = 1;
    this.isLoading = true;
    this.filterText = this.filterSearch == '' ? '' : '&account_number=' +  this.filterSearch;
    let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow + this.filterText;
    this.http.get<User[]>(url).subscribe((res: User[]) => {
      this.dataSource = res;
      this.isLoading = false;
    })
    this.remakePaging(url);
  }
  filterGender(gender: string){
    this.currentPage = 1;
    this.isLoading = true;
    this.filterText = "&gender=" + gender;
    let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow + this.filterText;
    this.http.get<User[]>(url).subscribe((res: User[]) => {
      this.dataSource = res;
      this.isLoading = false;
    })
    this.remakePaging(url);
  }

  more(){
    this.changeRow = true;
    this.isLoading = true;
    this.maxPage = Math.ceil(this.userTotal/this.currentRow);
    this.http.get<User[]>('http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow).subscribe((res: User[]) => {
      this.dataSource = res;
      this.isLoading = false;
    })
  }

  changePage(){
    this.isLoading = true;
    this.http.get<User[]>('http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow + this.isOrder + this.filterText).subscribe((res: User[]) => {
      this.dataSource = res;
      this.isLoading = false;
    });
    this.paginator.pageIndex = this.currentPage - 1;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
          this.isLoading = true;
          this.http.put('http://localhost:3000/users/' + number, result).subscribe(data => {
            console.log(data);
            this._snackBar.open("User #" + number + " edited!", "Continue", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2500,
            });
            this.isLoading = false;
          })
        }
      });
    })
    this.isLoading = true;
    this.http.get<User[]>('http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow).subscribe((res: User[]) => {
      this.dataSource = res;
      this.isLoading = false;
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
  isOrder: string = '';

  sort(att: string){
    let count = this.sort_click[this.countClick(att)];
    this.order = count % 3 == 1? 'asc' : count % 3 == 2 ? 'desc' : '';
    this.currentPage = 1;
    let attSort = att == 'name' ? 'firstname,lastname' : att;
    this.isLoading = true;
    this.isOrder = this.order == '' ? '' : '&_sort=' + attSort + '&_order=' + this.order;
    this.http.get<User[]>('http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow + this.isOrder).subscribe((res: User[]) => {
      this.dataSource = res;
      this.isLoading = false;
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
        this.isLoading = true;
        this.http.get<User[]>('http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow).subscribe((res: User[]) => {
          this.dataSource = res;
          this.isLoading = false;
        })
        this.userTotal = this.userTotal + 1;
        this.maxPage = Math.ceil(this.userTotal/this.currentRow);
        this.newUser.account_number = this.userTotal + 1;
      }
    });
  }

  deleteSelectedUser(){
    const message = `Are you sure you want delete these user?`;
    const dialogData = new ConfirmDialogModel("Delete selected user", message);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      maxWidth: "400px",
      data: dialogData,
      panelClass: ['animate__animated','animate__slideInDown', 'animate__bounce'] //Angular Animation
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      let enterAnimationDuration = "550ms";
      let exitAnimationDuration = "650ms";
      if (confirmed) {
        const user_count = this.userSelected.length;
        this.userSelected.forEach((id) => {
          this.http.delete('http://localhost:3000/users/' + id).subscribe(data => {})
        this.isLoading = true;
        let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow;
        this.http.get<User[]>(url).subscribe((res: User[]) => {
          this.dataSource = res;
          this.isLoading = false;
        })
        this.remakePaging(url);
        });
        this.dialog.open(checkComponent, {
          width: '325px',
          height: '325px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {
            msg: "You have delete " + user_count + " users!",
            check: true,
          }
        });
      } else {
        this.dialog.open(checkComponent, {
          width: '325px',
          height: '325px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {
            msg: "Selected users was not deleted.",
            check: false,
          }
        });
      }
    });
  }

  deleteUser(id: number){
    const message = `Are you sure you want to do delete this user?`;
    const dialogData = new ConfirmDialogModel("Delete single user", message);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      maxWidth: "400px",
      data: dialogData,
      panelClass: ['animate__animated','animate__slideInDown'] //Angular Animation
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      let enterAnimationDuration = "550ms";
      let exitAnimationDuration = "650ms";
      if (confirmed) {
        this.http.delete('http://localhost:3000/users/' + id).subscribe(data => {
        this._snackBar.open("User #" + id + " deleted!", "Continue", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2500,
        });
        })
        this.isLoading = true;
        let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow;
        this.http.get<User[]>(url).subscribe((res: User[]) => {
          this.dataSource = res;
          this.isLoading = false;
        })
        this.remakePaging(url);
        this.dialog.open(checkComponent, {
          width: '325px',
          height: '325px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {
            msg: "You have delete user #" + id + "!",
            check: true,
          }
        });
      } else {
        this.dialog.open(checkComponent, {
          width: '325px',
          height: '325px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {
            msg: "User #" + id + " was not deleted.",
            check: false,
          }
        });
      }
    });
  }

  selection = new SelectionModel<User>(true, []);
  userSelected : number[] = [];

  selectRow(dataSource ?: User) {
    this.selection.toggle(dataSource!);
    if (!this.userSelected.includes(dataSource!.account_number)) {
      this.userSelected.push(dataSource!.account_number);
    } else {
      this.userSelected = this.userSelected.filter((o) => o != dataSource!.account_number);
    }
  }

  isAllSelected() {
    const numSelected = this.userSelected.length;
    const numRows = this.userTotal;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.userSelected.splice(0);
      return;
    }
    this.userSelected = [...Array(this.userTotal).keys()];
    this.selection.select(...this.dataSource);
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.userSelected.includes(row.account_number) ? 'deselect' : 'select'} row ${row.account_number}`;
  }

  viewUserDetails(number: number){
    let link = "/account_management/user/" + number.toString();
    let userDetails: User | undefined;
    let url = 'http://localhost:3000/users/' + number;
    this.http.get<User>(url).subscribe((res: User) => {
      userDetails = res;
      this.isLoading = false;
    })
    this.router.navigateByUrl(link, {
      state: { user: userDetails }
    });
  }

  pageEvent!: PageEvent;

  paging(event: any){
    this.pageEvent = event;
    this.currentPage = this.pageEvent.pageIndex + 1;
    this.currentRow = this.pageEvent.pageSize;
    this.maxPage = Math.ceil(this.userTotal/this.currentRow);
    this.changePage();
  }

  addData: User[] = [];

  onTableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      if(this.currentPage > this.userTotal/this.currentRow)
        return ;
      else {
      this.currentPage = this.currentPage + 1;
      let url = 'http://localhost:3000/users?_page=' + this.currentPage + '&_limit=' + this.currentRow;
      this.isLoading = true;
      this.http.get<User[]>(url).subscribe((res: User[]) => {
        this.addData = res;
        this.isLoading = false;
        this.dataSource = this.dataSource.concat(res);
      });
      }
    }
  }

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
