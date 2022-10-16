import React from "react";
import PropTypes from "prop-types";
import { Task } from "../../models/task.class";
import { useEffect } from "react";
import "../../styles/task.scss";
import { LEVELS } from "../../models/levels.enum";

const TaskComponent = ({ task, complete, remove }) => {
  useEffect(() => {
    console.log("created task");
    return () => {
      console.log(`task: ${task.name} is going to unmount`);
    };
  }, [task]);

  /* function that return incon depending on task is completed or not */
  function taskIconCompleted() {
    if (task.completed) {
      return (
        <i
          className="bi bi-toggle-on task-action "
          style={{ color: "green" }}
          onClick={() => {
            complete(task);
          }}
        ></i>
      );
    } else {
      return (
        <i
          className="bi bi-toggle-off task-action "
          style={{ color: "grey" }}
          onClick={() => {
            complete(task);
          }}
        ></i>
      );
    }
  }

  /* function that return a badge depending on the level of the task */
  function taskLevelBadge() {
    switch (task.level) {
      case LEVELS.NORMAL:
        return (
          <h6 className="mb-0">
            <span className="badge bg-primary">{task.level}</span>
          </h6>
        );
      case LEVELS.URGENT:
        return (
          <h6 className="mb-0">
            <span className="badge bg-warning">{task.level}</span>
          </h6>
        );
      case LEVELS.BLOCKING:
        return (
          <h6 className="mb-0">
            <span className="badge bg-danger">{task.level}</span>
          </h6>
        );
      default:
        break;
    }
  }

  return (
    <tr className="fw-normal">
      <th>
        <spam className="ms-2">{task.name}</spam>
      </th>
      <td>
        <span className="align-middle">{task.description}</span>
      </td>
      <td>
        <span className="align-middle">{taskLevelBadge()}</span>
      </td>
      <td>
        <span className="align-middle">
          {taskIconCompleted()}
          <i
            class="bi bi-trash3 task-action"
            style={{ color: "tomato", fontSize: "20px" }}
            onClick={() => {
              remove(task);
            }}
          ></i>
        </span>
      </td>
    </tr>
    /*   <div>
      <h2 className="task-name">Nombre: {task.name}</h2>
      <h3>Descripción:{task.description}</h3>
      <h4>Nivel: {task.level}</h4>
      <h5>Estado: {task.completed ? "COMPLETADA" : "PENDIENTE"}</h5>
    </div> */
  );
};

TaskComponent.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
  complete: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default TaskComponent;
