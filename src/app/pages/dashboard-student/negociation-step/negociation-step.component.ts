import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import {
  Negotations,
  NegotationsResponse,
} from "../../../@core/interfaces/common/negotation";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { UserStore } from "../../../@core/stores/user.store";
import { Replies } from "../../../@core/interfaces/common/reply";
import { DialogConfirmComponent } from "../../../@components/dialog-confirm/dialog-confirm.component";
import { environment } from "../../../../environments/environment";
import { SessionsService } from "../../../@core/backend/common/services/sessions.service";
import { Block } from "../../../@core/interfaces/common/sessions";
import { ChartsComponent } from "./charts/charts.component";
import { COMPANIES_CONST } from "../../../utils/const";
import * as _ from "lodash";
import { ChartsBetaComponent } from "./charts-beta/charts-beta.component";
import { Router } from "@angular/router";
import { NegotiationStore } from "../../../@core/stores/negotiation.store";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-negociation-step",
  templateUrl: "./negociation-step.component.html",
  styleUrls: ["./negociation-step.component.scss"],
})
export class NegociationStepComponent implements OnInit, OnDestroy {
  @Input() state: string;
  @Input() stage: string;
  lastMessage: string;
  environment = environment;
  block: Block;
  simulation: boolean = false;
  negotations: Negotations[] = [];
  value: string = "";
  companyId;
  groupId;
  user;
  lastUpdate: { date: string; user: string };

  loading: boolean = false;
  loadingFinalized: boolean = false;
  @Output() updated = new EventEmitter<Block>();
  message: string = "";
  phase: number = 1;
  alive: boolean = true;

  constructor(
    private dialogService: NbDialogService,
    private userService: UserStore,
    private negotationStore: NegotiationStore,
    private sessionsService: SessionsService,
    private router: Router,
    private toaster: NbToastrService
  ) {}

