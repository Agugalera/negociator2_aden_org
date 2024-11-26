

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserStore } from './user.store';
import { tap } from 'rxjs/internal/operators/tap';
import { VariablesService } from '../backend/common/services/variables.service';
import { Variables } from '../interfaces/common/variables';
import { RepliesService } from '../backend/common/services/reply.service';
import { forEach } from 'lodash';
import { RepliesFull } from '../interfaces/common/reply';

@Injectable({
    providedIn: 'root',
})
export class SevenStore {

    groupId: number;

    private sevenData: any[] = [];
    private _elements = new BehaviorSubject<any[]>(this.sevenData);
    readonly elements$ = this._elements.asObservable();

    constructor(
        private variablesService: VariablesService,
        private repliesService: RepliesService,
        private userStore: UserStore) {
        // this.loadInitialData();
    }

    loadInitialData() {
        this.userStore.userChange().subscribe(
            data => {
                if (data && data['user']['profile_name'] == 'student') {
                    try {
                        this.groupId = Number(data['groups'][0]['id_group']);
                        this.getElements();
                    } catch {
                    }
                }
            }
        );
    }

    // the getter will return the last value emitted in _todos subject
    get elements(): Variables[] {
        return this._elements.getValue();
    }

    getElements() {
        this.repliesService.listReplyFull(this.groupId).toPromise().then(
            async data => {
                const variables: RepliesFull[] = data.filter(item => item.section === 'seven');
                if (data.length) {
                    await forEach(data, (item: RepliesFull) => {
                        if (item.reply) {
                            item.valueReply = item.reply.value;
                            item.sharedReply = item.reply.shared === '1' ? true : false;
                            item.required = item.required === '1' ? 'true' : 'false';
                            if (item.reply.creation_date) {
                                item.lastUpdate = { date: item.reply.creation_date, user: item.reply.author };
                            }
                        }
                        return item;
                    });
                    this._elements.next(variables);
                } else {
                    this._elements.next([]);
                }
            },
            error => {
                this._elements.next([]);
            },
        );

    }

    getOnlySevenElements() {
        return new Promise((resolve, reject) => {
            this.variablesService.list('seven').toPromise().then(
                data => {
                    data.forEach(item => {
                        item.valueReply = '';
                        // item.sharedReply = item.required === '1' ? true : false;
                        item.required = item.required === '1' ? 'true' : 'false';
                        return item;
                    });
                    resolve(JSON.parse(JSON.stringify(data.filter(item => item.section === 'seven'))));
                },
                error => {
                    resolve([]);
                },
            );
        })
    }

    create(replies) {
        return this.repliesService.create(replies).pipe(
            tap(val => {
                this.getElements();
            }));
    }

    update(replies) {
        return this.repliesService.update(replies).pipe(
            tap(val => {
                this.getElements();
            }));
    }

    refresh() {
        this.getElements();
    }

    clear() {
        this._elements.next(null);
    }
}
