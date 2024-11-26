import { Observable } from 'rxjs';
import { Student } from './students';

export interface Team {
    id: string;
    id_session?: string;
    id_block: string;
    id_company: string;
    state: any;
    students: Student[];
}


export interface Block {
    id?: string;
    id_session?: string;
    state?: any;
    stage?: string | number;
    team1?: any[];
    team2?: any[];
    groups?: Team[];
}

export interface Sessions {
    id?: string;
    date?: string;
    name: string;
    id_subject: string;
    id_teacher: string;
    state: any;
    stateList?: string;
    block?: Block[];
    blocks?: Block[];

}

export abstract class SessionsData {
    abstract list(): Observable<Sessions[]>;
    abstract get(id: string): Observable<Sessions>;
    abstract updateSession(sessions: Sessions): Observable<Sessions>;
    abstract update(session: Sessions): Observable<Sessions>;
    abstract create(session: Sessions): Observable<Sessions>;
}
