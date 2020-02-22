import { BrowserModule } from '@angular/platform-browser';
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

import { AppComponent } from './app-component/app.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

@NgModule({

    declarations: [
        AppComponent,
        ChatWindowComponent,
    ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],

    providers: [],

    bootstrap: [AppComponent]

})
export class AppModule { }
