import { Injectable } from '@angular/core';

/**
 * The module build requires the
 * regenerator-runtime polyfill (add it via Babel).
 * 
 * npm i --save @adonisjs/websocket-client
 * npm i --save @babel/polyfill
 * npm i --save-dev @babel/plugin-transform-regenerator
 * 
 * ---------
 * 
 * import "@babel/polyfill";
 * import Ws from '@adonisjs/websocket-client'
 * 
 */

import "@babel/polyfill";
import Ws from '@adonisjs/websocket-client'

@Injectable({
    providedIn: 'root'
})
export class AdonisWebsocketClientApiService {

    /**
     * URL to create a socket connection.
     * 
     * @type string
     */
    private url:string = 'ws://127.0.0.1:3333';

    /**
     * Connect to a WebSocket server via the client like so:
     * 
     * const ws = Ws(url, options)
     * 
     * ws.connect()
     * 
     * @type any
     */
    private ws:any;

    /**
     * to manage the application state, listen for the open/close events
     * in websocket connection:
     * 
     * @type boolean
     */
    private isConnected:boolean = false;

    /**
     * Manage your application state, listen for the Ws connection event:
     * 
     * @type any
     */
    private wsOnConnected:any = null;
    
    /**
     * Manage your application state, listen for the Ws disconnection event:
     * 
     * @type any
     */
    private wsOnDisconnected:any = null;

    constructor () {
        //
        this.ws = Ws(this.url, {
            // whether to reconnect automatically after disconnect:
            reconnection: true
        });

        this.ws
            .on('open', () => {
                this.onWsOpen();
            });

        this.ws
            .on('close', () => {
                this.onWsClose();
            });
    }

    connect () {
        //
        this.ws
            .connect();

        return this.ws;
    }

    status () {
        //
        return this.isConnected ? 'connected' : 'disconnected';
    }

    connected (fn:any = null) {
        //
        this.wsOnConnected = fn;
    }

    disconnected (fn:any = null) {
        //
        this.wsOnDisconnected = fn;
    }

    private onWsOpen () {
        //
        this.isConnected = true;
        if (this.wsOnConnected)
            this.wsOnConnected();
    }

    private onWsClose () {
        //
        this.isConnected = false;
        if (this.wsOnDisconnected)
            this.wsOnDisconnected();
    }

}
