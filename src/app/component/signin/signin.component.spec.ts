import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatFormFieldModule, MatMenuModule  } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonDeliveryService } from '../../service/common-delivery.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { WebModule } from '../../module/web/web.module';
import { SigninComponent } from '../signin/signin.component';
import { AppComponent } from '../../app.component';
import { SpecInitializingStubRouter } from '../../spec/spec-initializing-stub-router';
import { SigninService } from '../../service/signin.service';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          SigninComponent,
          DashboardComponent,
          AppComponent
      ],
      imports : [
        BrowserAnimationsModule,
        WebModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers : [
        SigninService,
        CommonDeliveryService,
        {
            provide : Router,
            useClass : SpecInitializingStubRouter
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents().then(() => {
        fixture = TestBed.createComponent(SigninComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        let signinService: SigninService = TestBed.get(SigninService);
        let commondeliveryService: CommonDeliveryService = TestBed.get(CommonDeliveryService);
        let router: Router = TestBed.get(Router);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
