import { Injectable } from '@angular/core';
import { Task } from '../entity/task';
import { Tasks } from '../resource/mock-tasks';
import { _ } from 'underscore';

/**
 * ダッシュボードクラスの操作を提供するServiceクラス。
 */
@Injectable()
export class DashboardService {

    /**
     * デフォルトコンストラクタ
     */
    constructor() { }

    /**
     * タスクの一覧を取得します。
     * @returns Task[]
     */
    public fetch(userId: string): Task[] {
        return  _.filter(Tasks, function(task: Task){
            return task.userId == userId;
        });
    }

}
