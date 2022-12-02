import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleStockComponent } from './components/single-stock/single-stock.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';

const routes: Routes = [
  {
    path: '',
    component: StockDetailsComponent
  },
  {
    path: 'sentiment/:symbol',
    component: SingleStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