  async ngOnInit() {
    this.userService
      .userChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(async (data) => {
        console.log("DATOS DE SESIÓN", data);
        if (data && !this.user) {
          await this.negotationStore.loadInitialData();
          this.user = data.user;
          this.companyId = data["blocks"][0]["id_company"];
          this.block = data["blocks"][0];
          this.block.id = data["blocks"][0]["id"];
          this.block.id_session = data["blocks"][0]["id_session"];
          this.groupId = data["groups"][0]["id_group"];
          this.getNegotation();
        } else {
          this.user = data.user;
          this.companyId = data["blocks"][0]["id_company"];
          this.block = data["blocks"][0];
          this.block.id = data["blocks"][0]["id"];
          this.block.id_session = data["blocks"][0]["id_session"];
          this.groupId = data["groups"][0]["id_group"];
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getNegotation() {
    this.negotationStore.negotation$
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        if (data && data.reply) {
          this.phase = Number(data.phase);
          try {
            this.lastMessage =
              this.stage == this.companyId ? data.message : null;
          } catch {}
          this.negotations = data.reply;
          this.negotations.map((item) => {
            item.valueReply = item.reply
              ? item.type === "boolean"
                ? item.reply.value === "0"
                  ? false
                  : true
                : item.reply.value
              : null;
            return item;
          });
        } else {
          // this.climate = { value: '' } as Climate;
        }
      });
  }

  openSimulation() {
    try {
      let _variables = this.negotations.map((item) => {
        if (item.reply) {
          let replies = item.reply as Replies;
          replies.id_variable = item.id;
          replies.value = item.valueReply ? item.valueReply : false;
          item.reply = replies;
          return item;
        } else if (this.phase == 1) {
          // Si es la primer propuesta verifica los datos ingresados y arma la data para la simulacion
          let replies = {} as Replies;
          replies.id_variable = item.id;
          // Verifica si el valor esta definido, en caso contrario verifica si es booleano y le coloca false
          if (item.valueReply || (!item.valueReply && item.type == "boolean")) {
            replies.value = item.valueReply ? item.valueReply : false;
            item.reply = replies;
            return item;
          } else {
            throw new Error(
              "Verifique los datos ingresados para generar la simulación."
            );
          }
        }
      });

      const _company = _.find(COMPANIES_CONST, { id: Number(this.companyId) });
      if (_company.id == 1) {
        this.dialogService.open(ChartsComponent, {
          context: {
            negotations: _variables,
          },
          hasBackdrop: true,
          closeOnBackdropClick: true,
          closeOnEsc: true,
          hasScroll: true,
        });
      } else {
        this.dialogService.open(ChartsBetaComponent, {
          context: {
            negotations: _variables,
          },
          hasBackdrop: true,
          closeOnBackdropClick: true,
          closeOnEsc: true,
          hasScroll: true,
        });
      }
    } catch (e) {
      this.toaster.danger(e, "Error");
    }
  }

  confirmSave() {
    this.dialogService
      .open(DialogConfirmComponent, {
        context: {
          question:
            "¿Esta seguro que quiere enviar los datos de la negociación?",
        },
      })
      .onClose.subscribe((response) => {
        if (response) {
          this.save();
        }
      });
  }

  save() {
    let _variables = this.negotations.map((item) => {
      const replies = item.reply as Replies;
      replies.id_variable = item.id;
      replies.value = item.valueReply;
      item.reply = replies;
      return item.reply;
    });

    const _negotations = {} as NegotationsResponse;

    _negotations.id_group_author = this.groupId;
    _negotations.id_user_author = this.user.id;
    _negotations.creation_date = new Date().toISOString();
    _negotations.message = this.message;
    _negotations.teacher_return = "";
    _negotations.return_date = "";
    _negotations.readed = "";
    _negotations.phase = this.phase ? String(this.phase + 1) : "1";
    _negotations.state = "1";
    _negotations.reply = _variables;

    this.loading = true;
    this.negotationStore.create(_negotations).subscribe(
      // this.negotationsService.create(_negotations).subscribe(
      (data) => {
        this.message = "";
        this.loading = false;
        this.changeStateNegotation();
        this.toaster.success(
          this.lastUpdate
            ? "Se actualizaron los datos de forma correcta"
            : "Se crearon los datos de forma correcta",
          "Excelente!"
        );
      },
      (error) => {
        this.loading = false;
        this.toaster.danger(
          "Se produjo un error en guardar los datos. Intente nuevamente en unos instantes",
          "Error"
        );
      }
    );
  }

  changeStateNegotation() {
    const _block = {} as Block;
    console.log("BLOQUE ANTES DE EDITAR", this.block);
    _block.id = this.block.id;
    _block.id_session = this.block.id_session;
    _block.state = "negotation";
    // Stage mantiene el valor del la empresa responsable de enviar la propuesta
    _block.stage = Number(this.block.stage) === 1 ? 2 : 1;

    this.loading = true;
    this.sessionsService.updateBlock(_block).then(
      (data) => {
        this.loading = false;
        this.updated.emit(_block);
        // this.toaster.success('', 'Se inicio la etapa de negociación de forma correcta.');
      },
      (error) => {
        this.loading = false;
        this.toaster.danger(
          "",
          "No se pudo inicir la negociación. Por favor revise los datos ingresados."
        );
      }
    );
  }

  confirmFinalized() {
    this.dialogService
      .open(DialogConfirmComponent, {
        context: {
          question:
            "¿Esta seguro que desea aceptar y finalizar la negociación?",
        },
      })
      .onClose.subscribe((response) => {
        if (response) {
          this.finalized();
        }
      });
  }

  finalized() {
    const _block = {} as Block;
    _block.id = this.block.id;
    _block.id_session = this.block.id_session;
    _block.state = "finalized";
    _block.stage = 1; // No tiene valor en la etapa de finalizado

    this.loadingFinalized = true;
    this.sessionsService.updateBlock(_block).then(
      (data) => {
        this.loadingFinalized = false;
        this.updated.emit(_block);
        this.toaster.success(
          "",
          "Se finalizó la etapa de negociación de forma correcta."
        );
        this.router.navigateByUrl("/pages/dashboard-student/finished");
      },
      (error) => {
        this.loadingFinalized = false;
        this.toaster.danger(
          "",
          "No se pudo finalizar la negociación. Por favor revise los datos ingresados."
        );
      }
    );
  }
}
