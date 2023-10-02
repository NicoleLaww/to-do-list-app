import React, {useState} from 'react';

function TaskForm({ userId }) {
  const [taskData, setTaskData] = useState({
    task: '', 
    status: '', 
    priority: '', 
    dueDate: '',
    userId: userId, 
  })

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setTaskData({...taskData, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({...taskData, userId}),
      });

      if (response.ok) {
        console.log('Task created successfully');

        setTaskData({
          task: '', 
          status: '', 
          dueDate: '', 
          priority: '',
        });

        setIsFormVisible(false);
      } else {
        const data =  await response.json();
        console.log('Error creating task:', data.error);
      }
    } catch (error) {
      console.error('Error creating task: ', error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible)
  }


  return (
    <div>
      <button onClick={toggleFormVisibility}> + </button>
      {isFormVisible && (
        <div>New Task:
          <form onSubmit={handleSubmit}>
            <div>
              <label> Task:</label>
              <input
                type='text' 
                name='task'
                value={taskData.task}
                onChange={handleInputChange}
              />
          </div>
          <div> 
            <label> Status: </label>
            <input 
              type='text'
              name='status'
              value={taskData.status}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Due Date:</label>
            <input 
              type='date'
              name='dueDate'
              value={taskData.dueDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Priority</label>
            <input
              type='number'
              name='priority'
              value={taskData.priority}
              onChange={handleInputChange}
            />
          </div>
          <button type='submit'>Add</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskForm;