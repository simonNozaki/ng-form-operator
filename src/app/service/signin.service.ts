import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { Users } from '../resource/mock-users';
import { _ } from 'underscore';
import { Observable } from 'rxjs/Observable';
import * as Rx  from "rxjs/Rx";

/**
 * サインインサービスクラス。
 */
@Injectable()
export class SigninService {

    constructor() { }

    /**
     * モックユーザを返却します。
     */
    public signin(email: string, password: string): User {
        return _.filter(Users, function(user: User) {
            return (user.email == email) && (user.password == password);
        });
    }

    /**
     * 条件に合致するモックユーザを取得します。
     */
    public fetch(email: string, password: string): Observable<User[]> {
        return Rx.Observable.of(Users)
            // .filter((user: User[], index: number) => {
            //     if ((user[index].email == email) && (user[index].password == password)) {
            //         return true;
            //     }
            //     return false;
            // });
    }

}
