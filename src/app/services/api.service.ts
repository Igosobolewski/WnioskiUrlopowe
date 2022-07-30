import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postHolidayForm(data : any){
    return this.http.post<any>("http://localhost:3000/HolidayFormList/", data);
  }

  getHolidayForm(){
    return this.http.get<any>("http://localhost:3000/HolidayFormList/");
  }

  putHolidayForm(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/HolidayFormList/"+id, data);
  }

  deleteHolidayForm(id : number){
    return this.http.delete<any>("http://localhost:3000/HolidayFormList/"+id);
  }
}
