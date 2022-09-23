import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import usersData from 'src/accounts.json';
import { User } from '../user';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip
} from "ng-apexcharts";
import { right } from '@popperjs/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  userData: User[] = usersData;
  mostBalance: User[] = [];
  oldest: User[] = [];
  youngest: User[] = [];

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;

  constructor(public router: Router) {
    this.mostBalance.push(
      this.findUserByID(248),
      this.findUserByID(854),
      this.findUserByID(240),
      this.findUserByID(97),
      this.findUserByID(842),
    );
    this.oldest.push(
      this.findUserByID(664),
      this.findUserByID(549),
      this.findUserByID(479),
      this.findUserByID(474),
      this.findUserByID(291),
    );
    this.youngest.push(
      this.findUserByID(95),
      this.findUserByID(905),
      this.findUserByID(816),
      this.findUserByID(215),
      this.findUserByID(157),
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
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        },
      ],
      chart: {
        height: 350,
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
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
    this.chartOptions3 = {
      series: [
        {
          name: "Males",
          data: [
            0.4,
            0.65,
            0.76,
            0.88,
            1.5,
            2.1,
            2.9,
            3.8,
            3.9,
            4.2,
            4,
            4.3,
            4.1,
            4.2,
            4.5,
            3.9,
            3.5,
            3
          ]
        },
        {
          name: "Females",
          data: [
            -0.8,
            -1.05,
            -1.06,
            -1.18,
            -1.4,
            -2.2,
            -2.85,
            -3.7,
            -3.96,
            -4.22,
            -4.3,
            -4.4,
            -4.1,
            -4,
            -4.1,
            -3.4,
            -3.1,
            -2.8
          ]
        }
      ],
      chart: {
        type: "bar",
        height: 440,
        stacked: true
      },
      colors: ["#33cc33", "#FF4560"],
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
          }
        }
      },
      yaxis: {
        min: -5,
        max: 5,
        title: {
          // text: 'Age',
        }
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function(val: any) {
            return val.toString();
          }
        },
        y: {
          formatter: function(val: any) {
            return Math.abs(val) + "%";
          }
        }
      },
      xaxis: {
        categories: [
          "85+",
          "80-84",
          "75-79",
          "70-74",
          "65-69",
          "60-64",
          "55-59",
          "50-54",
          "45-49",
          "40-44",
          "35-39",
          "30-34",
          "25-29",
          "20-24",
          "15-19",
          "10-14",
          "5-9",
          "0-4"
        ],
        title: {
          text: "Percent"
        },
        labels: {
          formatter: function(val: any) {
            return Math.abs(Math.round(parseInt(val, 10))) + "%";
          }
        },
        legend: {
          show: 'false',
          position: 'right',
        }
      }
    };
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['account_number', 'firstname', 'balance', 'age', 'gender'];
  dataSource1 = this.mostBalance;
  dataSource2 = this.oldest;
  dataSource3 = this.youngest;

  findUserByID(id: number): User{
    return this.userData.find((user) => user.account_number === id) as User;
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

  top(user : number): Object {
    switch(user){
      case 0:
        return {
          'color': '#feb019',
          'font-weight': '800',
        };
      case 1:
        return {
          'color': '#ff4560',
          'font-weight': '550',
        }
      case 2:
        return {
          'color': '#00e396',
          'font-weight': '550',
        }
      case 3:
        return {
          'color': '#008ffb',
          'font-weight': '400',
        }
      case 4:
        return {
          'color': '#a58cff',
          'font-weight': '400',
        }
      default:
        return {
          'color': 'olivedrab',
          'font-weight': '400',
        }
    }
  }
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
};
