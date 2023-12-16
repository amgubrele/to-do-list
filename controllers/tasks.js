const Task=require('../models/task.js')


const getAllTasks=async(req,res)=>{
    try{
        const tasks=await Task.find({});
        res.status(200).json({tasks:tasks})

    }
    catch(error){
        res.status(500).json({msg:error})
    }
    
}


const createTask = async (req, res) => {
      try{
        //task.create is to create an elemnt in the data base with data req.body
      const task = await Task.create(req.body);  
      res.status(201).json({ task });
      }
      catch(error)
      {
        console.log(err);
        res.status(500).json({msg:error})
      }
  };

const getTask=async(req,res)=>{
    try{
        const {id:taskID}=req.params;
        const task=await Task.findOne({_id:taskID});
        if(!task)
        {
            return res.status(404).json({msg:`No task with id ${taskID}.`})
        }
        res.status(200).json({task});
    }
    catch(error){
        s.status(500).json({msg:error})
    }
}

const updateTask=async(req,res)=>{
    try {
        const {id:taskID}=req.params;
        const task=await Task.findByIdAndUpdate({_id:taskID},req.body,
            {new:true,runValidators:true})  //so the upsated also follow the scehma lke 20 max char and not empot;y
            
        if(!task)
        {
            return res.status(404).json({msg:`No task with id ${taskID}.`})
        }
        res.status(200).json({task})
    } catch (error) {
        s.status(500).json({msg:error})
        
    }
}

const deleteTask=async(req,res)=>{
    try {
        const {id:taskID}=req.params;
        const task=await Task.findOneAndDelete({_id:taskID});
        if(!task)
        {
            return res.status(404).json({msg:`No task with id ${taskID}.`})
        }
        res.status(200).json({task})
    } catch (error) {
        s.status(500).json({msg:error})
    }
}


module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}