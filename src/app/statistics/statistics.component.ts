import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(public router: Router) {
    this.mostBalance.push(
      this.findUserByID(411),
      this.findUserByID(87),
      this.findUserByID(953),
      this.findUserByID(894),
      this.findUserByID(820),
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
          data: [1011, 1110, 1172, 1133, 1031]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val : any) {
          return  "$" + val + ".00";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "S.Ramsey",
          "B.Black",
          "G.Whitfield",
          "H.Kidd",
          "T.Fitzgerald",
        ],
        position: "top",
        labels: {
          offsetY: -18
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
        }
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
            return "$" + val + ".00";
          }
        }
      },
      title: {
        text: "Top 5 users have largest balance",
        floating: false,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444",
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
          'color': 'orange',
          'font-weight': '800',
        };
      case 1:
        return {
          'color': 'teal',
          'font-weight': '600',
        }
      case 2:
        return {
          'color': 'teal',
          'font-weight': '600',
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
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
