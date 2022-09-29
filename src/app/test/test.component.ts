import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  value: number | string = "1";
  date!: Date;

  ngOnInit(): void {

  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value!;
    this.CalculateAge();
  }

  ageNumber: boolean = true;

  public CalculateAge(): void {
    if (this.date) {
    var timeDiff = Math.abs(Date.now() - new Date(this.date).getTime());
    this.value = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    console.log(this.value);
    }
  }

}
