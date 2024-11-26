import { ChatAdapter, Message, ParticipantResponse, IChatGroupAdapter, Group, IChatParticipant, ChatParticipantType, ChatParticipantStatus } from 'ng-chat';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Socket } from 'ng-socket-io';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { COMPANIES_CONST } from '../utils/const';
import * as _ from 'lodash';
import { Notification } from '../@core/interfaces/common/notification';

export class IChatParticipantOwn implements IChatParticipant {
  participantType: ChatParticipantType;
  id: any;
  status: ChatParticipantStatus;
  avatar: string;
  displayName: string;
  idSystem: string;
}

export class SocketIOAdapter extends ChatAdapter implements IChatGroupAdapter {
  private socket: Socket;
  private http: HttpClient;
  private userId: string;
  groupId: string;
  private generateUserID: string;
  private idCompany: string;
  friends: any[];

  constructor(generateUserID, userId: any, companyId, socket: Socket, http: HttpClient, groupId) {
    super();
    this.socket = socket;
    this.generateUserID = generateUserID;
    this.idCompany = companyId;
    this.http = http;
    this.userId = userId;
    this.groupId = groupId;
    this.InitializeSocketListerners();
  }

  groupCreated(group: Group): void {

    this.socket.emit('groupCreated', {
      metadata: null,
      participant: group
    });
  }

  listFriends(): Observable<ParticipantResponse[]> {

    return new Observable(obs => {
      forkJoin([this.http.get(environment.apiUrl + '/notification/friends/' + this.groupId)
        .pipe(
          map((data: any[]) => {
            if (!data.length) {
              return [];
            }
            let _users = [] as any[];
            data[0]['groups'].forEach(group => {
              _.map(group['students'], item => {
                _users.push({
                  'participant': {
                    'displayName': item.firstname + ' ' + item.lastname.charAt(0) + '. - '
                      + _.find(COMPANIES_CONST, { id: Number(group['id_company']) }).name,
                    'id': item.id,
                    'status': ChatParticipantStatus.Offline,
                    'participantType': ChatParticipantType.User,
                    'avatar': null,
                    'idSystem': item.id,
                  },
                  metadata: null,
                });

              });

            });

            return _users;
          })
        ), this.http.post(environment.socketUrl + 'listFriends', { userid: this.userId }).pipe(
          map((data: any[]) => {
            return data;
          })
        )]).subscribe(d => {
          let _friends = d[0];
          // Elimino el alumno que esta utlizando el sistema
          _friends = _friends.filter(i => { return i.participant.idSystem != this.userId; });
          let usersCollectionSocket = d[1];
          _friends.forEach(item => {
            let _index = _.findIndex(usersCollectionSocket, (o) => {
              return o.participant.idSystem == item.participant.idSystem;
            });

            if (_index >= 0) {
              item.participant.status = ChatParticipantStatus.Online;
              item.participant.id = usersCollectionSocket[_index].participant.id;
            } else {
              item.participant.status = ChatParticipantStatus.Offline;
            }
          });
          this.friends = _friends;
          obs.next(_friends);
          obs.complete();
        });
    });
  }

  getMessageHistory(userId: any): Observable<Message[]> {
    let _user = _.find(this.friends, item => { return item.participant.id === userId });
    return this.http.get<Notification[]>(environment.apiUrl + '/notification/chat/user/' +
      this.userId + '/' + _user.participant.idSystem).pipe(
        map(data => {
          let _messageUser = _.filter(data, item => {
            return item.target_id === _user.participant.idSystem;
          });
          let message = [] as Message[];
          data.forEach(element => {
            message.push({
              type: 1,
              fromId: element.id_author,
              toId: element.target_id,
              message: element.body,
              dateSent: new Date(element.creation_date),
            });
          });
          return message;
        }), catchError(err => of([])));
    // }
  }

  sendMessage(message: Message): void {

    let _message = {
      id_author: this.userId,
      creation_date: message.dateSent,
      recipients: [{
        id: _.find(this.friends, item => {
          return item.participant.id === message.toId;
        }).participant.idSystem,
        type: 'user'
      }],
      body: message.message,
      type: 'chat',
      state: '1'
    };

    let _message_socket = {
      id_author: message.fromId,
      creation_date: message.dateSent,
      target_id: message.toId,
      target_from: message.fromId,
      fromId: message.fromId,
      toId: message.toId,
      target_type: 'group',
      body: message.message,
      type: 'chat',
      state: 1
    };

    this.http.post(environment.apiUrl + '/notification', [_message]).subscribe(
      data => {
        let _tmpMessage = _.cloneDeep(message);
        _tmpMessage.fromId = this.generateUserID;
        this.socket.emit('sendMessage', _tmpMessage);
      },
      error => {
        console.error(error);
      }
    );
  }


  InitializeSocketListerners(): void {
    this.socket.on('messageReceived', (messageWrapper) => {
      this.onMessageReceived(messageWrapper.user, messageWrapper.message);
    });

    this.socket.on('friendsListChanged', (usersCollection: Array<any>) => {
      // Handle the received message to ng-chat
      // console.log('lista de amigos: ', usersCollection, this.friends);
      this.friends.map(
        item => {
          let _index = _.findIndex(usersCollection, (o) => {
            return o.participant.idSystem == item.participant.idSystem;
          });
          if (_index >= 0) {
            item.participant.status = ChatParticipantStatus.Online;
            item.participant.id = usersCollection[_index].participant.id;
          } else {
            item.participant.status = ChatParticipantStatus.Offline;
          }
          return item;
        },
      );
    });
  }
}
