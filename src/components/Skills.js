import React, { Component } from 'react';

// SkillEdit Component
export class SkillsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsInputs: this.initializeSkillsInput(props.skillsInputs || [])
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddInput = this.handleAddInput.bind(this);
    this.handleDeleteInput = this.handleDeleteInput.bind(this);
  }

  initializeSkillsInput(inputs) {
    return inputs.length > 0 ? 
      inputs.map(input => ({
        skillName: input.skillName || '',
        skillLevel: input.skillLevel || '',
        acquisitionPlace: input.acquisitionPlace || ''
      })) : 
      [{
        skillName: '',
        skillLevel: '',
        acquisitionPlace: ''
      }];
  }

  handleAddInput = () => {
    this.setState({
      skillsInputs: [...this.state.skillsInputs, { skillName: '', skillLevel: '', acquisitionPlace: ''}]
    });
  };

  handleChange = (event, index) => {
    const { name, value } = event.target;
    const skillsInputs = [...this.state.skillsInputs];
    skillsInputs[index][name] = value;
    this.setState({ skillsInputs });
  };

  handleDeleteInput = (index) => {
    const skillsInputs = [...this.state.skillsInputs];
    skillsInputs.splice(index, 1);
    this.setState({ skillsInputs });
  };


  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state.skillsInputs);
  }

  render() {
    return (
        <div id = "skills-info">
    <h2>Skills</h2>
    <form onSubmit={this.handleSubmit}>
    <div className="container">
    {this.state.skillsInputs.map((item, index) => (
              <div key={index}>
                <div id="skills-button-div">
                <button type="button" onClick={() => this.handleAddInput(index)}>+</button>
                <button type="button" onClick={() => this.handleDeleteInput(index)}>-</button>
                </div>
            <label>
                Skill Name:
                <input
                    type="text"
                    name="skillName"
                    placeholder="Example Language"
                    value={item.skillName}
                    onChange={(event) => this.handleChange(event, index)}
                    required
                    />
            </label>
            <br />
            <label>
                Skill Level:
                <select
                    name="skillLevel"
                    value={item.skillLevel}
                    onChange={(event) => this.handleChange(event, index)}
                    required
                    >
                       <option value="">Select Skill Level</option>
                          <option value="Beginer">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
            </label>
            <br />
            <label>
                Place of Skill Acquisition:
                <input
                    type="text"
                    name="acquisitionPlace"
                    placeholder="Example School"
                    value={item.acquisitionPlace}
                    onChange={(event) => this.handleChange(event, index)}
                    required 
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

// skillDisplay Component
export function SkillsDisplay({ skillsInputs, submit }) {
    return (
      <div id='skills-edit-div'>
        {skillsInputs.map((skill, index) => (
        <div key={index}>
        <br></br>
        <p><b>Skill Name:</b> {skill.skillName}</p>
        <p><b>Skill Level:</b> {skill.skillLevel}</p>
        <p><b>Acquisition Place:</b> {skill.acquisitionPlace}</p>
        </div>
        ))}
        <button type="submit" onClick={submit}>Edit</button>
      </div>
    );
  }