import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonDeliveryService } from '../../service/common-delivery.service';
import { Router } from '@angular/router';
import { SigninService } from '../../service/signin.service';
import { User } from '../../entity/user';
import { _ } from 'underscore';

/**
 * ユーザ認証コンポーネント。
 */
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    /**
     * デフォルトコンストラクタ
     */
    constructor(private signinService: SigninService, private router: Router, private commonDeliveryService: CommonDeliveryService) { }

    ngOnInit() {
    }

    /** 
     * バリデーションチェック結果
     */
    public checkedResult: string;

    /**
     * 利用者情報登録フォームグループ
     */
    public signinForm: FormGroup = new FormGroup({
        emailControl: new FormControl("", [Validators.required, Validators.maxLength(100)]),
        passwordControl: new FormControl("", [Validators.required, Validators.maxLength(50)])
    })

    public signin(): void {
        var email = this.signinForm.get("emailControl").value;
        var password = this.signinForm.get("passwordControl").value;

        // ユーザのリストを取得
        // var target: User = this.signinService.signin(email, password);

        
        // 認証に成功した場合、データ送受信サービスにデータを送信
        this.signinService.fetch(email, password).subscribe((users: User[]) => {
            console.log(users);
            this.commonDeliveryService.changeMessage(users[0].userId);
            this.router.navigateByUrl('/dashboard');
        })        
    }

}
