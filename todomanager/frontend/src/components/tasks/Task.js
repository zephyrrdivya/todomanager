import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTasks, getTask, deleteTask, completeTask, updateTask } from "../../actions/tasks";

export class Tasks extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    getTasks: PropTypes.func.isRequired,
    getTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    completeTask: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    return (
      <Fragment>
        <h2>Tasks</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>DeadlineDate</th>
              <th />
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.content}</td>
                <td>{task.deadline_date}</td>
                <td>
                  <button
                    onClick={this.props.deleteTask.bind(this, task.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={this.props.getTask.bind(this, task)}
                    className="btn btn-warning btn-sm"
                  >
                    {" "}
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={this.props.completeTask.bind(this, task)}
                    className={`btn btn-${task.isCompleted ? '' : 'outline-'}primary btn-sm`}
                    disabled={task.isCompleted}
                  >
                    {" "}
                    Complete{task.isCompleted ? 'd' : ''}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
});

export default connect(
  mapStateToProps,
  { getTasks, getTask, deleteTask, updateTask, completeTask }
)(Tasks);
