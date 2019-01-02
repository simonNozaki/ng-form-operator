import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatFormFieldModule, MatMenuModule  } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonDeliveryService } from '../../service/common-delivery.service';
import { Router } from '@angular/router';
import { DashboardService } from '../../service/dashboard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { WebModule } from '../../module/web/web.module';
import { SigninComponent } from '../signin/signin.component';
import { AppComponent } from '../../app.component';

/**
 * リダイレクションモッククラス
 */
class MockRouter {
    navigateByUrl(url: string) {
        return url;
    }
}

/**
 * DashboardComponentのテストスイート
 */
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  /**
   * テスト実行前初期化処理、フィクスチャの生成
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent,
        AppComponent,
        SigninComponent
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
        DashboardService,
        CommonDeliveryService,
        {
            provide : Router,
            useClass : MockRouter
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents().then(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        let dashboardbService: DashboardService = TestBed.get(DashboardService);
        let commondeliveryService: CommonDeliveryService = TestBed.get(CommonDeliveryService);
        let router: Router = TestBed.get(Router);
    });
  }));

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

    /**
     * 認証された状態でページが開けることを確認する
     */
    it('should display dashboard', function(){
      component.ngOnInit();
      component.userId = '0000000001'
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('button').textContent).toContain('追加');
    })

});
