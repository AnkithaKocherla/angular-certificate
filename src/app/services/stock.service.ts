import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  token: string = 'bu4f8kn48v6uehqi3cqg';

  constructor(private http: HttpClient) { }

  getCompanyName(companyName: string) {
    return this.http.get(`https://finnhub.io/api/v1/search?q=${companyName.toUpperCase()}&token=${this.token}`);
  }

  getDetails(companyName: string) {
    return this.http.get(`https://finnhub.io/api/v1/quote?symbol=${companyName.toUpperCase()}&token=${this.token}`);
  }

  getDetail(companyName: string) {
    return this.http.get(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${companyName.toUpperCase()}&from=2015-01-01&to=2022-03-01&token=${this.token}`);
  }
}
