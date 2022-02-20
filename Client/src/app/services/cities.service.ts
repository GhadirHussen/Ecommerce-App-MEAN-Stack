import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  public cities:any = 
  [
    "New York", "New Jersey", "California", "Michigan", "Washington",
    "Texas", "Florida", "Arizona", "Ohio", "Mississippi"
  ];
  constructor() { }
}
