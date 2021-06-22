export class ExcelData{
    companyCode: String;
    stockExchange: String;
    pricePerShare: number;
    date: String; 
    time: String;
    
    // constructor(){
    //     this.companyCode="";
    // this.stockExchange="";
    // this.pricePerShare=0;
    // this.date=""; 
    // this.time="";
    // }
    constructor(arr:Array<String>){
        // console.log(arr);
        this.companyCode=arr[0].trim();
        this.stockExchange=arr[1].trim();
        this.pricePerShare=Number(arr[2].trim());
        this.date=arr[3].trim(); 
        this.time=arr[4].trim();
    }

    toString():String{
        return "companyCode: "+ this.companyCode+ " "
            +"stockExchange: "+ this.stockExchange+ " "
            +"pricePerShare: "+ this.pricePerShare+ " "
            +"date: "+ this.date+ " "
            +"time: "+ this.time;
    }
}


//Company Code	Stock Exchange	Price Per Share(in Rs)	Date 	Time