var taskname=document.getElementById("taskname");
var tasklist=document.getElementById("tasks");
let arr=[];
let count=1;
window.addEventListener('load', () => {
    let storedTasks = localStorage.getItem("abc");
    if (storedTasks) {
        arr = JSON.parse(storedTasks);
        arr.forEach(addtask);
    }
});

taskname.addEventListener("keypress",(e)=>{
    if(e.key=='Enter'){ 
    if(taskname.value==''){
        alert("please enter task");
    }
    else{
        savelocalstorage();
        taskname.value='';
    }
}
})

function addtask(obj){
    var div=document.createElement("div");
    div.setAttribute("id",obj.id);
    var spantask=document.createElement("span");
    spantask.innerHTML=obj.title;
    div.appendChild(spantask);
    
    var chk=document.createElement("input");
    chk.type="checkbox";
    div.appendChild(chk);
    
    chk.addEventListener("click",()=>{
        let status='pending';
        if(chk.checked){
            status='completed';
        }
        arr.map((item)=>{
            if(item.id==obj.id){
                item.status=status;
            }
            return item;
        });
        localStorage.setItem("abc",JSON.stringify(arr)); 
    });
    
    var del=document.createElement("Button");
    del.innerHTML='X';
    div.appendChild(del);
    
    tasklist.appendChild(div);
    
    del.addEventListener("click",clickHandler);
}

function savelocalstorage(){
    let obj={};
    obj.title=taskname.value;
    obj.status='pending';
    obj.id=count;
    count++;
    arr.push(obj);
    localStorage.setItem("abc",JSON.stringify(arr));
    addtask(obj);
}

function clickHandler(e){
    let parentdiv=e.target.parentNode;
    let taskid=parentdiv.id;
    parentdiv.remove();
    arr=arr.filter((item)=>{
        if(item.id!=taskid){
            return item;
        }
    })
    localStorage.setItem("abc",JSON.stringify(arr));
}
