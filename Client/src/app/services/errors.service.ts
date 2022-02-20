import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  public handelErrors : { error?: any; headers?: HttpHeaders; status?: number; statusText?: string; url?: string; }
  
}
