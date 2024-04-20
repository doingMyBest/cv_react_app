import React, { Component } from 'react';

// SkillEdit Component
export class SkillsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillName: props.skills?.skillName || '',
      skillLevel: props.skills?.skillLevel || '',
      acquisitionPlace: props.skills?.acquisitionPlace || '',
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
        <div id = "skills-info">
    <h2>Skills</h2><form onSubmit={this.handleSubmit}>
            <label>
                Skill Name:
                <input
                    type="text"
                    name="skillName"
                    placeholder="French"
                    value={this.state.skillName}
                    onChange={this.handleChange} 
                    required
                    />
            </label>
            <br />
            <label>
                Skill Level:
                <select
                    name="skillLevel"
                    value={this.state.skillLevel}
                    onChange={this.handleChange}
                    >
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
                    value={this.state.acquisitionPlace}
                    onChange={this.handleChange}
                    required 
                    />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
  }
}

// Change the prop name from info to skills
export function SkillsDisplay({ skills, submit }) {
    return (
      <div id='skills-edit-div'>
        <p><b>Skill Name:</b> {skills?.skillName}</p>
        <p><b>Skill Level:</b> {skills?.skillLevel}</p>
        <p><b>Acquisition Place:</b> {skills?.acquisitionPlace}</p>
        <br></br>
        <button type="submit" onClick={submit}>Edit</button>
      </div>
    );
  }  

  //implement add and delete buttons