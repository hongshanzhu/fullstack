import * as request from 'request';
import * as Iconv from 'iconv-lite';
import * as colors from 'colors';
import {config } from './config';

let stockResultList:any = [];

function getData(){
    stockResultList = [];
    let options = {
        url:config.api + config.stocks.toString(), // 必填
        //headers:{'Content-Type':'application/json'},
        gzip:true,
        encoding: null
    }
    
    request.get(options,(error:any, response:any, body:any)=>{
        
        let result = Iconv.decode(body, 'gb2312').toString();
        let stocks = result.split(';');
        for (let i=0; i<stocks.length-1; i++){
            stocks[i] = stocks[i].substring(stocks[i].indexOf("\"") + 1, stocks[i].lastIndexOf("\""));
            let arr = stocks[i].split(',');
            stockResultList.push(arr);
        }        
        //console.log('result:', result); // Print the HTML for the Google homepage.
        renderList();
        setTimeout(function () {
            getData();
        }, 5000);
    });
    
    
}
getData();

const space = {
    s2: "  ",
    s4: "    ",
    s8: "        ",
    s16: "                "
};

function renderList() {
    console.log(colors.grey('name' +
        space.s4 +
        'yestoday' +
        space.s2 +
        'cur' +
        space.s2 +
        '%' +
        space.s2 +
        'max' +
        space.s2 +
        'min'));
    for (let i = 0; i < stockResultList.length; i++) {
        const item = stockResultList[i];
        let rate:any = 0.00;
        let rateText = '0.00%';
        if (item[3] != 0) {
            let dif = item[3] - item[2];
            if (dif >= 0) {
                rate = (dif / item[2] * 100).toFixed(2);
                rateText = colors.grey(rate + '%');
            } else {
                rate = (dif / item[2] * 100).toFixed(2);
                rateText = colors.grey(rate + '%');
            }
        }
        console.log("");
        console.log(colors.grey(item[0]) +
            space.s2 +
            colors.grey(item[2]) +
            space.s2 +
            colors.grey(item[3]) +
            space.s2 +
            colors.grey(rateText) +
            space.s2 +
            colors.grey(item[4]) +
            space.s2 +
            colors.grey(item[5])
        );
    }
}