import { GET_TASKS, GET_TASK, DELETE_TASK, ADD_TASK, CLEAR_TASKS, COMPLETE_TASK } from "../actions/types.js";

const initialState = {
  tasks: [],
  task: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case GET_TASK:
      return {
        ...state,
        task: action.payload
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case COMPLETE_TASK:
      state.tasks.find(task => task.id === action.payload.id).isCompleted = true;

      // console.log(state.tasks);

      return {
        ...state,
        tasks: [...state.tasks]
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case CLEAR_TASKS:
      return {
        ...state,
        tasks: []
      };
    default:
      return state;
  }
}
