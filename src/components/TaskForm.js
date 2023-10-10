import React, {useState, useEffect} from 'react';



function TaskForm({ userId, fetchData }) {
  const [taskData, setTaskData] = useState({
    task: '', 
    status: '', 
    priority: '', 
    dueDate: '',
  })
  
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // console.log(userId);

  useEffect(() => {
    if (userId !== null) {
      setIsLoading(false);
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setTaskData({
      ...taskData, 
      [name]: value
    });
  }



  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
          'Cookie': document.cookie, 
        }, 
        body: JSON.stringify({
          ...taskData,
          userId: userId,
        }),
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

        console.log(document.cookie)

        // fetch the updated list of tasks and update the state 
        fetchData();
      } else {
        const data = await response.json();
        console.log('Error creating task:', data);
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
    {isLoading ? (
      <div>Loading...</div>
    ) : (
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
      )}
    </div>
  );
}

export default TaskForm;