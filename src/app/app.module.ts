import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatFormFieldModule, MatMenuModule  } from '@angular/material';
import { OnsenModule } from 'ngx-onsenui';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { WebModule } from './module/web/web.module';
import { DashboardService } from './service/dashboard.service';
import { SigninComponent } from './component/signin/signin.component';
import { SigninService } from './service/signin.service';
import { CommonDeliveryService } from './service/common-delivery.service';
import { ChartComponent } from './component/chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SigninComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WebModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCheckboxModule,
    OnsenModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [DashboardService, SigninService, CommonDeliveryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
