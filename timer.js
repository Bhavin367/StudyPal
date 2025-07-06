const standardTime = 25 * 60 * 1000 ; 
const standardBreak = 5* 60 *1000 ; 

const focusTime = 120 * 60 * 1000 ; 
const focusBreak = 60 * 60 * 1000 ;  

let isRunning = false ; 

let pomotimer = document.getElementById("pomoTimer");
let pomotimerdiv = document.getElementById("pomoTimerdiv");

let controlButton = document.getElementById("startPomo");

let timer = document.getElementById("pomoClock");

let runTime = 0 ; 
let elapsedTime = 0 ; 
let runDuration ; 
let breakDuration ; 
let startTime;
let id ; 
let currentMode; 

function pomoSectionclose(){
    let pomo = document.getElementById("pomoSection");
    pomo.style.display = "none";
    console.log("pomo closed");

}

function closepomoTimer(){
    pomotimer.style.display = "none";
    reset();

}



function loadPomo(mode){
    if(mode == "focus"){
        runDuration = focusTime;
        breakDuration = focusBreak ; 
        currentMode = focusTime;

    }
    else{
        runDuration = standardTime; 
        breakDuration = standardBreak ;
        currentMode = standardTime;
    }

    pomotimer.style.display = "flex";
}


function updateState(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime ; 
        id = setInterval(updateTime,100);
        isRunning = true ; 

        controlButton.style.backgroundImage = "url(icons/pause_button.svg)";

        if (runDuration == focusTime || runDuration == standardTime){
            pomotimerdiv.style.boxShadow = "0 0 0.5rem green";
    }
    else {
        pomotimerdiv.style.boxShadow = '0 0 0.5rem blue';
    }
}   else {
    isRunning = false ; 
    controlButton.style.backgroundImage = "url(icons/start_button.svg)";
    clearInterval(id);
    pomotimerdiv.style.boxShadow = '0 0 0.5rem red';


}
}



function updateTime(){

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    let timeLeft = runDuration - elapsedTime ; 
    if (timeLeft <= 1 ){
        clearInterval(id);
        timer.textContent = "00:00";
        isRunning = false ; 
        controlButton.style.backgroundImage = "url(icons/start_button.svg)";
        runDuration = breakDuration ; 
        updateState(); 
        return ; 

    }
    let hour = Math.floor(timeLeft/(1000 * 60 *60 )).toString().padStart(2,0);
    let min = Math.floor( timeLeft/(1000 * 60)%60).toString().padStart(2,0);
    let sec = Math.floor(( timeLeft /1000) % 60  ).toString().padStart(2,0);
    hour > 0 ? timer.textContent = `${hour}:${min}:${sec}` : timer.textContent = `${min}:${sec}`;

    

}


function reset(){
    isRunning = false ; 
    runDuration = currentMode;
    timer.textContent = "00:00";
    controlButton.style.backgroundImage = "url(icons/start_button.svg)";
    elapsedTime = 0 ; 
    clearInterval(id);
    pomotimerdiv.style.boxShadow = "0 0 0 white"  ; 
}


// the timer section too lazy to add another file 


let stopwatchClock = document.getElementById("stopwatchClock");
let stopwatchSection = document.getElementById("stopwatchSection");
let stopwatchStatecontrol = document.getElementById("stopwatchState");

let iswatchRunning = false ; 
let watchstartTime ;
let watchelapsedTime = 0 ; 
let watchId ; 


function loadStopwatch(){
    stopwatchSection.style.display = "flex";
}

function closeStopwatch(){
    stopwatchSection.style.display = "none";
    stopwatchReset();
}


function stopwatchState(){
    
    if(!iswatchRunning){
        watchstartTime = Date.now() - watchelapsedTime;
        iswatchRunning = true ; 
        watchId = setInterval(updatewatchTimer,1000);
        stopwatchStatecontrol.style.backgroundImage = `url(icons/pause_button.svg)`;

    }
    else {
        iswatchRunning = false ; 
        clearInterval(watchId);
        stopwatchStatecontrol.style.backgroundImage = `url(icons/start_button.svg)`;
    }

}


function updatewatchTimer(){
    const currentTime = Date.now(); 
    watchelapsedTime = currentTime - watchstartTime;
    let hour = Math.floor(watchelapsedTime/(1000 * 60 *60 )).toString().padStart(2,0);
    let min = Math.floor( watchelapsedTime/(1000 * 60)%60).toString().padStart(2,0);
    let sec = Math.floor((watchelapsedTime/1000) % 60  ).toString().padStart(2,0);
    hour > 0 ? stopwatchClock.textContent = `${hour}:${min}:${sec}` : stopwatchClock.textContent = `${min}:${sec}`;


}


function stopwatchReset(){
    clearInterval(watchId);
    watchelapsedTime = 0 ; 
    iswatchRunning = false ; 
    stopwatchClock.textContent = "00:00";
    stopwatchStatecontrol.style.backgroundImage = "url(icons/start_button.svg)";

}