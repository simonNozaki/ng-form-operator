import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonDeliveryService {

    constructor() { }

    private userId: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public currentUserId: Observable<string> = this.userId.asObservable();

    /**
     * 送信元、送信先が共通で監視するプロパティの値を随時更新します。
     * @param message 
     */
    public changeMessage(message: string): void {
        this.userId.next(message);
        console.log(JSON.stringify({user_id : message}));
    }

}
