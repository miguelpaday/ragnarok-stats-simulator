
import { Component } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Colors, Label } from 'ng2-charts';
import { Stats } from './stats';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ragnarok-stats-sim';
  public stats: Stats[] = [];
  public statNames: string[] = ["Str", "Agi", "Vit", "Int", "Dex", "Luk"];

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        display: false,
        maxTicksLimit: 3,
        max: 100,
        stepSize: 30,
        beginAtZero: true
      },
      pointLabels: {
        fontSize: 15
      },
      
      
    }, 
    tooltips: {
      enabled: false
    },
    animation: {
      duration: 0
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        borderWidth: 0
      }
    }
  };

  public radarChartLabels: Label[] = this.statNames;

  public radarChartData: ChartDataSets[] = [
    // default value
    { data: 
      [0, 0, 0, 0, 0, 0] 
    }
  ];



  public radarChartColor: any[] = [{backgroundColor: ["#a2d2ff"]}];

  public radarChartType: ChartType = 'radar';

  constructor(){

  }

  ngOnInit(){

    //Initialize stats to 0
    this.stats = this.statNames.map(stat => {
      let temp: Stats = {
      statName: stat,
      statValue: 0
    }
    return temp
    });

    
  }

  public isStatZero(statName: string): boolean {

    let findStat: number = this.stats.findIndex((stat) => { 
      return stat.statName === statName;
   })

    if(this.stats[findStat].statValue === 0){
      return true;
    }else{
      return false;
    }
  }

  public addStat(statName: string){
   let statsIndex: number = this.stats.findIndex((stat) => { 
      return stat.statName === statName;
   })
   this.stats[statsIndex].statValue++;
   this.updateChart();
  }

  public reduceStat(statName: string){
    let statsIndex: number = this.stats.findIndex((stat) => { 
       return stat.statName === statName;
    })
    this.stats[statsIndex].statValue--;
    this.updateChart();
   }

  public updateChart(){
    let newChartData: number[] = [];
    this.stats.map(stats => {
      newChartData.push(stats.statValue);
    })

    this.radarChartData = [{ data: newChartData }];
  }

  public getStats(): void {

  }

}

