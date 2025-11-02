import { Injectable } from '@angular/core';
import { SessionService } from 'app/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class insightsService {
  constructor(private sessionService: SessionService) {}


}
