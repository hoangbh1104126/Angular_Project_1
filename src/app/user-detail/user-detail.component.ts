import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  ngDoCheck(){
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 3;
  }

  breakpoint: number;

  user$ !: Observable<User>;
  id: any;
  constructor(private _route: ActivatedRoute, private _api: UserService) {
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 3;
    this.chartOptions = {
      series: [
        {
          name: "Mon",
          data: this.generateData(8, {
            min: 0,
            max: 10
          })
        },
        {
          name: "Tue",
          data: this.generateData(8, {
            min: 0,
            max: 10
          })
        },
        {
          name: "Wed",
          data: this.generateData(8, {
            min: 0,
            max: 10
          })
        },
        {
          name: "Thu",
          data: this.generateData(8, {
            min: 0,
            max: 10
          })
        },
        {
          name: "Fri",
          data: this.generateData(8, {
            min: 0,
            max: 10
          })
        },
        {
          name: "Sat",
          data: this.generateData(8, {
            min: 2,
            max: 12
          })
        },
        {
          name: "Sun",
          data: this.generateData(8, {
            min: 2,
            max: 15
          })
        },
      ],
      chart: {
        height: 400,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
        text: "Active map"
      },
    };
  }

  ngOnInit(): void {
    let account_number = this._route.snapshot.paramMap.get('account_number');
    this.id = account_number;
    this.user$ = this._api.getUserByNumber(account_number as string);
  }

  show: boolean = false;
  isLoading: boolean = true;
  img_load = ['assets/image/loading.gif'];

  styleGender(element : User): Object {
    if (element.gender == "M"){
      return {
        'padding': '30px',
        'font-size': '32px',
        'background-color': '#e8fff3',
        'color': '#95cf89'
      }
    }
    return {
      'padding': '30px',
      'font-size': '32px',
      'background-color': '#fff5f8',
      'color': '#f27d9d'
    }
  }

  public generateData(count: any, yrange: any) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = this.getDate(i);
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
          x: x,
          y: y
        });
        i++;
      }
      return series;
  }

  getDate(idx: number): string{
    switch(idx){
      case 0: {
        return "Aug 1st";
      }
      case 1: {
        return "Aug 8th";
      }
      case 2: {
        return "Aug 22nd";
      }
      case 3: {
        return "Aug 29th";
      }
      case 4: {
        return "Sep 5th";
      }
      case 5: {
        return "Sep 12th";
      }
      case 6: {
        return "Sep 19th";
      }
      case 7: {
        return "Sep 26th";
      }
      default:
        return "Other";
    }
  }
}
