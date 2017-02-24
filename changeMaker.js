/**
 * Created by yashw on 24-02-2017.
 */
'use strict'

/*
 The goal of this kata is to make change
 using the fewest number of coins possible. This kata
 can be completed using any set of coin denominations.
 For example, if using legal US coins, the change for
 $1.41 would include one $1 coin, one quarter, one dime,
 one nickel, and one penny.

 Legal US Coins

 |Coin Name   |Coin Value|
 |------------|----------|
 |Cent        |1¢        |
 |Nickel      |5¢        |
 |Dime        |10¢       |
 |Quarter     |25¢       |
 |Half-Dollar |50¢       |
 |Dollar      |$1        |

 */
var dollarAmount = 45.49;

var availableChangeDenoms = [1,5,10,25,50];
var changeMap = new Map();

var dollars = Math.floor(dollarAmount);
changeMap.set("$1",dollars);

//This was my logic to seperate decimal from the float but it decreases 1 cent when I try to floor it
// var xchange = dollarAmount % 1;
// xchange = Math.floor(xchange * 100);

//logic to separate decimal part of the number from floating point value | Source: StackOverflow
var xChange = fract(dollarAmount);
function fract(n){
    return Number(String(n).split('.')[1] || 0);
}

makeChange(xChange);

function makeChange(change) {
    var currDiff = 0;
    var prevDiff = 0;
    var maxDenomIdx = 0;
    var newQty = 0;

    if(change === 0){
        return changeMap;
    }

    else if(change >= 5){
        for(var i=0;i<availableChangeDenoms.length;i++){
            currDiff = change - availableChangeDenoms[i]
            if(currDiff === 0){
                maxDenomIdx = i;
                break;
            }
            else if(currDiff < 0){
                break;
            }
            else if(currDiff > 0 && (currDiff < prevDiff)){
                maxDenomIdx = i;
            }
            prevDiff = currDiff;
        }

        if(changeMap.has("~c"+availableChangeDenoms[maxDenomIdx])){
            newQty = changeMap.get("~c"+availableChangeDenoms[maxDenomIdx]) + 1;
            changeMap.set("~c"+availableChangeDenoms[maxDenomIdx], newQty);
        }
        else
            changeMap.set("~c"+availableChangeDenoms[maxDenomIdx],1);

        change = change - availableChangeDenoms[maxDenomIdx];
        console.log("change now: " + change);
        makeChange(change);
    }

    else{
        changeMap.set("~c"+availableChangeDenoms[0],change);
        return changeMap;
    }
}

console.log(changeMap);