import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-qty-alfa',
  styleUrls: ['./chart-robots.scss'],
  templateUrl: 'chart-robots.html',
})
export class ChartjsLineComponent implements OnDestroy, OnInit {

  data: any;
  options: any;
  themeSubscription: any;
  @Input() cantidadesCompradas: any;
  colors: any;
  chartjs: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables;
      this.chartjs = config.variables.chartjs;
    });
  }

  ngOnInit(): void {

    this.data = {
      labels: ['Año 1', 'Año 2', 'Año 3', 'Año 4', 'Año 5'],
      datasets: [{
        data: [
          this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][0],
          this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][1],
          this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][2],
          this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][3],
          this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][4],
        ],
        label: 'Ensamblados',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.success, 0.3),
        borderColor: this.colors.success,
      }, {
        data: [
          this.cantidadesCompradas['cantidadCostearAlfaFabricados'][0],
          this.cantidadesCompradas['cantidadCostearAlfaFabricados'][1],
          this.cantidadesCompradas['cantidadCostearAlfaFabricados'][2],
          this.cantidadesCompradas['cantidadCostearAlfaFabricados'][3],
          this.cantidadesCompradas['cantidadCostearAlfaFabricados'][4],
        ],
        label: 'Fabricados',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.danger, 0.3),
        borderColor: this.colors.danger,
      }, {
        data: [
          this.cantidadesCompradas['cantidadCostearAlfaOtrosProveedores'][0],
          this.cantidadesCompradas['cantidadCostearAlfaOtrosProveedores'][1],
          this.cantidadesCompradas['cantidadCostearAlfaOtrosProveedores'][2],
          this.cantidadesCompradas['cantidadCostearAlfaOtrosProveedores'][3],
          this.cantidadesCompradas['cantidadCostearAlfaOtrosProveedores'][4],
        ],
        label: 'Otros proveedores',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.warning, 0.3),
        borderColor: this.colors.warning,
      }
      ],
    };

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
            stacked: true,
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
            stacked: true,
            gridLines: {
              display: true,
              color: this.chartjs.axisLineColor,
            },
            ticks: {
              fontColor: this.chartjs.textColor,
              callback: function (value, index, values) {
                return String(value).replace(/(.)(?=(\d{3})+$)/g, '$1.');
              },
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
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
