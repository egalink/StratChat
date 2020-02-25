import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { AdonisWebsocketClientApiService } from '../../services/websockets/adonis-websocket-client-api.service';
import * as moment from 'moment';
import { SignupService } from 'src/app/services/http/signup.service';
import { MessagesService } from 'src/app/services/http/messages.service';
import { UsersService } from 'src/app/services/http/users.service';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked  {

    @ViewChild('messageList') messageListRef:ElementRef;
    @ViewChild('input') inputRef:ElementRef;
    
    userList:any = [];
    userdata:any = {};

    wsClient:any;
    wsTpChat:any;
    
    opened:boolean = true;

    messages:any[] = [/*
        
        {
            message: 'El usuario Jakim Hernández se ha unido al chat.',
            sender: { username: null, id: 'bc' },
            sentat: '22-02-2020 18:01:58',
        }, {
            message: 'Hola!',
            sender: { username: 'Jakim Hernández', id: 'me' },
            sentat: '22-02-2020 18:02:18',
        }, {
            message: 'Soy Goku!',
            sender: { username: 'Jakim Hernández', id: 'me' },
            sentat: '22-02-2020 18:02:22',
        }, {
            message: 'jajaja do babes ...',
            sender: { username: 'Otro usuario', id: 'in' },
            sentat: '22-02-2020 18:03:22',
        }

    //*/];

    constructor (
        private signup: SignupService,
        private message: MessagesService,
        private user: UsersService,
        private clientApi: AdonisWebsocketClientApiService
    ) {
        this.clientApi.connected(() => {
            console.log(":¬) - The client now is connected to the ws service.");
            this.join2chat();
        });
        
        this.clientApi.disconnected(() => {
            console.log(":´( - The client was disconnected from ws service!!");
        });
    }

    async ngOnInit () {

        this.userdata = await this.signup.request();
		console.log("Estos son los datos del usuario registrado:");
		console.log(this.userdata);

        this.wsClient = this
            .clientApi
            .ws
            .withApiToken(this.userdata.token)
            .connect();

        this.downloadMessageList();
        this.downloadUserList();
    }

    ngAfterViewChecked () {
        this.scrollToLastMessages();
    }

    join2chat () {
        //
        let wsTpChat:any = this.wsClient.subscribe('strat/chat');
            wsTpChat.on('error', console.log);
            wsTpChat.on('ready', () => {
                this.wsTpChat = wsTpChat;
                this.wsTpChat.on('message', message => this.append(message));
            });
    }

    scrollToLastMessages () {
        // scroll down to bottom when new message is sent:
        let messageList:any = this.messageListRef.nativeElement;
            messageList.scrollTop = messageList.scrollHeight;
    }

    openSidenav ($sidenav) : void {
        //
        $sidenav.toggle();
    }

    sendMessage () {
        //
        const input = this.inputRef.nativeElement;
        if (! input.value) {
            return;  // empty field.
        }

        if (this.wsTpChat)
            try {
                this.wsTpChat
                    .emit('message', input.value);
            } catch (error) {
                console.log("Ocurrió un error al realizar el envío de un mensaje:", input.value || '');
                console.log(error);
            }
        
        return
    }

    append (data:any = {}) {
        //
        if (data.sender.id > 0) {
            data.sender.id = data.sender.id == this.userdata.id ? 'me' : 'in';
        } else {
            this.downloadUserList();
            data.sender.id = 'bc';
        }

        this.messages.push(data);
        this.scrollToLastMessages();
        this.inputRef
            .nativeElement
            .value = '';
    } 

    downloadMessageList () {
        //
        this.message.all().then((list:any) => {
            if (list.length > 0) {
                list.forEach(message => this.append(message));
            }
        }, console.error);
    }

    downloadUserList () {
        //
        this.user.all().then((list:any) => {
            if (list.length > 0) {
                this.userList = list;
            }
        }, console.error);
    }

    get utc () {
        //
        return moment
            .utc()
            .format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
    }

    obj (obj:any = {}) {
        //
        return obj;
    }

}
