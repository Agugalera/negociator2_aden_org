import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-erdos-beta',
  styleUrls: ['./chart-erdos-beta.scss'],
  templateUrl: 'chart-erdos-beta.html',
})
export class ChartjsErdosBetaComponent implements OnDestroy, OnInit {
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
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          callbacks: {
            label: function (value) {
              return String(value.yLabel).replace(/(.)(?=(\d{3})+$)/g, '$1.');
            },
          },
        },
        legend: {
          labels: {
            fontColor: this.chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                callback: function (value, index, values) {
                  return String(value).replace(/(.)(?=(\d{3})+$)/g, '$1.');
                },
              },
            },
          ],
        },
      };

    });
  }

  ngOnInit() {
    this.data = {
      labels: ['Año 1', 'Año 2', 'Año 3', 'Año 4', 'Año 5'],
      datasets: [
        {
          label: 'Costo ensamblado Arbotic',
          data: [
            Math.abs(this.resultadoOperativoBeta['costoUnidadesEnsambladasArboticFlete'][0]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesEnsambladasArboticFlete'][1]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesEnsambladasArboticFlete'][2]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesEnsambladasArboticFlete'][3]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesEnsambladasArboticFlete'][4]),
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.success, 0.8), // green
        },
        {
          label: 'Costo fabricación otros',
          data: [
            Math.abs(this.resultadoOperativoBeta['costoUnidadesOtrosClientesEnsamble'][0]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesOtrosClientesEnsamble'][1]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesOtrosClientesEnsamble'][2]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesOtrosClientesEnsamble'][3]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesOtrosClientesEnsamble'][4]),
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.warning, 0.3), // yellow
        },
        {
          label: 'Costo ensamblado otros',
          data: [
            Math.abs(this.resultadoOperativoBeta['costoUnidadesOtrosClientesFlete'][0]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesOtrosClientesFlete'][1]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesOtrosClientesFlete'][2]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesOtrosClientesFlete'][3]),
            Math.abs(this.resultadoOperativoBeta['costoUnidadesOtrosClientesFlete'][4]),
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.warning, 0.8), // yellow
        },
        {
          label: 'Costo de Mkt',
          data: [
            Math.abs(this.resultadoOperativoBeta['costoMktVentas'][0]),
            Math.abs(this.resultadoOperativoBeta['costoMktVentas'][1]),
            Math.abs(this.resultadoOperativoBeta['costoMktVentas'][2]),
            Math.abs(this.resultadoOperativoBeta['costoMktVentas'][3]),
            Math.abs(this.resultadoOperativoBeta['costoMktVentas'][4]),
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.danger, 0.8), // yellow
        },
        {
          label: 'Margen operativo',
          data: [
            Math.abs(this.resultadoOperativoBeta['margenBrutoTotal'][0]),
            Math.abs(this.resultadoOperativoBeta['margenBrutoTotal'][1]),
            Math.abs(this.resultadoOperativoBeta['margenBrutoTotal'][2]),
            Math.abs(this.resultadoOperativoBeta['margenBrutoTotal'][3]),
            Math.abs(this.resultadoOperativoBeta['margenBrutoTotal'][4]),
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.info, 0.8), // yellow
        },
      ],
    };


  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
