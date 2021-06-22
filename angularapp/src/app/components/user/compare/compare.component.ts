import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {


  addCompareFormType = 'company';
  showCompareForm = false;
  chartType='mscolumn2d';
  dataSource:Object;
  chartData:any;
  categories=[{
      "category": [{"label":""}]
    }];
  dataset:[{
    "seriesname": "",
    "data": []
  }];
  caption:string="";
  periodFix={
    fixed: false,
    fromDate:"",
    toDate:"",
    periodicity:""
  }

  constructor() {
    this.categories=[{
      "category": [{"label":""}]
    }];
  this.dataset=[{
    "seriesname": "",
    "data": []
  }];
    this.dataSource = {
      "chart": {
      "theme": "fusion",
      "caption": "ADD SOMETHING TO SHOW",
      "xAxisname": "Quarter",
      "yAxisName": "Revenues (In USD)",
      "numberPrefix": "\$",
      "plotFillAlpha": "80",
      "divLineIsDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1"
      },
      "categories": this.categories,
      "dataset": this.dataset,
          };
      
  }

  ngOnInit(): void {
    // this.chartData.subscribe()
  }

  changeCompareFormType(type:string){
    if(type == 'company') this.addCompareFormType = 'company';
    else if(type == 'sector') this.addCompareFormType = 'sector';
    this.showCompareForm=!this.showCompareForm;
  }


  addedComponent(e:any){
    this.changeCompareFormType('');

    // console.log(this.categories, this.dataset);
    this.caption = ((this.caption == "") ? "":this.caption +" Vs ")+ e.dataset.seriesname;
    this.setChart(e.categories, e.dataset);
    
  }

  setChart(categories:any, dataset:any){

    // if(!this.periodFix.fixed) this.categories[0].category = categories;
    // this.dataset.push(dataset);
    this.categories = categories;
    if(this.dataset[0].seriesname!="") this.dataset.push(dataset);
    else this.dataset[0]=dataset;
    console.log("response: ",this.categories, this.dataset);
    const dataSource = {
      chart: {
        "caption": this.caption,
        "subCaption": "Stock Price Analysis",
        "xAxisname": "DateTime",
        "yAxisName": "Stock Price (in INR)",
        "numberPrefix": "INR",
        "divlineColor": "#999999",
        "divLineIsDashed": "1",
        "divLineDashLen": "1",
        "divLineGapLen": "1",
        "toolTipColor": "#ffffff",
        "toolTipBorderThickness": "0",
        "toolTipBgColor": "#000000",
        "toolTipBgAlpha": "80",
        "toolTipBorderRadius": "2",
        "toolTipPadding": "5",
        "theme": "fusion"
      },
      // Chart Data - from step 2
      categories: this.categories,
      dataset: this.dataset
    };
    this.dataSource = dataSource;
  }

  setPeriod(e:any){
    this.periodFix = e;
  }

}

