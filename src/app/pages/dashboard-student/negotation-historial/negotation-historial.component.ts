import { Component, OnInit, Input } from '@angular/core';
import { NegotationsService } from '../../../@core/backend/common/services/negotation.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-negotation-historial',
  templateUrl: './negotation-historial.component.html',
  styleUrls: ['./negotation-historial.component.scss'],
})
export class NegotationHistorialComponent implements OnInit {

  @Input() block;
  negotations: any[];
  loading:boolean = false;

  constructor(
    private negService: NegotationsService,
    protected dialogRef: NbDialogRef<NegotationHistorialComponent>,
    private toaster: NbToastrService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.negService.getNegotiationHistorialByBlock(this.block.id).then(
      data => {
        this.loading = false;
        this.negotations = data;
      }
    ).catch(e => {
      this.loading = false;
      this.toaster.danger('Se produjo un error al obtener los datos Intente nuevamente en unos instantes', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
