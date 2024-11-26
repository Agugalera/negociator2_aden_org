import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Sessions, Block } from "../../../interfaces/common/sessions";
import * as _ from "lodash";
import { UserHttpService } from "./user-http.service";

@Injectable()
export class SessionsApi {
  private readonly apiController: string = "session";

  constructor(private api: HttpService, private newApi: UserHttpService) {}

  list(pageNumber: number = 1, pageSize: number = 10): Observable<Sessions[]> {
    const params = new HttpParams()
      .set("pageNumber", `${pageNumber}`)
      .set("pageSize", `${pageSize}`);

    return this.api.get(this.apiController, { params }).pipe(
      map((data) =>
        data.map((item) => {
          const _check = _.findIndex(item.blocks, (o: Block) => {
            return o.state != "finalized";
          });
          if (_check > -1) {
            item.stateList = "active";
          } else {
            item.stateList = "inactive";
          }
          return { ...item };
        })
      )
    );
  }

  listByTeacher(teacherId: string): Observable<Sessions[]> {
    return this.api.get(`${this.apiController}/teacher/id/${teacherId}`).pipe(
      map((data) =>
        data.map((item) => {
          const _check = _.findIndex(item.blocks, (o: Block) => {
            return o.state != "finalized";
          });
          if (_check > -1) {
            item.stateList = "active";
          } else {
            item.stateList = "inactive";
          }
          return { ...item };
        })
      )
    );
  }

  updateSession(sessions) {
    return this.api.put(this.apiController, { sessions }).pipe(
      map((data) =>
        data.map((item) => {
          return { ...item };
        })
      )
    );
  }

  update(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/${item.id}`, item);
  }

  updateBlock(item: any): Observable<any> {
    return this.api.put("block", item);
  }

  add(item: any): Observable<any> {
    return this.newApi.post('sessions', item);
  }

  get(id: string): Observable<any> {
    return this.api.get(`${this.apiController}/id/${id}`);
  }
}
