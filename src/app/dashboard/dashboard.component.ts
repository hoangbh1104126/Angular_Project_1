import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import usersData from 'src/accounts.json';
import { User } from '../user';

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
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
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
    'assets/image/business_1.jpeg',
    'assets/image/business_3.jpeg',
    'assets/image/business_2.jpeg'
  ];

  people_img = [
    'assets/image/people_1.jpeg',
    'assets/image/people_2.jpeg',
    'assets/image/people_3.jpeg',
  ];

  statistics_img = [
    'assets/image/statistics_1.jpeg',
    'assets/image/statistics_1.jpeg',
    'assets/image/statistics_1.jpeg'
  ]

  userData: User[] = usersData;
  mostBalance: User[] = [];

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions1: Partial<ChartOptions> | any;

  constructor() {
    this.activeUser = Math.floor(Math.random() * 555);
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
  }

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
