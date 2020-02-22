import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

    opened:boolean = false;

    constructor () {
        //
    }

    ngOnInit () : void {
        //
    }

    openSidenav ($sidenav) : void {
        //
        $sidenav.toggle();
    }

}
