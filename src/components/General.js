import React, { Component } from 'react';
import axios from 'axios';

// GeneralEdit Component
export class GeneralEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.info?.name || '',
      email: props.info?.email || '',
      phone: props.info?.phone || '',
      file: null,
      uploadedFileURL: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

// Adjust handleChange to properly handle file inputs
handleChange(event) {
  const { name, type, value, files } = event.target;
  this.setState({
    [name]: type === 'file' ? (files[0] || '') : value,
  });
}

handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData();
  if (this.state.file) {
    formData.append('file', this.state.file);
    formData.append('fileName', this.state.file.name);

axios.post('http://localhost:3001/uploadFile', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}).then((response) => {
  this.setState({ uploadedFileURL: response.data.fileUrl }, () => {
    console.log("Uploaded File URL:", this.state.uploadedFileURL); 
    // Response.data.fileUrl contains the URL for the uploaded file
    this.props.onFileUploadSuccess(response.data.fileUrl);
  });
}).catch(error => {
  console.error('Error uploading the file', error);
});
  } else {
    // Handle other types of submissions, e.g., text inputs
    this.props.submit(this.state);
  }
}

  render() {
    return (
        <div id = "general-info">
    <h2>General info</h2><form onSubmit={this.handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange} />
            </label>
            <br />
            <label>
                Phone:
                <input
                    type="tel"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.handleChange} />
            </label>
            <br />
            <label>
                Picture:
                <input
                    type="file"
                    name="file"
                    onChange={this.handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
  }
}

// GeneralDisplay Component
export function GeneralDisplay({ info, submit, uploadedFileURL }) {
  console.log("Hello world")
  console.log(uploadedFileURL);
  console.log(info.name);
  return (
    <div>
      <p>Name: {info?.name}</p>
      <p>Email: {info?.email}</p>
      <p>Phone: {info?.phone}</p>
      <p>Image:</p>
      <img src={uploadedFileURL} alt="Uploaded"/>
      <button onClick={submit}>Edit</button>
    </div>
  );
}
