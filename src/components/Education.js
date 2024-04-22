import React, { Component } from 'react';

// EducationEdit Component
export class EducationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // if there is at least one input in the array, map the input
      educationInputs: props.educationInputs.length > 0 ? 
        props.educationInputs.map(input => ({
          university: input.university || '',
          studyField: input.studyField || '',
          studyBeginDate: input.studyBeginDate || '',
          studyEndDate: input.studyEndDate || ''
        })) : 
        [{ // Provide a default object if props.educationInputs is empty
          university: '',
          studyField: '',
          studyBeginDate: '',
          studyEndDate: ''
        }]
    };    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddInput = this.handleAddInput.bind(this);
    this.handleDeleteInput = this.handleDeleteInput.bind(this);
  }

  handleAddInput = () => {
    this.setState({
      educationInputs: [...this.state.educationInputs, { university: '', studyField: '', studyBeginDate: '', studyEndDate: '' }]
    });
  };

  handleChange = (event, index) => {
    const { name, value } = event.target;
    const educationInputs = [...this.state.educationInputs];
    educationInputs[index][name] = value;
    this.setState({ educationInputs });
  };

  handleDeleteInput = (index) => {
    const educationInputs = [...this.state.educationInputs];
    educationInputs.splice(index, 1);
    this.setState({ educationInputs });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state);
  }

  render() {
    return (
      <div id="education-info">
        <h2>Educational Path</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            {this.state.educationInputs.map((item, index) => (
              <div key={index}>
                <button type="button" onClick={() => this.handleAddInput(index)}>Add</button>
                <button type="button" onClick={() => this.handleDeleteInput(index)}>Delete</button>
                <br />
                <label>
                  Educational Institution:
                  <input
                    type="text"
                    name="university"
                    placeholder="Example University"
                    value={item.university}
                    onChange={(event) => this.handleChange(event, index)}
                    required
                  />
                </label>
                <br />
                <label>
                  Field of Study:
                  <select
                    name="studyField"
                    value={item.studyField}
                    onChange={(event) => this.handleChange(event, index)}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="ComputerScience">Computer Science</option>
                    <option value="Biology">Biology</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Business">Business Administration</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Law">Law</option>
                    <option value="Education">Education</option>
                  </select>
                </label>
                <br />
                <label>
                  Study Begin:
                  <input
                    type="date"
                    name="studyBeginDate"
                    value={item.studyBeginDate}
                    onChange={(event) => this.handleChange(event, index)}
                  />
                </label>
                <br />
                <label>
                  Study End:
                  <input
                    type="date"
                    name="studyEndDate"
                    value={item.studyEndDate}
                    onChange={(event) => this.handleChange(event, index)}
                  />
                </label>
                <br />
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// EducationDisplay Component
export function EducationDisplay({ educationInputs, submit }) {

  // array is under a property called "education inputs"
  return (
    <div id='education-edit-div'>
      {educationInputs.educationInputs.map((education, index) => (
        <div key={index}>
          <p><b>Educational Institution:</b> {education.university}</p>
          <p><b>Field of Study:</b> {education.studyField}</p>
          <p><b>Begin of Study:</b> {education.studyBeginDate}</p>
          <p><b>End of Study:</b> {education.studyEndDate}</p>
        </div>
      ))}
      <button type="submit" onClick={submit}>Edit</button>
    </div>
  );  
}

//figure out why the object array structure is nested
// information should be saved when going back to edit mode