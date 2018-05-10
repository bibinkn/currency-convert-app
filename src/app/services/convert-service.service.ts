import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ConvertServiceService {

  private apiUrl = 'http://api.fixer.io/latest';

  constructor(private http: Http) { }

  // function to get the api response and convert to json
  private getResponseData(res: Response) {
    let body = res.json();
    return body;
  }

  //function to handle the error from api call
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  //function to get the response data using promise
  //@param: baseCurrency
  getRates(baseCurrency): Promise<any> {
    let url: string;
    if (baseCurrency) {
      url = this.apiUrl + '?base=' + baseCurrency;
    } else {
      url = this.apiUrl;
    }
    return this.http.get(url).toPromise()
      .then(this.getResponseData)
      .catch(this.handleError);
  }


}
