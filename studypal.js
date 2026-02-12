let popup = document.getElementById("popup");
let sessionList = [];
let currentKey;
let currentSession;
updatesessionList();
loadStoragedata();


function demoNotes(){
    document.getElementById("notepad").style.display = "block";
    let notes = document.getElementById("notes");
    notes.value = "";
    notes.placeholder = "Notes won't be saved!!!!";
}

function loadStoragedata(){
    for (let i = 0 ; i < localStorage.length ; i ++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

    
        if (value === null || value === "") continue;

        addsessionBlock(key);
    }
}


function popupClose(){
    popup.style.display = "none";
}

function popupInitiate(){
    popup.style.display = "flex";
}

function updatesessionList(){
    let sessions = document.getElementsByClassName("sessionblock");

    sessionList = [];
    for(let i = 0 ; i < sessions.length;i++){
        
        sessionList.push(sessions[i].textContent);
    }
}


function popupCreate(){
    
    let sessionname = document.getElementById("sessionname");
    let val = sessionname.value ; 
    if(val == ''){
        window.alert("Enter a name before creating session")
    }
    else if(sessionList.includes(val)){
        window.alert(`Session ${val} already exist`)
    }
    else{
        sessionList.splice(sessionList.length - 1 , 0 , val);
        console.log(val);
        console.log(sessionList);
        sessionname.value = "";

        addsessionBlock(val);
        
    }
}


function addsessionBlock(val){
    let parent = document.getElementById("sessions");
    let plus = document.getElementById("next");
    let newdiv = document.createElement("div");
    newdiv.className = "sessionblock";
    newdiv.textContent = val ; 

    parent.insertBefore(newdiv,plus);

    if(localStorage.getItem(val) === null){
    localStorage.setItem(val,val);
    } ;
    newdiv.onclick =() => loadNotepad(newdiv.textContent,newdiv);
    updatesessionList();

    

}

function loadNotepad(key,newDiv){
    notepad.style.display = "block";
    if(localStorage.getItem(key) !== null){
        let data = localStorage.getItem(key);
       document.getElementById("notes").value = data || "";

    }
    currentKey = key ;
    currentSession = newDiv;
    console.log(currentKey);
}

function notepadSave(){
    if(currentKey !== null){
        let notes = document.getElementById("notes");
        localStorage.setItem(currentKey,notes.value);

    }
}

function notepadClose(){
    let notepad = document.getElementById("notepad");
    notepad.style.display = "none";
    notepadSave();
}


function notepadDelete(){
    if(currentKey!== null){
        console.log(currentKey);
        localStorage.removeItem(currentKey);
        console.log(`item exist ? ${localStorage.getItem(currentKey)}`);
        if(currentSession){
            currentSession.remove();
        }
        document.getElementById("notes").value = "";
        notepadClose();
        updatesessionList();
    }
    currentKey = null ; 
    currentSession = null  ; 

}

