import React, { useState, useEffect} from 'react';
import TaskForm from './TaskForm';

function ToDoList({ userId }) {
  // [] letting us know we are expecting a list of things 
  const [tasks, setTasks] = useState([]);

useEffect(() => {
  fetch(`http://localhost:8080/todos/${userId}`)
  .then((response) => response.json())
  .then((data) => {
   if (data.tasks) {
    setTasks(data.tasks);
   } else {
    console.error('Error retrieving to do list: ', data.error);
   }
  })
   .catch((error) => {
    console.error('Error', error);
  });
}, [userId]);

  return (
    <div>
      <h2>Things to do... </h2>
      <TaskForm userId={userId}/>
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}> {task.task}</li>
        })}
      </ul>
    </div>
  );
}

export default ToDoList; 