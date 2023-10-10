import React, { useState, useEffect} from 'react';
import TaskForm from './TaskForm';

function ToDoList({ userId }) {
  // [] letting us know we are expecting a list of things 
  const [tasks, setTasks] = useState([]);

  // fetching to do list from back end for front end 
  const fetchData = () => {
    fetch(`http://localhost:8080/todos/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.tasks) {
          setTasks(data.tasks);
        } else {
          console.error('Error retrieving to do list: ', data.error);
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
      });
  };

  useEffect(() => {
    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div>
      <h2>Things to do... </h2>
      <TaskForm userId={userId} fetchData={fetchData}/>
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}> {task.task}</li>
        })}
      </ul>
    </div>
  );
}

export default ToDoList; 