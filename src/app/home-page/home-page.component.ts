import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  displayText = "A.M";

  constructor() { }

  ngOnInit(): void {
  }

  change(){
    this.displayText == "A.M"? this.displayText = "Account Management" : this.displayText = "A.M";
  }
}
