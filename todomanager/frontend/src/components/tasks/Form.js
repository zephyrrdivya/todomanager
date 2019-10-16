import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTask, getTask, updateTask } from "../../actions/tasks";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || "",
      content: this.props.content || "",
      deadline_date: this.props.deadline_date || new Date().toISOString().slice(0, 10),
      action: this.props.action || "Add"
    };
  }


  static propTypes = {
    addTask: PropTypes.func.isRequired,
    getTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { title, content, deadline_date, action } = this.state;
    const task = { title, content, deadline_date };
    // console.log(task);
    if (action === "Add") {
      this.props.addTask(task);
    }
    else if (action === "Update") {
      this.props.updateTask(task);
    }
    this.setState({
      title: "",
      content: "",
      deadline_date: new Date().toISOString().slice(0, 10),
      action: "Add"
    });
  };

  render() {
    const { title, content, deadline_date, action } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Task</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              onChange={this.onChange}
              value={title}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              className="form-control"
              type="text"
              name="content"
              onChange={this.onChange}
              value={content}
            />
          </div>
          <div className="form-group">
            <label>Deadline Date</label>
            <input
              className="form-control"
              type="date"
              name="deadline_date"
              onChange={this.onChange}
              value={deadline_date}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              {action} Task
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addTask, getTask, updateTask }
)(Form);
