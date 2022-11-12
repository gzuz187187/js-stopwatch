let convert2hhmmss = function(dateInMs) {
    let milliseconds = parseInt(dateInMs % 1000);

    let dateInSec = parseInt(dateInMs / 1000);
    let seconds = parseInt(dateInSec % 60);

    let dateInMin = dateInSec / 60;
    let minutes = parseInt(dateInMin % 60);

    let dateInHours = dateInMin / 60;
    let hours = parseInt(dateInHours);

    seconds = addPreceeding0(seconds);
    minutes = addPreceeding0(minutes);
    hours = addPreceeding0(hours);
    milliseconds = formatMilliseconds(milliseconds);

    return {h: hours, m: minutes, s: seconds, milli: milliseconds};
}

let addPreceeding0 = function(n) {
    let temp = String(n);

    if (temp.length < 2) {
        return `0${temp}`;
    }

    return temp;
}

let formatMilliseconds = function(n) {
    let temp = String(n);

    if (temp.length == 1) {
        return `00${temp}`;
    }

    if (temp.length == 2) {
        return `0${temp}`;
    }

    return temp;
}

let startButtonClicked = function(xH, xM, xS, xMilli) {
    if (startTime == null) {
        startTime = Date.now();
    }

    if (intStopTimer !== null) {
        clearInterval(intStopTimer);

        startTime += stopDifference;
    }
    // let lastDifference = 0;

    if(int !== null){
        clearInterval(int);
    }
    
    int = setInterval(() => {
            let actTime = Date.now();
            let difference = actTime - startTime;

            let convertedTime = convert2hhmmss(difference);
            // let convertedTimeLast = convert2hhmmss(lastDifference);

            xH.innerHTML = convertedTime.h;
            xM.innerHTML = convertedTime.m;
            xS.innerHTML = convertedTime.s;
            xMilli.innerHTML = convertedTime.milli;
            // lastDifference = difference;
    }, 10);  
}

    // return lastDifference;E

// let startButtonClicked = function(xH, xM, xS) {
//     let startTime = Date.now();
//     let lastDifference = 0;
//     let difSec = 0;

//     xH.innerHTML = "00";
//     xM.innerHTML = "00";
//     xS.innerHTML = "00";

//     flag = true;

//     while (flag) {
//         let actTime = Date.now();
//         let difference = actTime - startTime;

//         if (difference > 1000) {
//             let tempS = parseInt(xS.innerHTML);
//             xS.innerHTML = tempS + 1;
//             startTime = actTime;
//         }

//         // lastDifference = difference;
//     }

//     // return lastDifference;
// }

let stopButtonClicked = function() {
    clearInterval(int);

    let stopTime = Date.now();

    if (intStopTimer !== null) {
        clearInterval(intStopTimer);
    }

    stopDifference = 0;

    intStopTimer = setInterval(() => {
        let actTime2 = Date.now();
        stopDifference = actTime2 - stopTime;
    }, 10);
}

let resetButtonClicked = function(xH, xM, xS, xMilli) {
    xH.innerHTML = "00";
    xM.innerHTML = "00";
    xS.innerHTML = "00";
    xMilli.innerHTML = "000";

    startTime = null;
    clearInterval(intStopTimer);
    stopDifference = 0;
}

// let date1 = new Date();
// let date1 = Date.parse("12 Nov 2022 12:55:23 GMT");
// let date2 = Date.parse("13 Nov 2022 01:00:00 GMT");
let startBtn = document.getElementById("start-btn");
let stopBtn = document.getElementById("stop-btn");
let resetBtn = document.getElementById("reset-btn");
let hoursHtml = document.getElementById("hours");
let minutesHtml = document.getElementById("minutes");
let milliHtml = document.getElementById("milliseconds");
let secondsHtml = document.getElementById("seconds");
let startTime = null;
// let flag = false;
let int = null;
let intStopTimer = null;
let stopDifference = 0;

stopBtn.disabled = true;
resetBtn.disabled = true;

startBtn.addEventListener("click", () => {
    startButtonClicked(hoursHtml, minutesHtml, secondsHtml, milliHtml);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
});

stopBtn.addEventListener("click", () => {
    stopButtonClicked();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
});

resetBtn.addEventListener("click", () => {
    resetButtonClicked(hoursHtml, minutesHtml, secondsHtml, milliHtml);
});

// hoursHtml.innerHTML = "18";
// minutesHtml.innerHTML = "18";
// secondsHtml.innerHTML = "18";

// let testDateMs = date2 - date1;
// console.log(testDateMs);

// let testDate = convert2hhmmss(testDateMs);

// console.log(`After conversion: ${testDate.h}:${testDate.m}:${testDate.s}`);

// console.log(`${testDate.getHours()}:${testDate.getMinutes()}:${testDate.getSeconds()}`);