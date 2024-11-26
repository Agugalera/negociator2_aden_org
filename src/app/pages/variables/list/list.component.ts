import { Component, OnInit } from '@angular/core';
import { VariablesService } from '../../../@core/backend/common/services/variables.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListVariablesComponent implements OnInit {

  type: string = 'variable'; // Tipo de variable a mostrar en el listado: seven o pre
  source;
  settingsVariables = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      value: {
        title: 'Nombre',
        type: 'string',
      },
      max: {
        title: 'Máximo',
        type: 'string',
      },
      min: {
        title: 'Mínimo',
        type: 'string',
      },
      company_name: {
        title: 'Empresa',
        type: 'string',
      },
      // color_name : {
      //   title: 'Color',
      //   type: 'string',
      // }
    },
  };
  settingsSeven = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      value: {
        title: 'Nombre',
        type: 'string',
      },
      required: {
        title: 'Obligatoria',
        type: 'string',
      },
    },
  };

  constructor(
    public variablesService: VariablesService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params.type) {
      this.type = this.route.snapshot.params.type;
    }

    this.route.params.subscribe(params => {
      this.type = params.type ? params.type : 'variable';
      this.getVariables();
    });


  }

  getVariables() {
    // TODO corregir nombre de negotation
    this.variablesService.list(this.type === 'negotiation' ? 'negociation' : this.type).subscribe(
      data => {
        data.forEach(item => {
          item.company_name = item.id_company == 1 ? 'Arbotic' : (item.id_company == 2 ? 'Byntech' : 'No definida');
          //item.color_name = item.color == 'danger' ? 'Roja' : (item.color == 'success' || item.color == 'warning' ? 'Amarilla/Verde' : 'No definida');
          item.required = item.required === '1' ? 'Si' : 'No';
          return item;
        });
        this.source = data;
      }, error => {
        console.log(error);
      },
    );
  }

  goToAdd() {
    if (this.type === 'seven') {
      this.router.navigate(['/pages/variables/create-seven']);
    } else if (this.type === 'negotiation') {
      this.router.navigate(['/pages/variables/create-negotiation']);
    } else {
      this.router.navigate(['/pages/variables/create']);
    }
  }

  goToEdit(ev) {
    if (this.type === 'seven') {
      this.router.navigate(['/pages/variables/create-seven', { id: ev.data.id }]);
    } else if (this.type === 'negotiation') {
      this.router.navigate(['/pages/variables/create-negotiation', { id: ev.data.id }]);
    } else {
      this.router.navigate(['/pages/variables/create', { id: ev.data.id }]);
    }
  }

  onDeleteConfirm(ev) {
    // console.log("mostar alert de confirmación");
  }

}
