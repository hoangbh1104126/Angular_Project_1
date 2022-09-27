import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';

import usersData from 'src/accounts.json';
import { User } from '../user';

import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgbProgressbarConfig, NgbCarouselConfig],
})
export class DashboardComponent implements OnInit {

  activeUser: number;
  per1: number;

  total: number = 1234567;
  totalDisplay: number = 0;
  large: number = 49587;
  per2: number = Math.floor(this.large*100/this.total);

  current = 0;

  business_img = [
    'assets/image/business_1.png',
    'assets/image/business_2.png',
    'assets/image/business_3.png',
    'assets/image/business_4.png'
  ];

  people_img = [
    'assets/image/people_1.png',
    'assets/image/people_2.png',
    'assets/image/people_3.png',
    'assets/image/people_4.png',
  ];

  userData: User[] = usersData;
  mostBalance: User[] = [];

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;

  age_male = new Array<number>(21);
  age_female = new Array<number>(21);

  today = new Date();

  constructor(config: NgbProgressbarConfig, config_crs: NgbCarouselConfig) {
    config_crs.interval = 2000;
    config_crs.wrap = true;
    config_crs.keyboard = true;
    config_crs.pauseOnHover = true;

    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.height = '10px';

    this.userData.forEach((user) => {
      if(user.gender == "M"){
        this.age_male[user.age-20] = this.age_male[user.age-20] == null ? -1: this.age_male[user.age-20] - 1;
      }
      else {
        this.age_female[user.age-20] = this.age_female[user.age-20] == null ? 1: this.age_female[user.age-20] + 1;
      }
    });
    this.age_male = this.age_male.map(function(each_element){
      return Number((each_element/5.07).toFixed(4));
    });
    this.age_female = this.age_female.map(function(each_element){
      return Number((each_element/4.93).toFixed(4));
    });

    this.activeUser = Math.floor(Math.random() * (678 - 135) + 135);
    this.per1 = Math.floor(this.activeUser/10);
    this.mostBalance.push(
      this.findUserByID(248),
      this.findUserByID(854),
      this.findUserByID(240),
      this.findUserByID(97),
      this.findUserByID(842),
    );
    this.chartOptions1 = {
      series: [
        {
          name: "Balance",
          data: [671, 741, 989, 795, 587],
        }
      ],
      chart: {
        height: 350,
        stacked: true,
        type: "bar"
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
      ],
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          },
          columnWidth: "45%",
          distributed: true,
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val : any) {
          return  "$49," + val + ".00";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "K.Trujillo",
          "O.Clay",
          "W.England",
          "J.Barry",
          "M.Buckner",
        ],
        offsetY: -20,
        position: "top",
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
            ],
            fontSize: "12px"
          },

        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val : any) {
            return "$49," + val + ".00";
          },
        }
      },
    };
    this.chartOptions2 = {
      series: [
        {
          name: "Guest",
          data: Array(19).fill(0).map((e,i)=>(Math.floor(Math.random() * (111 - 11 + 1)) + 11).toFixed(0)).map(i=>Number(i)),
        },
        {
          name: "User",
          data: Array(19).fill(0).map((e,i)=>(Math.floor(Math.random() * (222 - 33 + 1)) + 33).toFixed(0)).map(i=>Number(i)),
        },
      ],
      chart: {
        height: 350,
        stacked: true,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2022-09-24T24:00:00.000Z",
          "2022-09-25T01:30:00.000Z",
          "2022-09-25T03:00:00.000Z",
          "2022-09-25T04:30:00.000Z",
          "2022-09-25T06:00:00.000Z",
          "2022-09-25T07:30:00.000Z",
          "2022-09-25T09:00:00.000Z",
          "2022-09-25T10:30:00.000Z",
          "2022-09-25T12:00:00.000Z",
          "2022-09-25T13:30:00.000Z",
          "2022-09-25T15:00:00.000Z",
          "2022-09-25T16:30:00.000Z",
          "2022-09-25T18:00:00.000Z",
          "2022-09-25T19:30:00.000Z",
          "2022-09-25T21:00:00.000Z",
          "2022-09-25T22:30:00.000Z",
          "2022-09-25T24:00:00.000Z",
          "2022-09-26T01:00:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy - HH:mm'
        }
      },
      legend: {
        offsetY: 5,
      },
    };
    this.chartOptions3 = {
      series: [
        {
          name: "Females",
          data: this.age_female,
        },
        {
          name: "Males",
          data: this.age_male,
        },
      ],
      chart: {
        type: "bar",
        height: 385,
        stacked: true,
      },
      colors: ["#FF4560", "#33cc33"],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },

      grid: {
        xaxis: {
          lines: {
            show: false
          },
        }
      },
      yaxis: {
        min: -10,
        max: 10,
        title: {
          text: 'Age',
        },
        labels: {
          formatter: function(val: any) {
            return Math.abs(Math.round(parseInt(val, 10)));
          }
        },
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function(val: any) {
            return "Age: " + val.toString();
          }
        },
        y: {
          formatter: function(val: any) {
            return Math.abs(val) + "%";
          }
        }
      },
      xaxis: {
        categories: Array(21).fill(0).map((e,i)=>(i+20).toFixed(0)).map(i=>Number(i)),
        type: 'numeric',
        tickAmount: 5,
        title: {
          text: "Percent"
        },
        labels: {
          formatter: function(val: any) {
            return Math.abs(Math.round(parseInt(val, 10))) + "%";
          }
        },
      },
      legend: {
        offsetY: 5,
      },
    };
  }

  img_load = ['assets/image/loading.gif'];
  isLoading: boolean[] = new Array(5).fill(true);

  ngOnInit(): void {
    setInterval(() => {
      this.current = ++this.current % 3;
    }, 2000);
  }

  findUserByID(id: number): User{
    return this.userData.find((user) => user.account_number === id) as User;
  }

}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
