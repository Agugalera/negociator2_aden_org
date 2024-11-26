import { Observable } from 'rxjs';
import { Variables } from './variables';

export interface Replies {
    id?: number;
    id_group: string;
    color: string;
    id_variable: any;
    value: any;
    creation_date: any;
    author: any;
    variable?: Variables;
    shared?: any;
}

export interface RepliesFull {
    id: number;
    value: any;
    slug: string;
    type: string;
    min: string;
    max: string;
    name: string;
    color_a: string;
    okvalue_a: string;
    reply_a: string;
    boolean: string;
    color_b: string;
    okvalue_b: string;
    reply_b: string;
    section: string;
    state: string;
    required: string;

    // color_name: string;
    // id_variable?: string;
    sharedReply?: any;
    unit: string;
    // company_name?: string;
    colorReply?: string;
    valueReply?: any;
    lastUpdate?: any;
    reply: {
        id?: number;
        id_group: string;
        id_variable: any;
        value: any;
        color: string;
        creation_date: any;
        author: any;
        teacher_return: string;
        return_date: string;
        shared?: any;
    }
}


export abstract class ReplyData {
    abstract list(): Observable<Replies[]>;
    abstract getByGroup(groupId): Observable<Replies[]>;
    abstract get(id: number): Promise<Replies>;
    abstract update(reply: Replies): Observable<Replies>;
    abstract create(replies: Replies): Observable<Replies>;
    abstract createMassive(replies: Replies[]): Observable<Replies | Replies[]>;
}