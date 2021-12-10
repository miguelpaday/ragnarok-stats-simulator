
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
  public attrbPoints: number = 0;
  public prevLevel: number = 0;
  public stat_hp: number = 0;
  public stat_atk: number = 0;
  public stat_matk: number = 0;
  public stat_hit: number = 0;
  public stat_critical: number = 0;
  public stat_ASPD: number = 0;
  public stat_hpregen: number = 0;
  public stat_sp: number = 0;
  public stat_def: number = 0;
  public stat_mdef: number = 0;
  public stat_flee: number = 0;
  public stat_critres: number = 0;
  public stat_movespeed: number = 0;
  public stat_spregen: number = 0;

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
      statValue: 10,
      raiseCost: 2
    }
    return temp
    });

    this.updateChart();
    this.updateSubStats();

  }

  public isStatZero(statName: string): boolean {

    let findStat: number = this.stats.findIndex((stat) => {
      return stat.statName === statName;
   })

    if(this.stats[findStat].statValue === 0)
      return true;
      return false;

  }

  public addStat(statName: string){

   let statsIndex: number = this.stats.findIndex((stat) => {
      return stat.statName === statName;
   })
   if(this.attrbPoints >= this.stats[statsIndex].raiseCost){
   this.stats[statsIndex].statValue++;
   this.attrbPoints-= this.stats[statsIndex].raiseCost
   this.stats[statsIndex].raiseCost = this.computeCost(statsIndex)

   this.updateSubStats();
   this.updateChart();
    }
  }

  public computeCost(statsIndex: number): number{
    let statVal = this.stats[statsIndex].statValue
      if(statVal > 0 && statVal < 100){
        return Math.floor((statVal-1)/10)+2
      }else if(statVal > 0 && statVal <= 130){
        return (4*Math.floor((statVal-100)/5))+16
      }
    return 2
  }

  public reduceStat(statName: string){
    let statsIndex: number = this.stats.findIndex((stat) => {
       return stat.statName === statName;
    })
    this.stats[statsIndex].statValue--
    this.stats[statsIndex].raiseCost = this.computeCost(statsIndex)
    this.attrbPoints+= this.stats[statsIndex].raiseCost
    this.updateSubStats();
    this.updateChart();
   }

  public updateChart(){
    let newChartData: number[] = [];
    this.stats.map(stats => {
      newChartData.push(stats.statValue)
    })

    this.radarChartData = [{ data: newChartData }]
  }

  public confirmLevel(): void{
    const currentLevel: number = Number((<HTMLInputElement>document.getElementById('baseLevel')).value)

    this.attrbPoints = 0
      for(let lvl = 1; lvl <= currentLevel; lvl++){
        if ( lvl < 100 ) {
          this.attrbPoints += Math.floor(lvl / 5) + 3
        }else if ( lvl < 151 ) {
          this.attrbPoints += Math.floor(lvl / 10) + 13
        }else if ( lvl < 176 ) {
          this.attrbPoints += Math.floor((lvl - 150)/7) + 28
        }
      }

    this.prevLevel = currentLevel
  }

  public updateSubStats(): void{
  //   public stat_hp: number;
  // public stat_atk: number;
  // public stat_matk: number;
  // public stat_hit: number;
  // public stat_critical: number;
  // public stat_ASPD: number;
  // public stat_hpregen: number;
  // public stat_sp: number;
  // public stat_def: number;
  // public stat_mdef: number;
  // public stat_flee: number;
  // public stat_critres: number;
  // public stat_movespeed: number;
  // public stat_spregen: number;
  this.stat_atk = this.stats[0].statValue + this.stats[4].statValue + Math.round(this.stats[5].statValue/3);
  this.stat_flee = this.stats[1].statValue + Math.round(this.stats[5].statValue/3);
  this.stat_ASPD = Math.round(this.stats[1].statValue/4);
  this.stat_hp = this.stats[2].statValue;
  this.stat_def = Math.round(this.stats[2].statValue/2);
  this.stat_mdef = Math.round(this.stats[2].statValue/5)+(Math.round(this.stats[3].statValue/2))
                  + Math.round(this.stats[4].statValue/5);
  this.stat_hpregen = Math.round(this.stats[2].statValue/5);
  this.stat_matk = (this.stats[3].statValue * 1.5)+Math.round(this.stats[4].statValue/5)+
                Math.round(this.stats[5].statValue/3);
  this.stat_sp = this.stats[3].statValue;
  this.stat_spregen = Math.round(this.stats[3].statValue/6);
  this.stat_hit = this.stats[4].statValue + Math.round(this.stats[5].statValue/3);
  this.stat_critical = +(this.stats[5].statValue * 0.3).toFixed(2);
  }

  public getStats(): void {

  }

}

