import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorldMapComponent } from './world-map/world-map.component';
import { HomeComponent } from './home/home.component';
import { NavpageComponent } from './navpage/navpage.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'navPage', component: NavpageComponent },
  { path: 'worldMap', component: WorldMapComponent },
  { path: 'barChart', component: BarChartComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
