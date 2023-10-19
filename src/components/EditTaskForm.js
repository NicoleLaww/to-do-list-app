import React, {useState} from 'react';

function EditTaskForm({taskId, editTask, onUpdate, onCancel}) {

const [editedTask, setEditedTask] = useState({...editTask});


const handleInputChange = (e) => {
  const {name, value} = e.target;

  setEditedTask({
    ...editedTask, 
    [name]: value
  });
}

  return (
    <div>
      <h3>Edit Task</h3>
          <form onSubmit={(e)=> {
           e.preventDefault();

           const updatedTask = {...editedTask, id: taskId}
           onUpdate(updatedTask);
          }}
          >
            <div>
              <label> Edit Task:</label>
                <input
                  type='text' 
                  name='task'
                  value={editedTask.task}
                  onChange={handleInputChange}
                />
            </div>
            <div> 
              <label> Edit Status: </label>
              <input 
                type='text'
                name='status'
                value={editedTask.status}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Edit Due Date:</label>
              <input 
                type='date'
                name='dueDate'
                value={editedTask.dueDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Edit Priority</label>
              <input
                type='number'
                name='priority'
                value={editedTask.priority}
                onChange={handleInputChange}
              />
            </div>
            <button type='submit'>Update</button>
            <button type='button' onClick={onCancel}>Cancel</button>
            </form>

    </div>
  )
}

export default EditTaskForm;