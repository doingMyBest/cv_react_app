
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
      info: {},  // object structure
      educationInputs: [],  // array structure
      skillsInputs: []  // array structure
    };
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
    this.setState( (prevState) => {
      return {
      educationInputs,
      isEducationEdit: !prevState.isEducationEdit
    }
  })
}  
  
handleSkillSubmit(skillsInputs) {
  this.setState( (prevState) => {
    return {
    skillsInputs,
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
      <div id="cv-wrapper">
        <div className="App">
          <h1>CV React App</h1>
          <br></br>
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
            <SkillsEdit submit={this.handleSkillSubmit} skillsInputs={this.state.skillsInputs} /> :
            <SkillsDisplay submit={() => this.toggleEdit('isSkillEdit')} skillsInputs={this.state.skillsInputs} />
          }
        </div>
      </div>
    )
  }  
}

export default App;