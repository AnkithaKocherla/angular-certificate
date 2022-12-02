import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest } from 'rxjs';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-single-stock',
  templateUrl: './single-stock.component.html',
  styleUrls: ['./single-stock.component.scss']
})
export class SingleStockComponent implements OnInit {

  companyName!: string;

  data!: any;

  constructor(private route: ActivatedRoute,
              private stockService: StockService) { }

  ngOnInit(): void {
    this.data = null;
    this.route.params.subscribe((params: Params) => {
      this.companyName = params['symbol'];
    });
    combineLatest([this.stockService.getCompanyName(this.companyName), 
      this.stockService.getDetail(this.companyName)]).subscribe({
        next: (response: any) => {
          this.data = {
            result: response[0],
            details: response[1]
          };
          this.data?.details?.data.splice(6);
        }
      });

  }

  getMonth(id: number) {
    let month = null;
    switch(id)
      {
        case 1:
          month="January";
          break;
        case 2:
          month="February";
          break;
        case 3:
          month="March";
          break;
        case 4:
          month="April";
          break;
        case 5:
          month="May";
          break;
        case 6:
          month="June";
          break;
        case 7:
          month="July";
          break;
        case 8:
          month="August";
          break;
        case 9:
          month="September";
          break;
        case 10:
          month="October";
          break;
        case 11:
          month="November";
          break;
        case 12:
          month="December";
          break;
        default:
          month="Invalid month";
      }
      return month;
  }

  positiveOrNegative(number: string) {
    return Math.sign(+number);
  }

}
