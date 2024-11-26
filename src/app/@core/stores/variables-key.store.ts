import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { UserStore } from './user.store';
import { tap } from 'rxjs/internal/operators/tap';
import { Variables } from '../interfaces/common/variables';
import { RepliesFull } from '../interfaces/common/reply';
import { RepliesService } from '../backend/common/services/reply.service';
import { forEach } from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class VariablesKeyStore {

    groupId: number;

    private variablesData: any[] = [];
    private _variables = new BehaviorSubject<any[]>(this.variablesData);
    readonly variables$ = this._variables.asObservable();

    constructor(
        private repliesService: RepliesService,
        private userStore: UserStore) {
        this.loadInitialData();
    }

    loadInitialData() {
        this.userStore.userChange().subscribe(
            data => {
                if (data && data['user']['profile_name'] == 'student') {
                    try {
                        this.groupId = Number(data['groups'][0]['id_group']);
                        this.getVariables();
                    } catch {
                        console.log("Retorno error por no encontrar el grupo");
                    }
                }
            }
        );
    }

    // the getter will return the last value emitted in _todos subject
    get variables(): Variables[] {
        return this._variables.getValue();
    }

    getVariables() {
        const obsVariables = this.repliesService.listReplyFull(this.groupId);



        // const obsVariables = this.variablesService.list('variable');
        // const obsReplies = this.repliesService.getByGroup(this.groupId).pipe(catchError(val => of([])));
        forkJoin({
            variables: obsVariables
            // variables: obsVariables,
            // replies: obsReplies,
        }).subscribe(
            async data => {
                let variables: RepliesFull[] = data.variables.filter(item => item.section === 'variable');
                if (data.variables.length) {
                    await forEach(data.variables, (item: RepliesFull) => {
                        if (item.reply) {
                            item.valueReply = item.type === 'boolean' ?
                                (item.reply.value === '0' ? false : true) : item.reply.value;
                            item.colorReply = item.reply.color;
                            if (item.reply.creation_date) {
                                item.lastUpdate = { date: item.reply.creation_date, user: item.reply.author };
                            }
                        }
                        return item;
                    });
                    this._variables.next(variables);
                } else {
                    this._variables.next([]);
                }
            });
    }

    create(replies) {
        return this.repliesService.create(replies).pipe(
            tap(val => {
                this.getVariables();
            }));
    }

    update(replies) {
        return this.repliesService.update(replies).pipe(
            tap(val => {
                this.getVariables();
            }));
    }

    refresh() {
        this.getVariables();
    }

    clear() {
        // this._replies.next(null);
        this._variables.next(null);
    }
}
