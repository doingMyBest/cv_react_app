import React, { Component } from 'react';

// EducationEdit Component
export class EducationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      university: props.education?.university || '',
      studyField: props.education?.studyField || '',
      studyBeginDate: props.education?.studyBeginDate || '',
      studyEndDate: props.education?.studyEndDate || ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state);
  }

  render() {
    return (
        <div id = "education-info">
    <h2>Educational Path</h2>
    <form onSubmit={this.handleSubmit}>
            <label>
                Educational Insitution:
                <input
                    type="text"
                    name="university"
                    value={this.state.university}
                    onChange={this.handleChange} />
            </label>
            <br />
            <label>
                Field of Study:
                <input
                    type="text"
                    name="studyField"
                    value={this.state.studyField}
                    onChange={this.handleChange} />
            </label>
            <br />
            <label>
                Study Begin:
                <input
                    type="date"
                    name="studyBeginDate"
                    value={this.state.studyBeginDate}
                    onChange={this.handleChange} />
            </label>
            <br />
            <label>
                Study End:
                <input
                    type="date"
                    name="studyEndDate"
                    value={this.state.studyEndDate}
                    onChange={this.handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
  }
}

// EducationDisplay Component
// Change the prop name from info to education
export function EducationDisplay({ education, submit }) {
  return (
    <div>
      <p>Educational Institution: {education?.university}</p>
      <p>Field of Study: {education?.studyField}</p>
      <p>Begin of Study: {education?.studyBeginDate}</p>
      <p>End of Study: {education?.studyEndDate}</p>
      <button onClick={submit}>Edit</button>
    </div>
  );
}