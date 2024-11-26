import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NegotationsData, Negotations, NegotationsResponse } from '../../../interfaces/common/negotation';
import { NegotationsApi } from '../api/negotation.api';

@Injectable({
  providedIn: 'root'
})
export class NegotationsService extends NegotationsData {

  constructor(private api: NegotationsApi) {
    super();
  }

  list(): Observable<Negotations[]> {
    return this.api.list();
  }

  getNegotiationByBlock(blockid): Promise<any> {
    return this.api.getNegotiationByBlock(blockid).toPromise();
  }

  getNegotiationHistorialByBlock(blockid): Promise<any> {
    return this.api.getNegotiationHistorialByBlock(blockid).toPromise();
  }

  getByGroup(groupId): Promise<any> {
    return this.api.getByGroup(groupId).toPromise();
  }


  get(id: number): Promise<Negotations> {
    return this.api.get(id).toPromise();
  }

  create(data: any): Observable<Negotations> {
    return this.api.add(data);
  }

  update(data: any): Observable<Negotations> {
    return this.api.update(data);
  }
}
