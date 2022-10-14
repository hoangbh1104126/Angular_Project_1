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

  breakpoint:boolean;

  userData: User[] = usersData;
  mostBalance: User[] = [];
  age_male = new Array<number>(21);
  age_female = new Array<number>(21);

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;

  guest = Array(26)
    .fill(0)
    .map((e, i) => (Math.floor(Math.random() * (111 - 11 + 1)) + 11).toFixed(0))
    .map((i) => Number(i));
  user = Array(26)
    .fill(0)
    .map((e, i) => (Math.floor(Math.random() * (222 - 33 + 1)) + 33).toFixed(0))
    .map((i) => Number(i));

    public chartDay: Partial<ChartOptions> | any;
    public chartWeek: Partial<ChartOptions> | any;
    public commonOptions: Partial<ChartOptions> | any = {
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2022-09-26T18:00:00.000Z",
          "2022-09-26T19:30:00.000Z",
          "2022-09-26T21:00:00.000Z",
          "2022-09-26T22:30:00.000Z",
          "2022-09-26T24:00:00.000Z",
          "2022-09-27T01:30:00.000Z",
          "2022-09-27T03:00:00.000Z",
          "2022-09-27T04:30:00.000Z",
          "2022-09-27T06:00:00.000Z",
          "2022-09-27T07:30:00.000Z",
          "2022-09-27T09:00:00.000Z",
          "2022-09-27T10:30:00.000Z",
          "2022-09-27T12:00:00.000Z",
          "2022-09-27T13:30:00.000Z",
          "2022-09-27T15:00:00.000Z",
          "2022-09-27T16:30:00.000Z",
          "2022-09-27T18:00:00.000Z",
          "2022-09-27T19:30:00.000Z",
          "2022-09-27T21:00:00.000Z",
          "2022-09-27T22:30:00.000Z",
          "2022-09-27T24:00:00.000Z",
          "2022-09-28T01:30:00.000Z",
          "2022-09-28T03:00:00.000Z",
          "2022-09-28T04:30:00.000Z",
          "2022-09-28T06:00:00.000Z",
          "2022-09-28T07:30:00.000Z"
        ]
        //tickAmount: 10,
      },
      stroke: {
        width: 0,
        curve: "smooth"
      },
    };

  constructor(public router: Router) {
    this.breakpoint = window.innerWidth < 1000;
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
        height: 400,
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
        height: 400,
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
          }
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
      legend: {
        offsetY: 5,
      },
      xaxis: {
        categories: Array(21).fill(0).map((e,i)=>(i+20).toFixed(0)).map(i=>Number(i)),
        type: 'numeric',
        tickAmount: 10,
        title: {
          text: "Percent"
        },
        labels: {
          formatter: function(val: any) {
            return Math.abs(Math.round(parseInt(val, 10))) + "%";
          }
        },
      }
    };
    this.initCharts();
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['account_number', 'firstname', 'balance', 'age', 'gender'];
  dataSource1 = this.mostBalance;

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

  public initCharts(): void {
    this.chartDay = {
      series: [
        {
          name: "Guest",
          data: this.guest
        },
        {
          name: "User",
          data: this.user
        }
      ],
      chart: {
        id: "chartweek",
        height: 400,
        type: "area",
        background: "#F6F8FA",
        toolbar: {
          show: false,
          autoSelected: "pan"
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        offsetY: 5,
      },
      stroke: {
        curve: "smooth"
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy - HH:mm'
        }
      },
    };

    this.chartWeek = {
      series: [
        {
          name: "Guest",
          data: this.guest
        },
        {
          name: "User",
          data: this.user
        }
      ],
      chart: {
        height: 300,
        type: "area",
        background: "#F6F8FA",
        toolbar: {
          autoSelected: "selection"
        },
        brush: {
          enabled: true,
          target: "chartweek"
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date("2022-09-26T24:00:00.000Z").getTime(),
            max: new Date("2022-09-27T24:00:00.000Z").getTime(),
          }
        }
      },
      legend: {
        show: false,
      }
    };
  }

  reset(){
    console.clear();
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
