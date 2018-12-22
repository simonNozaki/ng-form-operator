import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../component/dashboard/dashboard.component';
import { SigninComponent } from '../../component/signin/signin.component';

/**
 * ルーティング定義
 */
const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'signin', component: SigninComponent}
];

/**
 * ルーティングモジュールクラス
 */
@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forChild(routes), RouterModule.forRoot(routes)]
  ],
  exports: [
      [RouterModule]
  ],
  declarations: []
})
export class WebModule { }
