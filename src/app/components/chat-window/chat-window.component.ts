import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { AdonisWebsocketClientApiService } from '../../services/websockets/adonis-websocket-client-api.service';
import * as moment from 'moment';
import { SignupService } from 'src/app/services/http/signup.service';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked  {

    @ViewChild('messageList') messageListRef:ElementRef;
    @ViewChild('input') inputRef:ElementRef;

    wsClient:any;
    wsTpChat:any;

    opened:boolean = false;

    messages:any[] = [/*
        {
            message: 'y tu?',
            sender: { username: 'Mafer Mad.', id: 'in' },
            sentat: '22-02-2020T18:02:18',
        },
        {
            message: 'El usuario Jakim Hernández se ha conectado.',
            sender: { username: null, id: 'bc' },
            sentat: '22-02-2020T18:03:15',
        },
        {
            message: 'Hay algo en lo que te pueda ayudar? ...',
            sender: { username: 'Egalink Hdz.', id: 'me' },
            sentat: '22-02-2020T18:03:22',
        }
    //*/];

    constructor (
        private signup: SignupService,
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

        const userdata:any = await this.signup.request();
		console.log("Estos son los datos del usuario registrado:");
		console.log(userdata);

        this.wsClient = this
            .clientApi
            .ws
            .withApiToken(userdata.token)
            .connect();
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
        console.log(data)
        this.messages.push(data);
        this.inputRef.nativeElement.value = '';
        this.scrollToLastMessages();
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
