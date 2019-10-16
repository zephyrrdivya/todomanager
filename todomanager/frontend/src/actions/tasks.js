import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_TASKS, GET_TASK, DELETE_TASK, ADD_TASK, UPDATE_TASK, COMPLETE_TASK } from "./types";

// GET TASKS
export const getTasks = () => (dispatch, getState) => {
  axios
    .get("/api/tasks/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TASKS,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE TASK
export const deleteTask = id => (dispatch, getState) => {
  axios
    .delete(`/api/tasks/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteTask: "Task Deleted" }));
      dispatch({
        type: DELETE_TASK,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// COMPLETE TASK
export const completeTask = task => (dispatch, getState) => {
  task.isCompleted = true;
  axios
    .put(`/api/tasks/${task.id}/`, task, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ completeTask: "Task Completed" }));
      dispatch({
        type: COMPLETE_TASK,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// UPDATE TASK
export const getTask = task => (dispatch, getState) => {
  axios
    .get(`/api/tasks/${task.id}/`, tokenConfig(getState))
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_TASK,
        payload: res.data
      });
    })
    .catch(err => console.log(err));

};

// ADD TASK
export const addTask = task => (dispatch, getState) => {
  axios
    .post("/api/tasks/", task, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addTask: "Task Added" }));
      dispatch({
        type: ADD_TASK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// export default task;
// Update TASK
export const updateTask = task => (dispatch, getState) => {
  axios
    .put(`/api/tasks/${task.id}/`, task, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ completeTask: "Task Updated" }));
      dispatch({
        type: UPDATE_TASK,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};