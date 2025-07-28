// 1) adding task

//selecting the DOM elements
const form= document.getElementById('todo-form');
const input= document.getElementById('todo-input');
const list= document.getElementById('todo-list');

//now handle when the user types and click "add"

form.addEventListener('submit',function(event){
    event.preventDefault(); // stop the page from refreshing
    const taskText = input.value.trim(); //get and clean the input
    if (taskText!=='') {
        addTask(taskText); //call our fnc to add the task
        input.value=''; //clear the input box
    }
    console.log(taskText)
})

// creating add task function
//create an <li>
//add a delete button
//append it to the list

function addTask(taskText) {
    const li = document.createElement('li'); // creates a new list item
    li.textContent=taskText ; //set its text
//add click to toggle complete

li.addEventListener('click',()=>{
    li.classList.toggle('completed');
    saveTasks(); //save the updated status
    //console.log(li)
});

//create a delete buttton

const deleteBtn = document.createElement('button');
deleteBtn.textContent='DELETE';

deleteBtn.addEventListener('click',(e)=>{
    e.stopPropagation(); //stop li click from firing
    li.remove(); //remove the task
    saveTasks(); //save changes
});
li.appendChild(deleteBtn); //add delete button to the li
list.appendChild(li); //add the li to the ul

saveTasks(); //save to the local storage
    
}

//save tasks to the local storage

function saveTasks() {
    const tasks =[];
    list.querySelectorAll('li').forEach(li=>{
        tasks.push({
            text:li.firstChild.textContent.trim(),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
    
}

//load functions when page loads

function loadTasks() {
    const data = localStorage.getItem('tasks')
    if(data){
        const tasks = JSON.parse(data);
        tasks.forEach(task=>{
            addTask(task.text);
            if(task.completed){
                list.lastChild.classList.add('completed');
            }
        })
    }
}
loadTasks(); //load saved tasks on page load