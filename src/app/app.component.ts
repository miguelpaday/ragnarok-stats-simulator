import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
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
  public stats: Stats;
  public statNames: string[] = ["Str", "Agi", "Vit", "Int", "Dex", "Luk"];

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        display: false,
        maxTicksLimit: 5,
      },
      pointLabels: {
        fontSize: 15
      }
    }
  };

  public radarChartLabels: Label[] = this.statNames;

  public radarChartData: ChartDataSets[] = [
    { data: [10, 10, 10, 10, 10, 10] }
  ];

  public radarChartColor: any[] = [{backgroundColor: ["#a2d2ff"]}];

  public radarChartType: ChartType = 'radar';

  constructor(){

  }

  ngOnInit(){
    
  }

  public getStats(): void {

  }

}

