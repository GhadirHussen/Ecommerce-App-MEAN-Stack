import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public Notyf = new Notyf({ duration: 2000, ripple: false, position: { x: "right", y: "top" } });
  public NotyfCenter = new Notyf({ duration: 2000, ripple: false, position: { x: "center", y: "top" } });
  public NotyfCenterOrder = new Notyf({ duration: 5000, ripple: false, position: { x: "center", y: "top" } });


  constructor() {}
  

}
 