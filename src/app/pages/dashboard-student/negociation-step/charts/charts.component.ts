import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  negotations: any[];

  // Indice por año, 5 años en total
  precioVentasAlfa = [
    140000,
    140000,
    140000,
    140000,
    140000,
  ];
  // Indice por año, 5 años en total
  costoProveedoresLocalesAlfa = [
    100000,
    100000,
    100000,
    100000,
    100000,
  ];
  // Indice por año, 5 años en total
  costoProduccionLocalAlfa = [
    50000,
    50000,
    50000,
    50000,
    50000,
  ];
  // Indice por año, 5 años en total
  costoMantenimientoAlfa = [
    10000,
    10000,
    10000,
    10000,
    10000,
  ];
  // Indice por año, 5 años en total
  costoMktVentasAlfa = [
    11200,
    11200,
    11200,
    11200,
    11200,
  ];
  // Indice por año, 5 años en total
  costoEnsambladoAlfa = [
    26400,
    26400,
    26400,
    26400,
    26400,
  ];

  // Indice por año, tabla: año 1, año 2, ... año 5, cantida modelos (index)
  impactoEnVentasAlfa = {
    1: [180, 234, 304, 395, 514, 1],
    2: [240, 312, 406, 527, 685],
    3: [360, 468, 608, 791, 1028],
    4: [480, 624, 811, 1055, 1371],
    5: [600, 780, 1014, 1318, 1714],
    6: [720, 936, 1217, 1582, 2056],
    7: [840, 1092, 1420, 1845, 2399],
    8: [960, 1248, 1622, 2109, 2742],
    9: [1080, 1404, 1825, 2373, 3085],
    10: [1200, 1560, 2028, 2636, 3427],
  };

  // 5años: Tabla: año1, año2, .., año5, aplicaCondición:key --> valores en porcentaje
  contratoExclusividadBetaVendeAlfa = {
    true: [0, 0.15, 0.3, 0.45, 0.60],
    false: [0, -0.05, -0.1, -0.25, -0.30],
  };

  // 5años: Tabla: año1, año2, .., año5, aplicaCondición:key --> valores en porcentaje
  compartirInfoAlfaConBeta = {
    true: [0, 0.15, 0.15, 0.15, 0.15],
    false: [0, -0.15, -0.15, -0.15, -0.15],
  };

  // 5años: Tabla: año1, año2, .., año5, aplicaCondición:key --> valores en porcentaje
  contratoExclusivoAlfaCompraBeta = {
    true: [0, -0.1, -0.1, -0.1, -0.1],
    false: [0, 0.1, 0.1, 0.1, 0.1],
  };

  comprasOtrosProveedoresSinSuperarComprasMaxBeta = {
    1: [0.7, 0.7, 0.7, 0.7, 0.7],
    2: [0.7, 0.7, 0.7, 0.7, 0.7],
    3: [0.65, 0.65, 0.65, 0.65, 0.65],
    4: [0.65, 0.65, 0.65, 0.65, 0.65],
    5: [0.4, 0.4, 0.4, 0.40, 0.40],
    6: [0.4, 0.4, 0.4, 0.40, 0.40],
    7: [0.2, 0.2, 0.2, 0.2, 0.2],
    8: [0.2, 0.2, 0.2, 0.2, 0.2],
    9: [0, 0, 0, 0, 0],
    10: [0, 0, 0, 0, 0],
  };

  modelosFabricadosAlfa = {
    1: [0.7, 0.7, 0.7, 0.7, 0.7],
    2: [0.7, 0.7, 0.7, 0.7, 0.7],
    3: [0.65, 0.65, 0.65, 0.65, 0.65],
    4: [0.65, 0.65, 0.65, 0.65, 0.65],
    5: [0.4, 0.4, 0.4, 0.40, 0.40],
    6: [0.4, 0.4, 0.4, 0.40, 0.40],
    7: [0.2, 0.2, 0.2, 0.2, 0.2],
    8: [0.2, 0.2, 0.2, 0.2, 0.2],
    9: [0, 0, 0, 0, 0],
    10: [0, 0, 0, 0, 0],
  };

  modelosOfrecidosBetaAlfa = {
    1: [0.7, 0.7, 0.7, 0.7, 0.7],
    2: [0.7, 0.7, 0.7, 0.7, 0.7],
    3: [0.65, 0.65, 0.65, 0.65, 0.65],
    4: [0.65, 0.65, 0.65, 0.65, 0.65],
    5: [0.4, 0.4, 0.4, 0.40, 0.40],
    6: [0.4, 0.4, 0.4, 0.40, 0.40],
    7: [0.2, 0.2, 0.2, 0.2, 0.2],
    8: [0.2, 0.2, 0.2, 0.2, 0.2],
    9: [0, 0, 0, 0, 0],
    10: [0, 0, 0, 0, 0],
  };

  cantidadesCompradas = {
    cantidadesTotalesVender: [0, 0, 0, 0, 0],
    comprasbetaMinimasPorContrato: [0, 0, 0, 0, 0],
    comprasDeBeta: [0, 0, 0, 0, 0],
    comprasOtrosProveedoresSinSuperarComprasMáximasBeta: [0, 0, 0, 0, 0],
    comprasOtrosProveedoresConSuperarComprasMaxBeta: [0, 0, 0, 0, 0],
    comprasOtrosProveedores: [0, 0, 0, 0, 0],
    usoStockBeta: [0, 0, 0, 0, 0],
    fabricarOriginalmente: [0, 0, 0, 0, 0],
    sobrantes: [0, 0, 0, 0, 0],
    saldoFinal: [0, 0, 0, 0, 0],
    cantidadCostearAlfaEnsamblados: [0, 0, 0, 0, 0],
    cantidadCostearAlfaOtrosProveedores: [0, 0, 0, 0, 0],
    cantidadCostearAlfaFabricados: [0, 0, 0, 0, 0],
    cantidadCostearAlfaValidacion: [1, 1, 1, 1, 1],
  };

  resultadoOperativoAlfa = {
    ingresosVentasUnidadesBeta: [0, 0, 0, 0, 0],
    ingresosVentasUnidadesOtrosProveedores: [0, 0, 0, 0, 0],
    ingresosFabricados: [0, 0, 0, 0, 0],
    costoUnidadesEnsambladasPiezas: [0, 0, 0, 0, 0],
    costoUnidadesEnsambladasEnsamble: [0, 0, 0, 0, 0],
    costoUnidadeFabricadasCostoProducción: [0, 0, 0, 0, 0],
    costoUnidadesFabricadasRegalías: [0, 0, 0, 0, 0],
    costoUnidadesCompradasOtrosProveedores: [0, 0, 0, 0, 0],
    costoMantenimientoUnidadesSobrantes: [0, 0, 0, 0, 0],
    costoMarketingVentas: [0, 0, 0, 0, 0],
    margen: [0, 0, 0, 0, 0],
    margenPorc: [0, 0, 0, 0, 0],
  };

  aniosFabrica: number;

  constructor(
    protected dialogRef: NbDialogRef<ChartsComponent>
  ) { }

  ngOnInit() {
    // console.log(this.negotations);
    // console.log(this.getVariable('byntech-comparta-know-how'));
    // console.log(this.getReplyValue('byntech-comparta-know-how'));
    this.getVariable('byntech-comparta-know-how');
    this.calcularAniosFabrica();
    this.calcularCantidadesCompradas();
  }

  close() {
    this.dialogRef.close();
  }

  calcularAniosFabrica() {
    this.aniosFabrica = this.getReplyValue('byntech-comparta-know-how') ? 2 : 4;
  }

  tieneFabrica(anio) {
    if (anio >= this.aniosFabrica) {
      return true;
    } else {
      return false;
    }
  }

  calcularCantidadesCompradas() {
    const _alfaCompraExclusivoBeta = this.getReplyValue('que-arbotic-compre-exclusivamente-a-byntech');
    const _cantidadModelosAEnsamblar = this.getReplyValue('cantidad-modelos-robots-a-ensamblar');
    const _cantidadModelosAFabricar = this.getReplyValue('cantidad-modelos-a-fabricar');
    const _compartirInfoAlfaBeta = this.getReplyValue('arbotic-comparta-tecnologia-vision-artificial');
    const _betaVendeExclusivamenteAlfa = this.getReplyValue('byntech-venda-exclusivamente-a-arbotic');
    const _duracionCompromisoCompraAlfa = this.getReplyValue('duracion-compromiso-compra-arbotic');
    const _cantidadUnidadesComprometeAflaComprar = Number(this.getReplyValue('cantidad-unidades-compromete-arbotic-comprar'));
    const _cantidadMaxUnidadesComprometeByntechEntregar = Number(this.getReplyValue('cantidad-max-unidades-compromete-byntech-entregar'));

    /* 
    Creación de tabla cantidad compradas
    */
    for (const index of [0, 1, 2, 3, 4]) {

      // Armado de fila Cantidades totales a vender por año
      if (this.tieneFabrica(index + 1)) {
        this.cantidadesCompradas['cantidadesTotalesVender'][index] = Math.round(this.impactoEnVentasAlfa[_cantidadModelosAFabricar][index] *
          (1 + this.compartirInfoAlfaConBeta[_compartirInfoAlfaBeta][index]) *
          (1 + this.contratoExclusividadBetaVendeAlfa[_betaVendeExclusivamenteAlfa][index]) *
          (1 + this.contratoExclusivoAlfaCompraBeta[_alfaCompraExclusivoBeta][index]));
      } else {
        this.cantidadesCompradas['cantidadesTotalesVender'][index] = Math.round(this.impactoEnVentasAlfa[_cantidadModelosAEnsamblar][index] *
          (1 + this.compartirInfoAlfaConBeta[_compartirInfoAlfaBeta][index]) *
          (1 + this.contratoExclusividadBetaVendeAlfa[_betaVendeExclusivamenteAlfa][index]) *
          (1 + this.contratoExclusivoAlfaCompraBeta[_alfaCompraExclusivoBeta][index]));
      }
      // Armado de filas Compras a Beta minimas por contrato - Ensamblados
      if (index + 1 <= _duracionCompromisoCompraAlfa &&
        _cantidadMaxUnidadesComprometeByntechEntregar > _cantidadUnidadesComprometeAflaComprar) {
        this.cantidadesCompradas['comprasbetaMinimasPorContrato'][index] = _cantidadUnidadesComprometeAflaComprar;
      } else if (index + 1 <= _duracionCompromisoCompraAlfa &&
        _cantidadMaxUnidadesComprometeByntechEntregar <= _cantidadUnidadesComprometeAflaComprar) {
        this.cantidadesCompradas['comprasbetaMinimasPorContrato'][index] = _cantidadMaxUnidadesComprometeByntechEntregar;
      }

      //Armado de fila Compras a otros proveedores sin superar compras máximas de Byntech -	 Otros proveedores       
      this.cantidadesCompradas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index] =
        !this.tieneFabrica(index + 1) && _cantidadModelosAEnsamblar < 10 ?
          Math.round(this.comprasOtrosProveedoresSinSuperarComprasMaxBeta[_cantidadModelosAEnsamblar][index] * this.cantidadesCompradas['cantidadesTotalesVender'][index])
          : 0;


      // Armado de fila compras de byntech - ensamblados
      // =+IF(AND(D23="NO",$D$8>(D32-D37)),(D32-D37-D33),
      //   IF(AND(D23="NO",$D$8<(D32-D37)),($D$8-D33),0))
      // Si tiene fabrica no se realizan cambios en el array
      if (!this.tieneFabrica(index + 1)) {
        if (_cantidadMaxUnidadesComprometeByntechEntregar >
          this.cantidadesCompradas['cantidadesTotalesVender'][index] - this.cantidadesCompradas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index]) {
          this.cantidadesCompradas['comprasDeBeta'][index] =
            this.cantidadesCompradas['cantidadesTotalesVender'][index] -
            this.cantidadesCompradas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index] -
            this.cantidadesCompradas['comprasbetaMinimasPorContrato'][index];
        } else {
          this.cantidadesCompradas['comprasDeBeta'][index] =
            _cantidadMaxUnidadesComprometeByntechEntregar -
            this.cantidadesCompradas['comprasbetaMinimasPorContrato'][index];
        }
      }
      // Armado de fila Compras a otros proveedores con superar compras máximas de Byntech	 Otros proveedores 
      // =+IF(AND(D23="NO",D32>(D33+D36+D37)),(D32-D33-D36-D37),0)
      if (!this.tieneFabrica(index + 1)) {
        if (this.cantidadesCompradas['cantidadesTotalesVender'][index] >
          this.cantidadesCompradas['comprasbetaMinimasPorContrato'][index] +
          this.cantidadesCompradas['comprasDeBeta'][index] +
          this.cantidadesCompradas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index]
        ) {
          this.cantidadesCompradas['comprasOtrosProveedoresConSuperarComprasMaxBeta'][index] =
            this.cantidadesCompradas['cantidadesTotalesVender'][index] -
            this.cantidadesCompradas['comprasbetaMinimasPorContrato'][index] -
            this.cantidadesCompradas['comprasDeBeta'][index] -
            this.cantidadesCompradas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index];
        }
      }

      // Armado de fila Compras a otros proveedores	 Otros proveedores
      if (this.tieneFabrica(index + 1)) {
        this.cantidadesCompradas['comprasOtrosProveedores'][index] = Math.round(this.modelosOfrecidosBetaAlfa[_cantidadModelosAFabricar][index] *
          this.cantidadesCompradas['cantidadesTotalesVender'][index]);
      }

      // Armado de fila Sobrantes	 Ensamblados
      this.cantidadesCompradas['sobrantes'][index] =
        this.cantidadesCompradas['comprasDeBeta'][index] < 0 ? this.cantidadesCompradas['comprasDeBeta'][index] * -1 : 0;

      // this.cantidadesCompradas['comprasDeBeta'][index] < 0 ? this.cantidadesCompradas['comprasDeBeta'][index] * -1 : 0;

      // Armado de fila: Uso de stock de Byntech	 Ensamblados
      if (!this.tieneFabrica(index + 1)) {
        this.cantidadesCompradas['usoStockBeta'][index] = 0;
      } else {
        if (
          this.cantidadesCompradas['cantidadesTotalesVender'][index] - this.cantidadesCompradas['comprasOtrosProveedores'][index] >
          (index > 0 ? this.cantidadesCompradas['saldoFinal'][index - 1] : 0) + this.cantidadesCompradas['comprasbetaMinimasPorContrato'][index]
        ) {
          this.cantidadesCompradas['usoStockBeta'][index] = (index > 0 ? this.cantidadesCompradas['saldoFinal'][index - 1] : 0) + this.cantidadesCompradas['comprasbetaMinimasPorContrato'][index];
        } else {
          this.cantidadesCompradas['usoStockBeta'][index] =
            this.cantidadesCompradas['cantidadesTotalesVender'][index] - this.cantidadesCompradas['comprasOtrosProveedores'][index];
        }
      }

      // Armado de fila: Fabricar originalmente	 Fabricados
      if (this.tieneFabrica(index + 1)) {
        this.cantidadesCompradas['fabricarOriginalmente'][index] =
          this.cantidadesCompradas['cantidadesTotalesVender'][index] - this.cantidadesCompradas['usoStockBeta'][index] -
          this.cantidadesCompradas['comprasOtrosProveedores'][index];
      }

      // Armado de fila: SALDO FINAL	 Ensamblados
      this.cantidadesCompradas['saldoFinal'][index] =
        index == 0 ? this.cantidadesCompradas['sobrantes'][index] :
          (this.cantidadesCompradas['sobrantes'][index] + this.cantidadesCompradas['saldoFinal'][index - 1] -
            this.cantidadesCompradas['usoStockBeta'][index] +
            (this.tieneFabrica(index + 1) ? this.cantidadesCompradas['comprasbetaMinimasPorContrato'][index] : 0));

      // Armado de fila: Cantidad para Costear en ALFABETIC - Ensamblados
      if (!this.tieneFabrica(index + 1)) {
        this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][index] =
          this.cantidadesCompradas['comprasbetaMinimasPorContrato'][index] + this.cantidadesCompradas['comprasDeBeta'][index];
      } else {
        this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][index] = this.cantidadesCompradas['usoStockBeta'][index];
      }

      // Armado de fila: Cantidad para Costear en ALFABETIC - Otros proveedores
      if (!this.tieneFabrica(index + 1)) {
        this.cantidadesCompradas['cantidadCostearAlfaOtrosProveedores'][index] =
          this.cantidadesCompradas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index] +
          this.cantidadesCompradas['comprasOtrosProveedoresConSuperarComprasMaxBeta'][index];
      } else {
        this.cantidadesCompradas['cantidadCostearAlfaOtrosProveedores'][index] = this.cantidadesCompradas['comprasOtrosProveedores'][index];
      }

      // Armado de fila: Cantidad para Costear en ALFABETIC - Fabricados
      this.cantidadesCompradas['cantidadCostearAlfaFabricados'][index] = this.cantidadesCompradas['fabricarOriginalmente'][index];

      // Armado de fila: Cantidad para Costear en ALFABETIC -  VALIDACIÓN(SUMA CERO) 
      this.cantidadesCompradas['cantidadCostearAlfaValidacion'][index] =
        this.cantidadesCompradas['cantidadesTotalesVender'][index] -
        this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][index] -
        this.cantidadesCompradas['cantidadCostearAlfaOtrosProveedores'][index] -
        this.cantidadesCompradas['cantidadCostearAlfaFabricados'][index];
    }

    // console.log("Tabla cantidadesCompradas:");
    // console.table(this.cantidadesCompradas);

    /*
    Creación de tabla resultados operativo de arbotic
    */
    let _precioPiezasQueVendeBeta = this.getReplyValue('precio-piezas-que-vende-byntech');
    let _regaliasQuePagaAlfaABeta = this.getReplyValue('regalias-paga-arbotic') / 100;

    for (const index of [0, 1, 2, 3, 4]) {

      // Armado de fila Ingresos por ventas unidades Byntech:	Ingresos unidades Ensambladas
      this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][index] =
        this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][index] * this.precioVentasAlfa[index];


      // Armado de fila Ingresos por ventas unidades Otros proveedores	Ingresos unidades otros proveedores
      this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][index] =
        this.cantidadesCompradas['cantidadCostearAlfaOtrosProveedores'][index] * this.precioVentasAlfa[index];

      // Armado de fila Ingresos fabricados	Ingresos unidades fabricadas
      this.resultadoOperativoAlfa['ingresosFabricados'][index] =
        this.cantidadesCompradas['cantidadCostearAlfaFabricados'][index] * this.precioVentasAlfa[index];

      // Armado de fila Costo Unidades Ensambladas - Piezas	Costo ensamblado
      this.resultadoOperativoAlfa['costoUnidadesEnsambladasPiezas'][index] =
        this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][index] * _precioPiezasQueVendeBeta * -1;

      // Armado de fila Costo Unidades Ensambladas - Ensamble	Costo ensamblado
      this.resultadoOperativoAlfa['costoUnidadesEnsambladasEnsamble'][index] =
        this.cantidadesCompradas['cantidadCostearAlfaEnsamblados'][index] * this.costoEnsambladoAlfa[index] * -1;

      // Armado de fila Costo Unidades Ensambladas - Ensamble	Costo ensamblado
      this.resultadoOperativoAlfa['costoUnidadeFabricadasCostoProducción'][index] =
        this.cantidadesCompradas['cantidadCostearAlfaFabricados'][index] * this.costoProduccionLocalAlfa[index] * -1;

      // Armado de fila Costo Unidades Ensambladas - Ensamble	Costo ensamblado
      if (this.tieneFabrica(index + 1)) {
        this.resultadoOperativoAlfa['costoUnidadesFabricadasRegalías'][index] =
          this.cantidadesCompradas['cantidadCostearAlfaFabricados'][index] * this.precioVentasAlfa[index] * _regaliasQuePagaAlfaABeta * -1;
      }

      // Armado de fila Costo Unidades compradas a otros proveedores	Costo otras compras
      this.resultadoOperativoAlfa['costoUnidadesCompradasOtrosProveedores'][index] =
        (this.cantidadesCompradas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index] +
          this.cantidadesCompradas['comprasOtrosProveedoresConSuperarComprasMaxBeta'][index] +
          this.cantidadesCompradas['comprasOtrosProveedores'][index]) * this.costoProveedoresLocalesAlfa[index] * -1;

      // Armado de fila Costo Mantenimiento unidades sobrantes	Costo de stock
      this.resultadoOperativoAlfa['costoMantenimientoUnidadesSobrantes'][index] =
        this.cantidadesCompradas['saldoFinal'][index] * this.costoMantenimientoAlfa[index] * -1;

      // Armado de fila Costo de Marketing y Ventas	Costo de Mkt
      this.resultadoOperativoAlfa['costoMarketingVentas'][index] =
        this.cantidadesCompradas['cantidadesTotalesVender'][index] * this.costoMktVentasAlfa[index] * -1;

      // Armado de fila MARGEN	Margen Bruto
      this.resultadoOperativoAlfa['margen'][index] =
        this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][index] +
        this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][index] +
        this.resultadoOperativoAlfa['ingresosFabricados'][index] +
        this.resultadoOperativoAlfa['costoUnidadesEnsambladasPiezas'][index] +
        this.resultadoOperativoAlfa['costoUnidadesEnsambladasEnsamble'][index] +
        this.resultadoOperativoAlfa['costoUnidadeFabricadasCostoProducción'][index] +
        this.resultadoOperativoAlfa['costoUnidadesFabricadasRegalías'][index] +
        this.resultadoOperativoAlfa['costoUnidadesCompradasOtrosProveedores'][index] +
        this.resultadoOperativoAlfa['costoMantenimientoUnidadesSobrantes'][index] +
        this.resultadoOperativoAlfa['costoMarketingVentas'][index];

      // Armado de fila Margen %
      this.resultadoOperativoAlfa['margenPorc'][index] =
        Math.round(this.resultadoOperativoAlfa['margen'][index] / (
          this.resultadoOperativoAlfa['ingresosVentasUnidadesBeta'][index] +
          this.resultadoOperativoAlfa['ingresosVentasUnidadesOtrosProveedores'][index] +
          this.resultadoOperativoAlfa['ingresosFabricados'][index]) * 100);
    }

    // console.log("Tabla resutados operativos:");
    // console.table(this.resultadoOperativoAlfa);

  }

  getVariable(slug: string) {
    return _.find(this.negotations, function (o) { return o.slug == slug; });
  }

  getReplyValue(slug: string) {
    return _.find(this.negotations, function (o) { return o.slug == slug; }).reply.value;
  }

}
