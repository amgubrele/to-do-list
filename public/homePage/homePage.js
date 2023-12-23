const formDOM=document.querySelector('#formData');
const task=document.querySelector('#task');
const container2=document.querySelector('.container2');
const taskDel=document.querySelector('.taskDel');
const signal=document.querySelector('.circle')
//form creating task
formDOM.addEventListener('submit', async (e) => {
    const name=task.value;
     console.log(name);
    try {
      await axios.post('/api/v1/tasks',{name});
      console.log(name);
      // displayingAllTasks();
    }catch (error) {
      console.log(error);
    }
   
  })

//deleting element_________________________________________

const deleteTask=async(e)=>{
   
  console.log(e.id);
  ele=document.getElementById(e.id);
   _ID=ele.getAttribute("id");

  try {
    await axios.delete(`api/v1/tasks/${_ID}`);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}




//displyaing all tasks_____________________________________
const displayingAllTasks=async(e)=>{
  try {
    allTasks=await axios.get('api/v1/tasks');
    tasksArray=allTasks.data.tasks;
    console.log(allTasks.data.tasks)
    console.log(tasksArray[0].name);

    
      for(i=0;i<tasksArray.length;++i)
      {
        var color="red";
        console.log(tasksArray[0].name)
        if(tasksArray[i].completed===true)
        {
          color="green";
        }
    container2.innerHTML+=`<div class="list"><p>${tasksArray[i].name}</p> <div><a href="single.html?id=${tasksArray[i]._id}"><i class="fa-solid fa-arrow-up-right-from-square"></i></a><button id="${tasksArray[i]._id}" class="taskDel" ondblclick="deleteTask(this)">Delete</button><div class="circle" style="background-color:${color}"></div></div></div>`
      }
      
      
    

  } catch (error) {
    console.log(error);
  }

}
displayingAllTasks();

//updating the tasks in front
