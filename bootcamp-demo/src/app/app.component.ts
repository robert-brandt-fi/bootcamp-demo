import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ApiService } from './services/api.service';

import { MarketItem as MarketResponse } from './models/market_stats';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  marketResponses: MarketResponse[] = [];

  constructor(
    private http: HttpClient,
    private apiService: ApiService
    ) { };

  ngOnInit() {
    let url = this.apiService.urlBuilder(["Veldspar", "Scordite"], "Marketstat");

    this.http.get<MarketResponse>(url)
    .pipe(take(1))
    .subscribe(response => {
      this.marketResponses = response;
      console.log(response);
    });

  }
}

const marketsUrl = 'https://api.evemarketer.com/ec/';
