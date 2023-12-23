
const params = window.location.search;
const currID=new URLSearchParams(params).get('id');
console.log(currID);


const deleteBtn=document.querySelector('.delete');
const updateBtn=document.querySelector('.update')

const container=document.querySelector('.container');
const name=document.querySelector('.name');
const isCompleted=document.querySelector('.isCompleted');


//geting single task___________________________

const singleTask=async()=>{
    try {
        const currTaskRaw=await axios.get(`api/v1/tasks/${currID}`);
        currTask=currTaskRaw.data.task;
        console.log(currTask)
        name.setAttribute('value',`${currTask.name}`);
        if(currTask.completed===true)
        {
           isCompleted.checked=true;
        }
    } catch (error) {
        console.log(error);
    }
}

singleTask()


//deleting the task
deleteBtn.addEventListener('dblclick',async()=>{

    try {
        await axios.delete(`/api/v1/tasks/${currID}`);
        console.log('hello')
    window.location.href="index.html"
    } catch (error) {
        console.log(error)
    }

})




// updating the task
updateBtn.addEventListener('click',async()=>{
    
    const temp=name.value;
    try {

        await axios.patch(`api/v1/tasks/${currID}`,{name:temp,completed:isCompleted.checked})
        console.log(isCompleted.checked)
        alert('updated')
        setTimeout(back,1000);

    } catch (error) {
        console.log(error)
    }
})

back=()=>{
    window.location.href="index.html"
}