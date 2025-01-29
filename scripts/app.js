let contents = document.querySelector("#contents");
let login_form = document.querySelector("#login_form");
let greeting = document.querySelector("#greeting");
const clock = document.querySelector('#clock');
let task_array = [];

const HIDDEN_CLASSNAME = "hidden";
const USER_NAME = "userName"
const TASKS = "tasks";

const greeting_arr = [
    "Hello",
    "Good day",
    "Hey there",
    "How are things",
    "What's happening",
    "Yo",
    "What's the story"
];

// 프로그램이 시작되자마자 유효성 검사를 실시 한다.
// 유저 네임이 있는 경우
if(localStorage.getItem(USER_NAME)){
    setClock();
    setUserName(localStorage.getItem(USER_NAME));
    const savedTasks = localStorage.getItem(TASKS);   // 저장되어있는 할 일 목록
    // console.log(`savedTasks : ${savedTasks}`);
    if(savedTasks){
        task_array = JSON.parse(savedTasks);    // JSON.parse() : JSON을 객체로 변경한다. 
        displayTasks(task_array);
    } 
}

// 현재 시간
function setClock(){
    const date = new Date();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    clock.innerText = `${hour}:${minute}:${seconds}`;    
}
setInterval(setClock, 1000);


// 로그인 Submit
function onLoginSubmit(event){
    let userName = document.querySelector("#username").value;
    localStorage.setItem(USER_NAME, userName);
    event.preventDefault();
    setUserName(userName);
}

// 'userName'이 있는 경우 로그인 화면이 아닌 컨텐츠 화면을 바로 보여준다.
function setUserName(userName){
    login_form.classList.add(HIDDEN_CLASSNAME);
    contents.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerHTML = `${randomGreeting()} ${userName}!`;
}

// 페이지가 로드될 때마다 출력되는 랜덤 인삿말
function randomGreeting(){
    let randomIndex = Math.floor(Math.random() * greeting_arr.length);
    return greeting_arr[randomIndex];
}

// Todo 입력 Submit
function onTodoSubmit(){
    let task = document.querySelector('#input-task').value;
    task_array.push(task);
    localStorage.setItem(TASKS, JSON.stringify(task_array));
    displayTasks(task_array);
}

// 할 일 목록을 화면에 출력한다.
function displayTasks(task_array){
    let taskList = document.querySelector('#task-list');
    taskList.innerHTML = '';    // 기존 목록 비우기
    for(let i = 0; i < task_array.length; i++){
        let li = document.createElement('li');
        let delBtn = document.createElement('button');
        li.setAttribute('data-index', i);
        delBtn.innerHTML = '❌';
        delBtn.setAttribute('class', 'delBtn');
        delBtn.setAttribute('type', 'button');
        li.innerHTML = `<span>${task_array[i]}</span>`;
        li.appendChild(delBtn);
        taskList.append(li);

        // 삭제버튼 눌렀을 때
        delBtn.addEventListener('click', function(){
            // console.log(`클릭한 항목의 인덱스 : ${li.getAttribute('data-index')}`);
            let index = li.getAttribute('data-index');
            let tasks = JSON.parse(localStorage.getItem(TASKS));
            tasks.splice(index, 1);
            localStorage.setItem(TASKS, JSON.stringify(tasks));
            taskList.removeChild(li);
        });
    }
}
