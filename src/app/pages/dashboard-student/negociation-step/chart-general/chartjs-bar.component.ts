import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-general-bar',
  styleUrls: ['./chart-general.scss'],
  templateUrl: 'chart-general.html',
})
export class ChartjsBarComponent implements OnDestroy, OnInit {
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
                }
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
          label: 'Margen operativo',
          data: [
            Math.abs(this.resultadoOperativoAlfa['margen'][0]),
            Math.abs(this.resultadoOperativoAlfa['margen'][1]),
            Math.abs(this.resultadoOperativoAlfa['margen'][2]),
            Math.abs(this.resultadoOperativoAlfa['margen'][3]),
            Math.abs(this.resultadoOperativoAlfa['margen'][4])
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.success, 0.8) // green
        },
        {
          label: 'Costo mantenimiento stock',
          data: [
            Math.abs(this.resultadoOperativoAlfa['costoMantenimientoUnidadesSobrantes'][0]),
            Math.abs(this.resultadoOperativoAlfa['costoMantenimientoUnidadesSobrantes'][1]),
            Math.abs(this.resultadoOperativoAlfa['costoMantenimientoUnidadesSobrantes'][2]),
            Math.abs(this.resultadoOperativoAlfa['costoMantenimientoUnidadesSobrantes'][3]),
            Math.abs(this.resultadoOperativoAlfa['costoMantenimientoUnidadesSobrantes'][4]),
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.warning, 0.3), // yellow
        },
        {
          label: 'Costo de regalías',
          data: [
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesFabricadasRegalías'][0]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesFabricadasRegalías'][1]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesFabricadasRegalías'][2]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesFabricadasRegalías'][3]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesFabricadasRegalías'][4]),
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.warning, 0.8), // yellow
        },
        {
          label: 'Costo otras compras',
          data: [
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesCompradasOtrosProveedores'][0]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesCompradasOtrosProveedores'][1]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesCompradasOtrosProveedores'][2]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesCompradasOtrosProveedores'][3]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesCompradasOtrosProveedores'][4])
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.danger, 0.8) // yellow
        },
        {
          label: 'Costo fabricación',
          data: [
            Math.abs(this.resultadoOperativoAlfa['costoUnidadeFabricadasCostoProducción'][0]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadeFabricadasCostoProducción'][1]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadeFabricadasCostoProducción'][2]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadeFabricadasCostoProducción'][3]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadeFabricadasCostoProducción'][4]),
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.info, 0.8), // yellow
        },
        {
          label: 'Costo ensamblados',
          data: [
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesEnsambladasPiezas'][0] + this.resultadoOperativoAlfa['costoUnidadesEnsambladasEnsamble'][0]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesEnsambladasPiezas'][1] + this.resultadoOperativoAlfa['costoUnidadesEnsambladasEnsamble'][1]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesEnsambladasPiezas'][2] + this.resultadoOperativoAlfa['costoUnidadesEnsambladasEnsamble'][2]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesEnsambladasPiezas'][3] + this.resultadoOperativoAlfa['costoUnidadesEnsambladasEnsamble'][3]),
            Math.abs(this.resultadoOperativoAlfa['costoUnidadesEnsambladasPiezas'][4] + this.resultadoOperativoAlfa['costoUnidadesEnsambladasEnsamble'][4])
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.success, 0.3) // yellow
        },
        {
          label: 'Costo marketing',
          data: [
            Math.abs(this.resultadoOperativoAlfa['costoMarketingVentas'][0]),
            Math.abs(this.resultadoOperativoAlfa['costoMarketingVentas'][1]),
            Math.abs(this.resultadoOperativoAlfa['costoMarketingVentas'][2]),
            Math.abs(this.resultadoOperativoAlfa['costoMarketingVentas'][3]),
            Math.abs(this.resultadoOperativoAlfa['costoMarketingVentas'][4]),
          ],
          backgroundColor: NbColorHelper.hexToRgbA(this.colors.danger, 0.3), // yellow
        }
      ],
    };


  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
