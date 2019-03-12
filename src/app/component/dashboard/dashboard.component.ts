import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { Task } from '../../entity/task';
import { FormGroup, FormControl } from '@angular/forms';
import { _ } from 'underscore';
import { CommonDeliveryService } from '../../service/common-delivery.service';
import { Router } from '@angular/router';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { GraphControl } from '../../entity/graph-control';

/**
 * ダッシュボード用コンポーネントクラス
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    /**
     * デフォルトコンストラクタ
     */
    constructor(private dashboardService: DashboardService, private commonDeliveryService: CommonDeliveryService, private router: Router, private elementRef: ElementRef) {}

    public userId: string;

    @ViewChild('taskgraph')
    public ref: ElementRef;

    @Input()
    public data: ChartData;

    @Input()
    public options: ChartOptions;

    public context: CanvasRenderingContext2D;
    
    public chart: Chart;

    /**
     * 起動時のデフォルト処理
     */
    ngOnInit() {
        this.commonDeliveryService.currentUserId.subscribe((userId: string) => {
              this.userId = userId;
        });
        // タスクの一覧を取得してリストに設定する
        this.taskList = this.dashboardService.fetch(this.userId);
        // エラーメッセージ。デフォルトはnull。
        this.errorMessage = "";
        console.log(JSON.stringify({user_id : this.userId}));
        if(this.userId == null || typeof this.userId == 'undefined'){
            this.router.navigateByUrl('/signin');
        }
    }

    /**
     * template初期化後処理
     */
    ngAfterViewInit() {

        console.log(this.ref);

        var graph: GraphControl = new GraphControl();

        // canvasを取得
        this.context = this.ref.nativeElement.getContext('2d');

        // チャートの作成
        this.chart = new Chart(this.context, {
            type: 'bar',     // barチャート表示
            data: graph.data,      // データをプロパティとして渡す
            options: graph.options // オプションをプロパティとして渡す
        })
    }

    //-------------------------
    // コンポーネント内プロパティ
    //-------------------------
    /**
     * コンポーネント内で表示できるタスクの一覧
     */
    public taskList: Task[]

    /**
     * フォームグループ
     */
    public taskForm: FormGroup = new FormGroup({
        itemNameControl: new FormControl(),
        itemTagControl: new FormControl(),
        noteControl: new FormControl()
    })

    /**
     * エラーメッセージ
     */
    public errorMessage: string;

    /**
     * タスクを完了します。
     * @param taskId
     * @returns void
     */
    public complete(taskId: string): void {
        // 完了したタスクを抽出
        var completedTask: Task = _.where(this.taskList, {taskId : taskId});
        // 完了したタスクのINDEXを取得
        var index: number = _.indexOf(this.taskList, completedTask);
        // タスクのリストから削除
        this.taskList.splice(index, 1);
        console.log(completedTask, index, JSON.stringify(this.taskList));
    }

    /**
     * タスクを新規追加します。<br>
     * モックのリストに追加。
     */
    public register(): void {
        // 追加するタスクのインスタンスを初期化
        var newTask: Task = new Task();
        newTask.itemName = this.taskForm.get("itemNameControl").value;
        newTask.itemTag = this.taskForm.get("itemTag").value;
        newTask.note = this.taskForm.get("noteControl").value;

        // リストにタスクを追加
        this.taskList.push(newTask);
    }

    /**
     * すでに登録されたタスクの項目を編集します。
     * @param target
     */
    public update(target: string): void {
        
    }

}
