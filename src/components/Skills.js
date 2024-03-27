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
                    value={this.state.skillName}
                    onChange={this.handleChange} />
            </label>
            <br />
            <label>
                Skill Level:
                <input
                    type="text"
                    name="skillLevel"
                    value={this.state.email}
                    onChange={this.handleChange} />
            </label>
            <br />
            <label>
                Place of Skill Acquisition:
                <input
                    type="text"
                    name="acquisionPlace"
                    value={this.state.acquisitionPlace}
                    onChange={this.handleChange} />
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
      <div>
        <p>Skill Name: {skills?.skillName}</p>
        <p>Skill Level: {skills?.skillLevel}</p>
        <p>Acquisition Place: {skills?.acquisitionPlace}</p>
        <button onClick={submit}>Edit</button>
      </div>
    );
  }  