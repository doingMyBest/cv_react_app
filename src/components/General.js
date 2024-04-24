import React, { Component } from 'react';

// GeneralEdit Component
export class GeneralEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.info?.name || '',
      email: props.info?.email || '',
      phone: props.info?.phone || '',
      fileName: props.file?.name || '',
      file: props.file || null,
      uploadedFileURL: null,
      errorMessage: props.errorMessage || ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

// Adjust handleChange to properly handle file inputs
handleChange(event) {
  const { name, type, files } = event.target;

  if (type === 'file') {
    const file = files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        this.setState({
          file: file,
          fileName: file.name,
          uploadedFileURL: loadEvent.target.result,
          errorMessage: ''
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        fileName: '',
        uploadedFileURL: null,
        errorMessage: 'Please select a PNG or JPEG file.'
      });
    }
  } else {
    this.setState({
      [name]: event.target.value,
    });
  }
}


handleSubmit(event) {
  this.props.submit(this.state);
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
                    placeholder="Jane Doe"
                    value={this.state.name}
                    onChange={this.handleChange} 
                    required
                    />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    placeholder="jane.doe@example.com"
                    value={this.state.email}
                    onChange={this.handleChange} 
                    required
                    />
            </label>
            <br />
            <label>
                Phone:
                <input
                type="tel"
                pattern="[0-9]{6,}" 
                placeholder="0152 28817386"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                required
              />

            </label>
            <br />
            Image:
            <br />
            <label for="file-upload" class="custom-file-upload">
              <div id="browse">Browse...</div>
            <input
             id="file-upload" 
             type="file" 
             name="file" 
             onChange={this.handleChange} 
            />
            </label>
          {this.state.fileName && <span>File: {this.state.fileName}</span>}
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
  }
}

// GeneralDisplay Component
export function GeneralDisplay({ info, submit, uploadedFileURL, errorMessage, fileName }) {
  return (
    <div id='general-info-edit-div'>
      <p><b>Name:</b> {info?.name}</p>
      <p><b>Email:</b> {info?.email}</p>
      <p><b>Phone:</b> {info?.phone}</p>
      <p><b>Image:</b></p>
      <p>{errorMessage}<img src={uploadedFileURL} width={100} alt=""/></p>
      {fileName && <span>File: {fileName}</span>}
      <br></br>
      <button type="submit" onClick={submit}>Edit</button>
    </div>
  );
}
