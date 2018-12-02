import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Task } from '../entity/task';
import { Tasks } from '../resource/mock-tasks';

/**
 * ダッシュボードクラスの操作を提供するServiceクラス。
 */
@Injectable()
export class DashboardService {

    /**
     * デフォルトコンストラクタ
     */
    constructor(private httpClinet: HttpClient) { }

    /**
     * タスクの一覧を取得します。
     * @returns Task[]
     */
    public fetch(): Task[] {
        return Tasks;
    }




}
