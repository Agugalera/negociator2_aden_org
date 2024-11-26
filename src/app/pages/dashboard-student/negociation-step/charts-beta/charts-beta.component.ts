import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-charts-beta',
  templateUrl: './charts-beta.component.html',
  styleUrls: ['./charts-beta.component.scss']
})
export class ChartsBetaComponent implements OnInit {

  negotations: any[];

  // Indice por año, 5 años en total
  precioVentasRobots = [
    140000,
    140000,
    140000,
    140000,
    140000,
  ];
  // Indice por año, 5 años en total
  // costoProveedoresLocalesAlfa = [
  //   100000,
  //   100000,
  //   100000,
  //   100000,
  //   100000,
  // ];
  // Indice por año, 5 años en total
  costoProduccionFleteLocalBeta = [
    50000,
    50000,
    50000,
    50000,
    50000,
  ];
  // Indice por año, 5 años en total
  // costoMantenimientoAlfa = [
  //   10000,
  //   10000,
  //   10000,
  //   10000,
  //   10000,
  // ];
  // Indice por año, 5 años en total
  costoMktVentasBeta = [
    11200,
    11200,
    11200,
    11200,
    11200,
  ];
  // Indice por año, 5 años en total
  costoEnsambleBeta = [
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

  compartirInfoAlfaConBetaParaBeta = {
    true: [0.3, 0.3, 0.3, 0.4, 0.4],
    false: [0, 0, 0, 0, 0],
  };

  // 5años: Tabla: año1, año2, .., año5, aplicaCondición:key --> valores en porcentaje
  contratoExclusivoAlfaCompraBeta = {
    true: [0, -0.1, -0.1, -0.1, -0.1],
    false: [0, 0.1, 0.1, 0.1, 0.1],
  };

  alfaCompreSoloBeta = {
    true: [0.05, 0.05, 0.05, 0.05, 0.05],
    false: [0.01, 0.01, 0.01, 0.01, 0.01],
  };


  betaCompartaKnowHowFabricacion = {
    true: [0.01, 0.01, 0.01, 0.03, 0.03],
    false: [0.1, 0.1, 0.1, 0.25, 0.25],
  };

  // comprasOtrosProveedoresSinSuperarComprasMaxBeta = {
  //   1: [0.7, 0.7, 0.7, 0.7, 0.7],
  //   2: [0.7, 0.7, 0.7, 0.7, 0.7],
  //   3: [0.65, 0.65, 0.65, 0.65, 0.65],
  //   4: [0.65, 0.65, 0.65, 0.65, 0.65],
  //   5: [0.4, 0.4, 0.4, 0.40, 0.40],
  //   6: [0.4, 0.4, 0.4, 0.40, 0.40],
  //   7: [0.2, 0.2, 0.2, 0.2, 0.2],
  //   8: [0.2, 0.2, 0.2, 0.2, 0.2],
  //   9: [0, 0, 0, 0, 0],
  //   10: [0, 0, 0, 0, 0],
  // };

  modelosFabricadosAlfa = {
    1: [0.7, 0.7, 0.7, 0.7, 0.7],
    2: [0.7, 0.7, 0.7, 0.7, 0.7],
    3: [0.65, 0.65, 0.65, 0.65, 0.65],
    4: [0.65, 0.65, 0.65, 0.65, 0.65],
    5: [0.4, 0.4, 0.4, 0.40, 0.40],
    6: [0.4, 0.4, 0.4, 0.40, 0.40],
    7: [0.2, 0.2, 0.2, 0.2, 0.2],
    8: [0.2, 0.2, 0.2, 0.2, 0.2],
    9: [0.1, 0.1, 0.1, 0.1, 0.1],
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
    9: [0.1, 0.1, 0.1, 0.1, 0.1],
    10: [0, 0, 0, 0, 0],
  };






  cantidadesVendidas = {
    cantidadesTotalesVender: [0, 0, 0, 0, 0],
    ventasBetaMinimasPorContrato: [0, 0, 0, 0, 0],
    ventasAdicionalesAlfabeticPrevioFabrica: [0, 0, 0, 0, 0],
    saldoStock: [0, 0, 0, 0, 0],
    comprasOtrosProveedoresSinSuperarComprasMáximasBeta: [0, 0, 0, 0, 0],
    comprasOtrosProveedoresConSuperarComprasMaxBeta: [0, 0, 0, 0, 0],
    comprasOtrosProveedores: [0, 0, 0, 0, 0],
    usoStockBeta: [0, 0, 0, 0, 0],
    fabricarOriginalmente: [0, 0, 0, 0, 0],
    sobrantes: [0, 0, 0, 0, 0],
    saldoFinal: [0, 0, 0, 0, 0],

    ventaOtrasEmpresasPaisAlfa: [0, 0, 0, 0, 0],
    aumentoDisminucionVentasCompartirKnowHow: [0, 0, 0, 0, 0],
    aumentoDisminucionVentasExclusividadAlfaCompraBeta: [0, 0, 0, 0, 0],
    ventasTenerKnowHowAlfa: [0, 0, 0, 0, 0],


    cantidadCostearAlfaEnsamblados: [0, 0, 0, 0, 0],
    cantidadCostearOtrosClientes: [0, 0, 0, 0, 0],
    regaliasAlfa: [0, 0, 0, 0, 0],
    totalUnidades: [0, 0, 0, 0, 0],

    // cantidadCostearAlfaOtrosProveedores: [0, 0, 0, 0, 0], //Eliminar
    // cantidadCostearAlfaFabricados: [0, 0, 0, 0, 0],
    // cantidadCostearAlfaValidacion: [1, 1, 1, 1, 1],
  };

  resultadoOperativoBeta = {
    ingresosVentasEnsamblados: [0, 0, 0, 0, 0],
    ingresosVentasOtros: [0, 0, 0, 0, 0],
    ingresosVentasRegalias: [0, 0, 0, 0, 0],
    costoUnidadesEnsambladasArboticFlete: [0, 0, 0, 0, 0],
    costoUnidadesOtrosClientesFlete: [0, 0, 0, 0, 0],
    costoUnidadesOtrosClientesEnsamble: [0, 0, 0, 0, 0],
    costoMktVentas: [0, 0, 0, 0, 0],

    margenBrutoAlfa: [0, 0, 0, 0, 0],
    margenBrutoOtros: [0, 0, 0, 0, 0],
    margenBrutoTotal: [0, 0, 0, 0, 0],
    margenPorc: [0, 0, 0, 0, 0],
  };

  aniosFabrica: number;

  constructor(
    protected dialogRef: NbDialogRef<ChartsBetaComponent>
  ) { }

  ngOnInit() {
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
    const _betaComparteKnowHowFabricacion = this.getReplyValue('byntech-comparta-know-how');
    const _compartirInfoAlfaBeta = this.getReplyValue('arbotic-comparta-tecnologia-vision-artificial');
    const _betaVendeExclusivamenteAlfa = this.getReplyValue('byntech-venda-exclusivamente-a-arbotic');
    const _duracionCompromisoCompraAlfa = this.getReplyValue('duracion-compromiso-compra-arbotic');
    const _cantidadUnidadesComprometeAflaComprar = Number(this.getReplyValue('cantidad-unidades-compromete-arbotic-comprar'));
    const _cantidadMaxUnidadesComprometeByntechEntregar = Number(this.getReplyValue('cantidad-max-unidades-compromete-byntech-entregar'));

    /* 
    Creación de tabla cantidad compradas
    */
    for (const index of [0, 1, 2, 3, 4]) {

      //Armado de fila Cantidades totales a vender por año de Alfabetic      
      if (this.tieneFabrica(index + 1)) {
        this.cantidadesVendidas['cantidadesTotalesVender'][index] = Math.round(this.impactoEnVentasAlfa[_cantidadModelosAFabricar][index] *
          (1 + this.compartirInfoAlfaConBeta[_compartirInfoAlfaBeta][index]) *
          (1 + this.contratoExclusividadBetaVendeAlfa[_betaVendeExclusivamenteAlfa][index]) *
          (1 + this.contratoExclusivoAlfaCompraBeta[_alfaCompraExclusivoBeta][index]));
      } else {
        this.cantidadesVendidas['cantidadesTotalesVender'][index] = Math.round(this.impactoEnVentasAlfa[_cantidadModelosAEnsamblar][index] *
          (1 + this.compartirInfoAlfaConBeta[_compartirInfoAlfaBeta][index]) *
          (1 + this.contratoExclusividadBetaVendeAlfa[_betaVendeExclusivamenteAlfa][index]) *
          (1 + this.contratoExclusivoAlfaCompraBeta[_alfaCompraExclusivoBeta][index]));
      }

      //Armado de fila Compras a otros proveedores sin superar compras máximas de Byntech -	 Otros proveedores       
      this.cantidadesVendidas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index] =
        !this.tieneFabrica(index + 1) && _cantidadModelosAEnsamblar < 10 ?
          Math.round(this.comprasOtrosProveedoresSinSuperarComprasMaxBeta[_cantidadModelosAEnsamblar][index] * this.cantidadesVendidas['cantidadesTotalesVender'][index])
          : 0;

      // // Armado de filas Compras a Beta minimas por contrato - Ensamblados
      if (index + 1 <= _duracionCompromisoCompraAlfa &&
        _cantidadMaxUnidadesComprometeByntechEntregar > _cantidadUnidadesComprometeAflaComprar) {
        this.cantidadesVendidas['ventasBetaMinimasPorContrato'][index] = _cantidadUnidadesComprometeAflaComprar;
      } else if (index + 1 <= _duracionCompromisoCompraAlfa &&
        _cantidadMaxUnidadesComprometeByntechEntregar <= _cantidadUnidadesComprometeAflaComprar) {
        this.cantidadesVendidas['ventasBetaMinimasPorContrato'][index] = _cantidadMaxUnidadesComprometeByntechEntregar;
      }

      // Armado de filas Ventas adicionales a Alfabetic previo a fábrica
      if (!this.tieneFabrica(index + 1) && _cantidadMaxUnidadesComprometeByntechEntregar > (
        this.cantidadesVendidas['cantidadesTotalesVender'][index] - this.cantidadesVendidas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index]
      )) {
        this.cantidadesVendidas['ventasAdicionalesAlfabeticPrevioFabrica'][index] =
          Math.round(
            this.cantidadesVendidas['cantidadesTotalesVender'][index] - this.cantidadesVendidas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index] -
            this.cantidadesVendidas['ventasBetaMinimasPorContrato'][index]
          );
      } else if (!this.tieneFabrica(index + 1) && _cantidadMaxUnidadesComprometeByntechEntregar < (
        this.cantidadesVendidas['cantidadesTotalesVender'][index] - this.cantidadesVendidas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index]
      )) {
        this.cantidadesVendidas['ventasAdicionalesAlfabeticPrevioFabrica'][index] = _cantidadMaxUnidadesComprometeByntechEntregar - this.cantidadesVendidas['ventasBetaMinimasPorContrato'][index]
      }


      //  Armado de fila Compras a otros proveedores con superar compras máximas de Byntech
      if (!this.tieneFabrica(index + 1)) {
        if (this.cantidadesVendidas['cantidadesTotalesVender'][index] >
          this.cantidadesVendidas['ventasBetaMinimasPorContrato'][index] +
          this.cantidadesVendidas['ventasAdicionalesAlfabeticPrevioFabrica'][index] +
          this.cantidadesVendidas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index]
        ) {
          this.cantidadesVendidas['comprasOtrosProveedoresConSuperarComprasMaxBeta'][index] =
            this.cantidadesVendidas['cantidadesTotalesVender'][index] -
            this.cantidadesVendidas['ventasBetaMinimasPorContrato'][index] -
            this.cantidadesVendidas['ventasAdicionalesAlfabeticPrevioFabrica'][index] -
            this.cantidadesVendidas['comprasOtrosProveedoresSinSuperarComprasMáximasBeta'][index];
        }
      }

      // Armado de fila Compras a otros proveedores	 Otros proveedores
      if (this.tieneFabrica(index + 1)) {
        this.cantidadesVendidas['comprasOtrosProveedores'][index] = Math.round(this.modelosOfrecidosBetaAlfa[_cantidadModelosAFabricar][index] *
          this.cantidadesVendidas['cantidadesTotalesVender'][index]);
      }

      // Armado de fila: Uso de stock de Byntech	 Ensamblados
      if (!this.tieneFabrica(index + 1)) {
        this.cantidadesVendidas['usoStockBeta'][index] = 0;
      } else {
        if (
          this.cantidadesVendidas['cantidadesTotalesVender'][index] - this.cantidadesVendidas['comprasOtrosProveedores'][index] >
          (index > 0 ? this.cantidadesVendidas['saldoFinal'][index - 1] : 0) + this.cantidadesVendidas['ventasBetaMinimasPorContrato'][index]
        ) {
          this.cantidadesVendidas['usoStockBeta'][index] = (index > 0 ? this.cantidadesVendidas['saldoFinal'][index - 1] : 0) + this.cantidadesVendidas['ventasBetaMinimasPorContrato'][index];
        } else {
          this.cantidadesVendidas['usoStockBeta'][index] =
            this.cantidadesVendidas['cantidadesTotalesVender'][index] - this.cantidadesVendidas['comprasOtrosProveedores'][index];
        }
      }

      // Armado de fila: Fabricar originalmente	 Fabricados
      if (this.tieneFabrica(index + 1)) {
        this.cantidadesVendidas['fabricarOriginalmente'][index] =
          this.cantidadesVendidas['cantidadesTotalesVender'][index] - this.cantidadesVendidas['usoStockBeta'][index] -
          this.cantidadesVendidas['comprasOtrosProveedores'][index];
      }

      // Armado de fila SALDOS DE STOCK
      // Siempre es cero

      // Armado de fila Sobrantes	 Ensamblados
      this.cantidadesVendidas['sobrantes'][index] =
        this.cantidadesVendidas['ventasAdicionalesAlfabeticPrevioFabrica'][index] < 0 ?
          this.cantidadesVendidas['ventasAdicionalesAlfabeticPrevioFabrica'][index] * -1 : 0;

      // Armado de fila: SALDO FINAL	 Ensamblados
      this.cantidadesVendidas['saldoFinal'][index] =
        index == 0 ? this.cantidadesVendidas['sobrantes'][index] :
          (this.cantidadesVendidas['sobrantes'][index] + this.cantidadesVendidas['saldoFinal'][index - 1] -
            this.cantidadesVendidas['usoStockBeta'][index] +
            (this.tieneFabrica(index + 1) ? this.cantidadesVendidas['ventasBetaMinimasPorContrato'][index] : 0));

      // Armado de fila: Ventas a otras empresas del país Alfabetic (NO EXCLUSIVIDAD de Bentych con Alfabetic)	 Ventas a otros clientes 
      if (!_betaVendeExclusivamenteAlfa) {
        const _tmpContratoExclusividadBetaVendeAlfa = {
          false: [0.15, 0.15, 0.15, 0.3, 0.3],
          true: [0, 0, 0, 0, 0],
        };
        this.cantidadesVendidas['ventaOtrasEmpresasPaisAlfa'][index] =
          Math.round(this.cantidadesVendidas['cantidadesTotalesVender'][index] * _tmpContratoExclusividadBetaVendeAlfa[_betaVendeExclusivamenteAlfa][index]);
      }


      // Armado de fila:  Aumento o disminución de ventas por compartir KnowHow de fabricación	 Ventas a otros clientes 
      this.cantidadesVendidas['aumentoDisminucionVentasCompartirKnowHow'][index] =
        Math.round(this.cantidadesVendidas['cantidadesTotalesVender'][index] * this.betaCompartaKnowHowFabricacion[_betaComparteKnowHowFabricacion][index]);

      // Armado de fila:  Aumento o disminución de ventas por Exclusividad de compra de Alfa a Beta	 Ventas a otros clientes 
      this.cantidadesVendidas['aumentoDisminucionVentasExclusividadAlfaCompraBeta'][index] =
        Math.round(this.cantidadesVendidas['cantidadesTotalesVender'][index] * this.alfaCompreSoloBeta[_alfaCompraExclusivoBeta][index]);

      // Armado de fila:  Ventas por tener Know de Alfabetic	 Ventas a otros clientes 
      this.cantidadesVendidas['ventasTenerKnowHowAlfa'][index] =
        Math.round(this.cantidadesVendidas['cantidadesTotalesVender'][index] * this.compartirInfoAlfaConBetaParaBeta[_compartirInfoAlfaBeta][index]);

      // Armado de fila: Cantidad para Costear en ALFABETIC - Ensamblados
      this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][index] =
        this.cantidadesVendidas['ventasBetaMinimasPorContrato'][index] + this.cantidadesVendidas['ventasAdicionalesAlfabeticPrevioFabrica'][index] +
        this.cantidadesVendidas['sobrantes'][index];

      // Armado de filas Cantidad para Costear en BYNTECH -  Otros clientes 
      this.cantidadesVendidas['cantidadCostearOtrosClientes'][index] =
        this.cantidadesVendidas['ventaOtrasEmpresasPaisAlfa'][index] +
        this.cantidadesVendidas['aumentoDisminucionVentasCompartirKnowHow'][index] +
        this.cantidadesVendidas['aumentoDisminucionVentasExclusividadAlfaCompraBeta'][index] +
        this.cantidadesVendidas['ventasTenerKnowHowAlfa'][index];

      // Armado de fila: Cantidad para Costear en BYNTECH -  Regalias de Arbotic 
      this.cantidadesVendidas['regaliasAlfa'][index] = this.cantidadesVendidas['fabricarOriginalmente'][index];


      // Armado de fila: Cantidad para Costear en BYNTECH -   TOTAL DE UNIDADES 
      this.cantidadesVendidas['totalUnidades'][index] =
        this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][index] + this.cantidadesVendidas['cantidadCostearOtrosClientes'][index] +
        this.cantidadesVendidas['regaliasAlfa'][index];

    }

    // console.log("Tabla cantidadesCompradas:");
    // console.table(this.cantidadesVendidas);

    /*
    Creación de tabla resultados operativo de arbotic
    */
    const _precioPiezasQueVendeBeta = this.getReplyValue('precio-piezas-que-vende-byntech');
    const _regaliasQuePagaAlfaABeta = this.getReplyValue('regalias-paga-arbotic') / 100;

    for (const index of [0, 1, 2, 3, 4]) {


      // Armado de fila Ingresos por ventas de ensamblados	Ingresos Ventas a Arbotic
      this.resultadoOperativoBeta['ingresosVentasEnsamblados'][index] =
        this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][index] * _precioPiezasQueVendeBeta;

      // Armado de fila Ingresos por ventas a otros	Ingresos Ventas a Otros
      this.resultadoOperativoBeta['ingresosVentasOtros'][index] =
        this.cantidadesVendidas['cantidadCostearOtrosClientes'][index] * this.precioVentasRobots[index];

      // Armado de fila Ingresos por regalías	Ingresos Regalias
      this.resultadoOperativoBeta['ingresosVentasRegalias'][index] =
        Math.round(this.cantidadesVendidas['regaliasAlfa'][index] * _regaliasQuePagaAlfaABeta * this.precioVentasRobots[index]);

      // Armado de fila Costo Unidades Ensambladas para Arbotic- Piezas+Flete	Costo ensamblado Arbotic
      this.resultadoOperativoBeta['costoUnidadesEnsambladasArboticFlete'][index] =
        this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][index] * this.costoProduccionFleteLocalBeta[index] * -1;

      // Armado de fila Costo Unidades Otros clientes- Piezas+Flete	Costo fabricación Otros
      this.resultadoOperativoBeta['costoUnidadesOtrosClientesFlete'][index] =
        this.cantidadesVendidas['cantidadCostearOtrosClientes'][index] * this.costoProduccionFleteLocalBeta[index] * -1;

      // Armado de fila Costo Unidades Otros clientes- Ensamble	Costo ensamblado Otros
      this.resultadoOperativoBeta['costoUnidadesOtrosClientesEnsamble'][index] =
        this.cantidadesVendidas['cantidadCostearOtrosClientes'][index] * this.costoEnsambleBeta[index] * -1;

      // Armado de fila Costo de Marketing y Ventas	Costo de Mkt
      this.resultadoOperativoBeta['costoMktVentas'][index] =
        (this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][index] +
          this.cantidadesVendidas['cantidadCostearOtrosClientes'][index]) * this.costoMktVentasBeta[index] * -1;


      // Armado de fila MARGEN	Margen Bruto Arbotic
      this.resultadoOperativoBeta['margenBrutoAlfa'][index] =
        this.resultadoOperativoBeta['ingresosVentasEnsamblados'][index] +
        this.resultadoOperativoBeta['costoUnidadesEnsambladasArboticFlete'][index] +
        (this.cantidadesVendidas['cantidadCostearAlfaEnsamblados'][index] * this.costoMktVentasBeta[index] * -1) +
        this.resultadoOperativoBeta['ingresosVentasRegalias'][index];

      // Armado de fila MARGEN	Margen Bruto Otros
      this.resultadoOperativoBeta['margenBrutoOtros'][index] =
        this.resultadoOperativoBeta['ingresosVentasOtros'][index] +
        this.resultadoOperativoBeta['costoUnidadesOtrosClientesFlete'][index] +
        this.resultadoOperativoBeta['costoUnidadesOtrosClientesEnsamble'][index] +
        (this.cantidadesVendidas['cantidadCostearOtrosClientes'][index] * this.costoMktVentasBeta[index] * -1);

      // Armado de fila MARGEN	Margen Bruto Total
      this.resultadoOperativoBeta['margenBrutoTotal'][index] =
        this.resultadoOperativoBeta['ingresosVentasEnsamblados'][index] +
        this.resultadoOperativoBeta['ingresosVentasOtros'][index] +
        this.resultadoOperativoBeta['costoUnidadesEnsambladasArboticFlete'][index] +
        this.resultadoOperativoBeta['costoUnidadesOtrosClientesFlete'][index] +
        this.resultadoOperativoBeta['costoUnidadesOtrosClientesEnsamble'][index] +
        this.resultadoOperativoBeta['costoMktVentas'][index] +
        this.resultadoOperativoBeta['ingresosVentasRegalias'][index];

      // Armado de fila MARGEN	Margen %
      this.resultadoOperativoBeta['margenPorc'][index] =
        Math.round(this.resultadoOperativoBeta['margenBrutoTotal'][index] / (
          this.resultadoOperativoBeta['ingresosVentasEnsamblados'][index] +
          this.resultadoOperativoBeta['ingresosVentasOtros'][index] +
          this.resultadoOperativoBeta['ingresosVentasRegalias'][index]) * 100);
    }
    //  console.log("Tabla resutados operativos:");
    //  console.table(this.resultadoOperativoBeta);
  }

  getVariable(slug: string) {
    return _.find(this.negotations, function (o) { return o.slug == slug; });
  }

  getReplyValue(slug: string) {
    return _.find(this.negotations, function (o) { return o.slug == slug; }).reply.value;
  }

}
