import { Injectable } from '@angular/core';
import { SessionsData, Sessions, Block, Team } from '../../../interfaces/common/sessions';
import { SessionsApi } from '../api/sessions.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionsService extends SessionsData {



  constructor(private api: SessionsApi) {
    super();
  }

  list(): Observable<Sessions[]> {
    return this.api.list();
  }

  listByTeacher(teacherId): Observable<Sessions[]> {
    return this.api.listByTeacher(teacherId);
  }

  get(id: string): Observable<Sessions> {
    return this.api.get(id).pipe(
      map(data => {
        try {
          const team1 = data.blocks[0].groups[0];
          const team2 = data.blocks[0].groups[1];
          if (Number(team1.id_company) < Number(team2.id_company)) {
            data.blocks[0].groups[0] = team1;
            data.blocks[0].groups[1] = team2;
          } else {
            data.blocks[0].groups[0] = team2;
            data.blocks[0].groups[1] = team1;
          }
        } catch { }
        return data;
      }));
  }

  getTeam(sessionId: string, blockId: string, groupId: string): Observable<Team> {
    return this.api.get(sessionId).pipe(
      map(data => {
        try {
          const _block = data.blocks.find((element) => {
            return Number(element.id) === Number(blockId);
          });
          const _team1 = _block.groups[0];
          const _team2 = _block.groups[1];
          if (_team1.id === groupId) {
            return _team1;
          }
          if (_team2.id === groupId) {
            return _team2;
          }
          return null;
        } catch {
          return null;
        }
      }));
  }

  //Retorna los valores contrarios del equipo buscado
  getOtherTeam(sessionId: string, blockId: string, groupId: string): Observable<Team> {
    return this.api.get(sessionId).pipe(
      map(data => {
        try {
          const _block = data.blocks.find((element) => {
            return Number(element.id) === Number(blockId);
          });
          const _team1 = _block.groups[0];
          const _team2 = _block.groups[1];
          if (_team1.id !== groupId) {
            return _team1;
          }
          if (_team2.id !== groupId) {
            return _team2;
          }
          return null;
        } catch {
          return null;
        }
      }));
  }

  updateSession(session: any): Observable<Sessions> {
    return this.api.updateSession(session);
  }

  update(session: Sessions): Observable<Sessions> {
    throw new Error('Method not implemented.');
  }

  updateBlock(block: Block): Promise<Block> {
    return this.api.updateBlock(block).toPromise();
  }

  create(session: Sessions): Observable<Sessions> {
    return this.api.add(session);
  }
}