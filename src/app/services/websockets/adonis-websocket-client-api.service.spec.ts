import { TestBed } from '@angular/core/testing';
import { AdonisWebsocketClientApiService } from './adonis-websocket-client-api.service';

describe('AdonisWebsocketClientApiService', () => {

    let service: AdonisWebsocketClientApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AdonisWebsocketClientApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
