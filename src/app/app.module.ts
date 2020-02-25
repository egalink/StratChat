import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

// services:
import { AdonisWebsocketClientApiService } from './services/websockets/adonis-websocket-client-api.service';
import { SignupService } from './services/http/signup.service';
import { StorageService } from './services/persistance/storage.service';

import { AppComponent } from './components/app-component/app.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

@NgModule({

    declarations: [
        AppComponent,
        ChatWindowComponent,
    ],

    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],

    providers: [
        AdonisWebsocketClientApiService,
        SignupService,
        StorageService
    ],

    bootstrap: [AppComponent]

})
export class AppModule { }
