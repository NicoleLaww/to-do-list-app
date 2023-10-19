import React, { useState, useEffect} from 'react';
import TaskForm from './TaskForm';
import EditTaskForm from './EditTaskForm';

function ToDoList({ userId, tasks, updateTasks }) {
  // [] letting us know we are expecting a list of things 

  const [editTask, setEditTask] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // console.log(userId);

  // fetching to do list from back end for front end 
  const fetchData = () => {

    // setTasks to empty array when no userId is found/aka logged out
    if (!userId) {
      updateTasks([]);
      return;
    }

    fetch(`http://localhost:8080/todos/${userId}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json', 
      },
      credentials: 'include',
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.tasks) {
          updateTasks(data.tasks);
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


  function handleEdit(taskId) {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTask(taskToEdit);
    setShowEditForm(true);
  };

  // update task 
  const handleUpdateTask = async(updatedTask) => {
    const taskId = updatedTask.id;
    try {
      const response = await fetch (`http://localhost:8080/todos/${taskId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json', 
        },
        credentials: 'include', 
        body: JSON.stringify({
          ...updatedTask,
        })
      });

      if(response.ok) {

        setShowEditForm(false);
        fetchData();
      } else {
        console.log('Error editing task.')
      }

    } catch(err) {
      console.log(err);
    }

  }

  // cancel edit 
  const handleCancelTask = () => {
    setShowEditForm(false);
  };

  // delete
  const handleDelete = async(taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${taskId}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error('Error deleting task.')
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Things to do... </h2>
      <TaskForm userId={userId} fetchData={fetchData}/>
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}> 
                    Task: {task.task} <br/>
                    Status: {task.status} <br/>
                    Due Date: {task.due_date} <br/>
                    Priority: {task.priority} <br/>
                    <button type='submit' onClick={() => handleEdit(task.id)}>Edit</button>
                    <button type='submit' onClick={() => handleDelete(task.id)}>Delete</button>
                  </li>

        })}
      </ul>
      {showEditForm && editTask && (
        <EditTaskForm
          taskId = {editTask.id}
          editTask = {editTask}
          onUpdate = {handleUpdateTask}
          onCancel = {handleCancelTask}
        />
      )}
    </div>
  );
}

export default ToDoList; 