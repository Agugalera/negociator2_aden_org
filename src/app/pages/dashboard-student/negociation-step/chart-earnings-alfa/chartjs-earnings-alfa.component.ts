import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-earnings-alfa',
  styleUrls: ['./chart-earnings-alfa.scss'],
  templateUrl: 'chart-earnings-alfa.html',
})
export class ChartEarningsAlfaComponent implements OnInit, OnDestroy {

  data: any;
  options: any;
  themeSubscription: any;
  @Input() resultadoOperativoAlfa: any;
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
            }
          }
        },
        scales: {
          xAxes: [
            {
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
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][0],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][1],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][2],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][3],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][4]],
        label: 'Ingresos unidades Ensambladas',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.success, 0.3),
        borderColor: this.colors.success,
      }, {
        data: [
          this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][0],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][1],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][2],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][3],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][4]],
        label: 'Ingresos unidades otros proveedores',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.danger, 0.3),
        borderColor: this.colors.danger,
      }, {
        data: [
          this.resultadoOperativoAlfa['ingresosFabricados'][0],
          this.resultadoOperativoAlfa['ingresosFabricados'][1],
          this.resultadoOperativoAlfa['ingresosFabricados'][2],
          this.resultadoOperativoAlfa['ingresosFabricados'][3],
          this.resultadoOperativoAlfa['ingresosFabricados'][4],
        ],
        label: 'Ingresos unidades fabricadas',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.warning, 0.3),
        borderColor: this.colors.warning,
      }, {
        data: [
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][0] + this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][0] + this.resultadoOperativoAlfa['ingresosFabricados'][0],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][1] + this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][1] + this.resultadoOperativoAlfa['ingresosFabricados'][1],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][2] + this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][2] + this.resultadoOperativoAlfa['ingresosFabricados'][2],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][3] + this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][3] + this.resultadoOperativoAlfa['ingresosFabricados'][3],
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][4] + this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][4] + this.resultadoOperativoAlfa['ingresosFabricados'][4],
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
