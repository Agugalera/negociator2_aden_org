import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-earnings-beta',
  styleUrls: ['./chart-earnings-beta.scss'],
  templateUrl: 'chart-earnings-beta.html',
})
export class ChartjsLineEarningsBetaComponent implements OnInit, OnDestroy {

  data: any;
  options: any;
  themeSubscription: any;
  @Input() resultadoOperativoBeta: any;
  colors: any;
  chartjs: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables;
      this.chartjs = config.variables.chartjs;


      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function (value) {
              return String(value.yLabel).replace(/(.)(?=(\d{3})+$)/g, '$1.');
            },
          },
        },
        scales: {
          xAxes: [
            {
              // stacked: true,
              gridLines: {
                display: true,
                color: this.chartjs.axisLineColor,
              },
              ticks: {
                fontColor: this.chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              // stacked: true,
              gridLines: {
                display: true,
                color: this.chartjs.axisLineColor,
              },
              ticks: {
                fontColor: this.chartjs.textColor,
                callback: function (value, index, values) {
                  return String(value).replace(/(.)(?=(\d{3})+$)/g, '$1.');
                }
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: this.chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnInit() {
    this.data = {
      labels: ['Año 1', 'Año 2', 'Año 3', 'Año 4', 'Año 5'],
      datasets: [{
        data: [
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][0],
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][1],
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][2],
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][3],
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][4]],
        label: 'Ingresos ventas Arbotic',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.success, 0.3),
        borderColor: this.colors.success,
      }, {
        data: [
          this.resultadoOperativoBeta['ingresosVentasOtros'][0],
          this.resultadoOperativoBeta['ingresosVentasOtros'][1],
          this.resultadoOperativoBeta['ingresosVentasOtros'][2],
          this.resultadoOperativoBeta['ingresosVentasOtros'][3],
          this.resultadoOperativoBeta['ingresosVentasOtros'][4]],
        label: 'Ingresos unidades otros proveedores',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.danger, 0.3),
        borderColor: this.colors.danger,
      }, {
        data: [
          this.resultadoOperativoBeta['ingresosVentasRegalias'][0],
          this.resultadoOperativoBeta['ingresosVentasRegalias'][1],
          this.resultadoOperativoBeta['ingresosVentasRegalias'][2],
          this.resultadoOperativoBeta['ingresosVentasRegalias'][3],
          this.resultadoOperativoBeta['ingresosVentasRegalias'][4],
        ],
        label: 'Ingresos unidades fabricadas',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.warning, 0.3),
        borderColor: this.colors.warning,
      },
      {
        data: [
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][0] + this.resultadoOperativoBeta['ingresosVentasOtros'][0] + this.resultadoOperativoBeta['ingresosVentasRegalias'][0],
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][1] + this.resultadoOperativoBeta['ingresosVentasOtros'][1] + this.resultadoOperativoBeta['ingresosVentasRegalias'][1],
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][2] + this.resultadoOperativoBeta['ingresosVentasOtros'][2] + this.resultadoOperativoBeta['ingresosVentasRegalias'][2],
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][3] + this.resultadoOperativoBeta['ingresosVentasOtros'][3] + this.resultadoOperativoBeta['ingresosVentasRegalias'][3],
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][4] + this.resultadoOperativoBeta['ingresosVentasOtros'][4] + this.resultadoOperativoBeta['ingresosVentasRegalias'][4],
        ],
        label: 'Totales',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.info, 0.3),
        borderColor: this.colors.info,
      },
      ],
    };
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
