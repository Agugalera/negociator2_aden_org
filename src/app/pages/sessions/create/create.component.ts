import { FormControl } from "@angular/forms";
import { UsersService } from "./../../../@core/backend/common/services/users.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  NbCalendarRange,
  NbDateService,
  NbToastrService,
} from "@nebular/theme";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { SessionsService } from "../../../@core/backend/common/services/sessions.service";
import { takeWhile } from "rxjs/operators";
import { SubjectService } from "../../../@core/backend/common/services/subject.service";
import { StudentsService } from "../../../@core/backend/common/services/students.service";
import { NbAuthService, NbTokenService } from "@nebular/auth";
import { UserStore } from "../../../@core/stores/user.store";
import { Sessions, Block } from "../../../@core/interfaces/common/sessions";
import * as _ from "lodash";

@Component({
  selector: "ngx-create-session",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateSessionComponent implements OnInit {
  range: NbCalendarRange<Date>;
  blocks: Block[] = [{ team1: [], team2: [] }];
  modalities = [
    { name: "Presencial", id: 0 },
    // { name: 'Virtual', id: 1 }
  ];
  modality: number;
  students: any[];
  courses: any[];
  studentsCopy: any[];
  selectedCourse: any;
  name: string;
  user;
  loadingCreate = false;
  alive: boolean = true;

  config2: any = {
    class: "input-autocomplete",
    max: 20,
    placeholder: "Seleccione curso",
    sourceField: ["name"],
  };

  searchControl = new FormControl(null);

  @Output() created = new EventEmitter<boolean>();

  constructor(
    protected dateService: NbDateService<Date>,
    private toasterService: NbToastrService,
    private studentService: StudentsService,
    private authService: NbAuthService,
    private userStore: UserStore,
    private subjectService: SubjectService,
    private usersService: UsersService,
    private tokenService: NbTokenService,
    private sessionsService: SessionsService
  ) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };

    this.userStore
      .userChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.user = this.userStore.getUser();
        this.getStudents();
      });
  }

  ngOnInit() {}

  getSubjectByTeacher() {
    this.user = this.userStore.getUser();
    if (this.user) {
      this.subjectService.getSubjecstByTeacher(this.user.sisid).subscribe(
        (data) => {
          if (data) {
            this.courses = data;
          } else {
            this.courses = [];
          }
        },
        (error) => {
          this.courses = [];
        }
      );
    }
  }

  changeCourse(e) {
    this.selectedCourse = e;
    if (this.selectedCourse) {
      this.students = [];
      this.blocks = [{ team1: [], team2: [] }];
      this.studentService
        .getBySubjectAden(this.selectedCourse.id_sis)
        .subscribe(
          (data) => {
            this.students = data;
            this.studentsCopy = _.clone(data);
          },
          (error) => {
            this.students = [];
            this.studentsCopy = [];
          }
        );
    }
  }

  getStudents() {
    this.usersService.getAll("student", this.searchControl.value).subscribe(
      (data) => {
        this.students = data;
        this.studentsCopy = _.clone(data);
      },
      (error) => {
        this.students = [];
        this.studentsCopy = [];
      }
    );
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addSession() {
    this.blocks.push({ team1: [], team2: [] });
  }

  removeSession(index, item) {
    if (item.team1.length === 0 && item.team2.length === 0) {
      this.blocks.splice(index, 1);
    } else {
      this.toasterService.danger(
        "",
        "Elimine primero los alumnos de la sesión"
      );
    }
  }

  async startSimulation() {
    console.log("Start simulación");
    let _validTeams = false;
    await this.blocks.forEach((block) => {
      if (!block.team1.length || !block.team2.length) {
        _validTeams = true;
      }
    });

    if (_validTeams) {
      this.toasterService.danger(
        "",
        "Por favor complete los equipos para poder continuar."
      );
      return;
    }

    const session: Sessions = {
      name: this.name,
      id_subject: '18526',
      state: 1,
      id_teacher: this.user.sisid,
      block: this.blocks,
    };
    this.loadingCreate = true;
    this.sessionsService.create(session).subscribe(
      (data) => {
        this.loadingCreate = false;
        this.toasterService.success(
          "",
          "La sesión fue Activada. Los participantes recibirán un correo con las instrucciones para ingresar."
        );
        this.created.emit(true);
      },
      (error) => {
        this.loadingCreate = false;
        this.toasterService.danger(
          "",
          "La sesión no pudo ser iniciada. Por favor revise los datos ingresados."
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}