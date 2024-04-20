
import React, {Component} from 'react'
import './App.css';
import { GeneralEdit, GeneralDisplay } from './components/General';
import { EducationEdit, EducationDisplay } from './components/Education'
import { SkillsEdit, SkillsDisplay } from './components/Skills'

class  App extends Component {
  constructor() {
    super()
    this.state = {
      isGeneralEdit: true,
      isEducationEdit: true,
      isSkillEdit: true,
      info: {},  // Initialize if expecting an object structure
      educationInputs: [],  // Initialize as an empty array if it's expected to be an array
      skills: {}  // Initialize if expecting an object structure
    };
    console.log('Initial educationInputs state:', this.state.educationInputs);
    this.handleGeneralSubmit = this.handleGeneralSubmit.bind(this)
    this.handleEducationSubmit = this.handleEducationSubmit.bind(this)
    this.handleSkillSubmit = this.handleSkillSubmit.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  handleGeneralSubmit(info) {
    this.setState( (prevState) => {
      return {
        info: {
          name: info.name,
          email: info.email,
          phone: info.phone,
          file: info.file,
          fileName: info.fileName, 
          uploadedFileURL: info.uploadedFileURL,
          errorMessage: info.errorMessage
        },
        isGeneralEdit: !prevState.isGeneralEdit
      }
    })
  }

  handleEducationSubmit(educationInputs) {
    this.setState(prevState => ({
      educationInputs,
      isEducationEdit: !prevState.isEducationEdit
    }));
  }  
  

  handleSkillSubmit(skills) {
    this.setState( (prevState) => {
      return {
        skills: {
          skillName: skills.skillName,
          skillLevel: skills.skillLevel,
          acquisitionPlace: skills.acquisitionPlace
        },
        isSkillEdit: !prevState.isSkillEdit
      }
    })
  }

  toggleEdit(valueName) {
    this.setState((prevState) => {
      let newState = {};
      newState[valueName] = !prevState[valueName];
      return newState;
    });
  }  

  render(){
    return (
      <div className="App">
        {this.state.isGeneralEdit ? 
          <GeneralEdit 
          submit={this.handleGeneralSubmit} 
          info={this.state.info}
        /> : 
          <GeneralDisplay submit={() => this.toggleEdit('isGeneralEdit')} info={this.state.info} uploadedFileURL={this.state.info.uploadedFileURL} errorMessage={this.state.info.errorMessage} fileName={this.state.info.fileName}/>
        }
        {this.state.isEducationEdit ?
          <EducationEdit submit={this.handleEducationSubmit} educationInputs={this.state.educationInputs} /> :
          <EducationDisplay submit={() => this.toggleEdit('isEducationEdit')} educationInputs={this.state.educationInputs} />
        }
        {this.state.isSkillEdit ?
          <SkillsEdit submit={this.handleSkillSubmit} skills={this.state.skills} /> :
          <SkillsDisplay submit={() => this.toggleEdit('isSkillEdit')} skills={this.state.skills} />
        }
      </div>
    )
  }
}

export default App;