import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-qty-beta',
  styleUrls: ['./chartjs-qty-beta.scss'],
  templateUrl: 'chartjs-qty-beta.html',
})
export class ChartjsQtyBetaComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  @Input() cantidadesVendidas: any;
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

  ngOnInit(): void {

    // cantidadCostearAlfaEnsamblados: [0, 0, 0, 0, 0],
    // cantidadCostearOtrosClientes: [0, 0, 0, 0, 0],
    // regaliasAlfa: [0, 0, 0, 0, 0],
    // totalUnidades: [0, 0, 0, 0, 0],

    this.data = {
      labels: ['Año 1', 'Año 2', 'Año 3', 'Año 4', 'Año 5'],
      datasets: [{
        data: [
          this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][0],
          this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][1],
          this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][2],
          this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][3],
          this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][4],
        ],
        label: 'Ensamblados Arbotic',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.success, 0.3),
        borderColor: this.colors.success,
      }, {
        data: [
          this.cantidadesVendidas['cantidadCostearOtrosClientes'][0],
          this.cantidadesVendidas['cantidadCostearOtrosClientes'][1],
          this.cantidadesVendidas['cantidadCostearOtrosClientes'][2],
          this.cantidadesVendidas['cantidadCostearOtrosClientes'][3],
          this.cantidadesVendidas['cantidadCostearOtrosClientes'][4],
        ],
        label: 'Otros clientes',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.danger, 0.3),
        borderColor: this.colors.danger,
      },
      {
        data: [
          this.cantidadesVendidas['regaliasAlfa'][0],
          this.cantidadesVendidas['regaliasAlfa'][1],
          this.cantidadesVendidas['regaliasAlfa'][2],
          this.cantidadesVendidas['regaliasAlfa'][3],
          this.cantidadesVendidas['regaliasAlfa'][4],
        ],
        label: 'Regalías de Arbotic',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.warning, 0.3),
        borderColor: this.colors.warning,
      },
      // {
      //   data: [
      //     this.cantidadesVendidas['totalUnidades'][0],
      //     this.cantidadesVendidas['totalUnidades'][1],
      //     this.cantidadesVendidas['totalUnidades'][2],
      //     this.cantidadesVendidas['totalUnidades'][3],
      //     this.cantidadesVendidas['totalUnidades'][4],
      //   ],
      //   label: 'Total',
      //   backgroundColor: NbColorHelper.hexToRgbA(this.colors.info, 0.3),
      //   borderColor: this.colors.info,
      // },
      ],
    };
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
