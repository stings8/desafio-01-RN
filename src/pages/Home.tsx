import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle === '') return;
    setTasks( prevState => [
      ...prevState, 
      {  id: new Date().getTime(), 
        title: newTaskTitle, 
        done: false }
    ]);
  }

  function handleMarkTaskAsDone(id: number) {
    const tasksUpdated = tasks.map(task => task.id === id ? 
      { ...task, done: !task.done } : { ...task });
    setTasks(tasksUpdated);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}