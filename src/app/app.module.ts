import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { WebModule } from './module/web/web.module';
import { DashboardService } from './service/dashboard.service';
import { SigninComponent } from './component/signin/signin.component';
import { SigninService } from './service/signin.service';
import { CommonDeliveryService } from './service/common-delivery.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SigninComponent
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
    MatFormFieldModule,
    MatCheckboxModule
  ],
  providers: [DashboardService, SigninService, CommonDeliveryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
