import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { WebModule } from './module/web/web.module';
import { DashboardService } from './service/dashboard.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WebModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
