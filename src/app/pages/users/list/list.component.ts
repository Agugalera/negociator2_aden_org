import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../@core/backend/common/services/users.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListUsersComponent implements OnInit {
  source;
  settings = {
    mode: 'external',
    actions: {
      delete: false
    },
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
      email: {
        title: 'Email',
        type: 'string',
      },
      firstname: {
        title: 'Nombre',
        type: 'string',
      },
      lastname: {
        title: 'Apellido',
        type: 'string',
      },
      id_profile: {
        title: 'Rol',
        type: 'string',
        editor: {
          type: 'list',
          config: {
            selectText: 'Seleccionar',
            list: [
              { value: 'Admin', title: 'Admin' },
              { value: 'Profesor', title: 'Profesor' },
              { value: 'Alumno', title: 'Alumno' },
            ],
          },
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar',
            list: [
              { value: 'Admin', title: 'Admin' },
              { value: 'Profesor', title: 'Profesor' },
              { value: 'Alumno', title: 'Alumno' },
            ],
          },
        },
      },
    },
  };

  constructor(
    public usersService: UsersService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(
      data => {
        this.source = data;
        this.source = data.map(item => {
          let newItem = Object.assign({}, item) as any;
          newItem.id_profile = item.id_profile === 1 ? 'Admin' : (item.id_profile === 2 ? 'Profesor' : 'Alumno');
          return newItem;
        });
      }, error => {
      }
    )
  }

  goToAdd() {
    this.router.navigate(['/pages/users/add']);
  }

  goToEdit(ev) {
    this.router.navigate(['/pages/users/edit/' + ev.data.id]);
  }

  onDeleteConfirm(ev) {
    // console.log("mostar alert de confirmación");
  }

}