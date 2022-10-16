import React, { useState, useEffect } from "react";
import { LEVELS } from "../../models/levels.enum";
import { Task } from "../../models/task.class";
import TaskForm from "../pure/forms/TaskForm";
import TaskComponent from "../pure/TaskComponent";

const TaskList = () => {
  const defaultTask1 = new Task(
    "Example1",
    "Description1 ",
    false,
    LEVELS.NORMAL
  );
  const defaultTask2 = new Task(
    "Example2",
    "Description2",
    true,
    LEVELS.URGENT
  );
  const defaultTask3 = new Task(
    "Example3",
    "Description3",
    false,
    LEVELS.BLOCKING
  );
  const [tasks, setTasks] = useState([
    defaultTask1,
    defaultTask2,
    defaultTask3,
  ]);
  const [loading, setLoading] = useState(true);

  //control del ciclo de vida del componente

  useEffect(() => {
    console.log("task has been modified");
    setLoading(false);
    return () => {
      //cuando desaparezca el componente
      console.log("taskList component is going to unmount....");
    };
  }, [tasks]);

  function completeTask(task) {
    console.log("complete this task", task);
    //buscamos el indice para saber cuan es la tarea que estamos modificando
    const index = tasks.indexOf(task);
    //guardamos todas las task en una variable temporal
    const tempTasks = [...tasks];
    tempTasks[index].completed = !tempTasks[index].completed;
    //actualizamos el estado del componente con setTasks actualizando la nueva lista iterable que esta modificada y guardada en la variable temporal tempTasks
    setTasks(tempTasks);
  }
  function removeTask(task) {
    console.log("delete this task:", task);
    //averiguamos el index
    const index = tasks.indexOf(task);
    //variable temporal con las tasks
    const tempTasks = [...tasks];
    //buscamos en esa nueva iteracion el index q es la tarea q queremos borrar y con splice la eliminamos del array
    tempTasks.splice(index, 1);
    setTasks(tempTasks);
  }
  function addTask(task) {
    console.log("add task");
    const index = tasks.indexOf(task);
    const tempTask = [...tasks];
    tempTask.push(task);
    setTasks(tempTask);
  }

  return (
    <div className="col-12">
      {/*  ocupará12 columnas bootstrap, el ancho de la pantalla */}
      <div className="card">
        <div className="card-header p-3">
          {/* p3 es el padding */}
          <h5>Your Task</h5>
        </div>
        <div
          className="card-body"
          data-mdb-perfect-scrollbar="true"
          style={{ position: "relative", height: "400px" }}
        >
          <table>
            <thead>
              {" "}
              <tr>
                <th scope="col">title</th>
                <th scope="col">description</th>
                <th scope="col">Priority</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((item, index) => {
                return (
                  <TaskComponent
                    key={index}
                    task={item}
                    complete={completeTask}
                    remove={removeTask}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <TaskForm add={addTask}></TaskForm>
      </div>
    </div>
  );
};

export default TaskList;
