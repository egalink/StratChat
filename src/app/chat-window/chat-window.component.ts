import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked  {

    @ViewChild('messageList') messageListRef:ElementRef;

    opened:boolean = false;

    messages:any[] = [
        {
            message: 'Hola galletita, ¿como estas?',
            sender: { username: 'Egalink Hdz.', id: 'me' },
            sentat: '22-02-2020T18:00:00',
        },
        {
            message: 'Hola Rana Ranosa!',
            sender: { username: 'Mafer Mad.', id: 'in' },
            sentat: '22-02-2020T18:02:01',
        },
        {
            message: 'Muy bien, aqui.',
            sender: { username: 'Mafer Mad.', id: 'in' },
            sentat: '22-02-2020T18:02:05',
        },
        {
            message: 'Haciendo la interfáz gráfica del chat.',
            sender: { username: 'Mafer Mad.', id: 'in' },
            sentat: '22-02-2020T18:02:12',
        },
        {
            message: 'y tu?',
            sender: { username: 'Mafer Mad.', id: 'in' },
            sentat: '22-02-2020T18:02:18',
        },
        {
            message: 'Aqui, extrañando a la galleta.',
            sender: { username: 'Egalink Hdz.', id: 'me' },
            sentat: '22-02-2020T18:03:15',
        },
        {
            message: 'Hay algo en lo que te pueda ayudar? ...',
            sender: { username: 'Egalink Hdz.', id: 'me' },
            sentat: '22-02-2020T18:03:22',
        }
    ];

    constructor () {
        //
    }

    ngOnInit () : void {
        //
    }

    ngAfterViewChecked () {
        //
        this.scrollToLastMessages();
    }

    scrollToLastMessages () {
        // scroll down to bottom when new message is sent:
        const messageList:any = this.messageListRef.nativeElement;
        messageList.scrollTop = messageList.scrollHeight;
    }

    openSidenav ($sidenav) : void {
        //
        $sidenav.toggle();
    }

    sendMessage ($input) {
        //
        console.log($input.value);

        if (! $input.value) {
            return;  // empty field.
        }

        let message:any = {
            message: $input.value || '',
            sender: { username: 'Egalink Hdz.', id: 'me' },
            sentat: moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS	)
        };
 
        this.messages.push(message);
        this.scrollToLastMessages();
        $input.value = '';
    }

    obj (obj:any = {}) {
        //
        return obj;
    }

}
