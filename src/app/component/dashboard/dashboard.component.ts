import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { Task } from '../../entity/task';
import { FormGroup, FormControl } from '@angular/forms';
import { _ } from 'underscore';
import { CommonDeliveryService } from '../../service/common-delivery.service';
import { Router } from '@angular/router';
import * as CanvasJS from '../../lib/canvasjs.min';
import { Tasks } from '../../resource/mock-tasks';

declare var google: any;

declare var googleLoaded: any;

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

    @ViewChild('google-chart')
    public googleChart: ElementRef;

    public context: CanvasRenderingContext2D;
    
    public chart: Chart;

    public dataPoints: any[] = [];

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

        for(var index: number = 0; index < Tasks.length; index++){
            var data = { x: (index * 5), y: [Date.parse(Tasks[index].startDate), Date.parse(Tasks[index].deadline)], label: Tasks[index].itemName };
            console.log(Date.parse(Tasks[index].deadline) - Date.parse(Tasks[index].startDate));
            this.dataPoints.push(data);
        }

        console.log(this.dataPoints);
        
        // canvasjs
        let chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: false,
            exportEnabled: true,
            title: {
                text: ""
            },
            data: [{
                type: "rangeBar",
                dataPoints: this.dataPoints
            }]
        });
            
        chart.render();
    }

    /**
     * template初期化後処理
     */
    ngAfterViewInit() {

        // ここからGoogle chart
        if(!googleLoaded) {
            googleLoaded = true;
            google.charts.load('current', {'packages':['corechart']})
        }

        // 要素の取得を遅延実行できるようにする
        setTimeout(() => {
            const elm = this.googleChart.nativeElement;
            google.charts.setOnLoadCallback(drawChart);
    
            function drawChart() {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Topping');
                data.addColumn('number', 'Slices');
                data.addRows([
                    ['Mushrooms', 3],
                    ['Onions', 1],
                    ['Olives', 1],
                    ['Zucchini', 1],
                    ['Pepperoni', 2]
                ]);
                var options = {'title':'How Much Pizza I Ate Last Night',
                                'width':400,
                                'height':300};
                var chart = new google.visualization.PieChart(elm)
                chart.draw(data, options);
            }
        }, 1000);

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
