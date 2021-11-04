import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MarketItem as MarketResponse } from './models/market-stats';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  destroy: Subject<void> = new Subject<void>();
  marketResponses: MarketResponse[] = [];

  constructor(
    private http: HttpClient,
    private apiService: ApiService
    ) { };

  ngOnInit() {
  }

  makeMarketStatCall(requestedItem: string) {
    let requestedItemsArray: string[] = [];
    requestedItemsArray.push(requestedItem);
    this.apiService.marketStatCall(requestedItemsArray, "Marketstat");

    // Subscribe to the service that retrieves API data until the program closes, then destroy connection.
    this.apiService.getMarketResponse().pipe(takeUntil(this.destroy)).subscribe(marketResponses => {
      this.marketResponses = marketResponses;
    });
  }

  // Kill the subscribed services.
  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
