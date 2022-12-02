import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { StockDetail } from 'src/app/models/stocks';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  stockInputs: string[] = [];

  stockDetails: StockDetail[] = [];

  stockForm = this.fb.group({
    stockInput: [null]
  });

  constructor(private stock: StockService,
              private fb: FormBuilder) { }

  ngOnInit() {
    const companyNames = JSON.parse(localStorage.getItem('stockInput')!);
    companyNames.map((name: string) => {
      combineLatest([this.stock.getCompanyName(name), 
        this.stock.getDetails(name)]).subscribe({
          next: (response: any) => {
            const result = {
              ...response[0]['result'][0],
              ...response[1],
            }
            this.stockDetails.push(result);
          }
        });

    })
  }

  positiveOrNegative(number: string) {
    return Math.sign(+number);
  }

  onTrack() {
    if (this.stockForm.value.stockInput) {
      this.stockInputs.push(this.stockForm.value.stockInput);
      localStorage.setItem('stockInput', JSON.stringify(this.stockInputs));
  
      combineLatest([this.stock.getCompanyName(this.stockForm.value.stockInput), 
                    this.stock.getDetails(this.stockForm.value.stockInput)]).subscribe({
                      next: (response: any) => {
                        const result = {
                          ...response[0]['result'][0],
                          ...response[1],
                        }
                        this.stockDetails.push(result);
                        this.stockForm.reset();
                      }
                    });
    }
  }

  removeStock(companyName: string) {
    this.stockDetails = this.stockDetails.filter((data: any) => {
      return data.symbol !== companyName;
    });
  }

}
