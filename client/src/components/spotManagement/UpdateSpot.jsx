import React from 'react';
import Button from '../shared/button/button.jsx';
import './spotManagement.css';
import TxtBox from '../shared/txtBox/TxtBox.jsx';
import axios from 'axios';
// no page header

class UpdateSpot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      type: '',
      price: '',
      photo: '',
      spot_id: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.setPhotoUrl = this.setPhotoUrl.bind(this);
    this.sendFile = this.sendFile.bind(this);

  }

  componentDidMount() {
    axios.get(`http://localhost:3000/spot-details?id=${this.props.id}`)
      .then((results) => {
        console.log(results);
        let data = results.data[0];
        this.setState({
          address: data.address,
          type: data.type,
          price: data.price,
          photo: data.photo_url || '',
          spotId: this.props.id
        })
      })
  }

  handleSaveClick() {
    // update spot to server/db
    let options = this.state;
    console.log(options);
    axios.put('http://localhost:3000/update-spot-details', options)
      .then( async () => {
        console.log('success updating');
        await this.setState({
          address: '',
          type: '',
          price: '',
          photo: ''
        });
        return;
      })
      .then(() => {
        this.props.resetHomePage();
      })
      .catch((err) => {
        console.log('error updating', err);
      })

  }

  handleChange() {
    this.setState({
      [event.target.id]: event.target.value,
    }, () => console.log('edit spot state', this.state));
  }

  setPhotoUrl(url) {
    this.setState({
        photo: url
    });
  }

  sendFile() {
    let formData = new FormData();
    formData.append('spotImage', event.target.files[0]);
    console.log('value', event.target.files[0]);
    console.log('formData', formData.get('spotImage'));
    // send to server, add to s3
    axios.post(`http://localhost:3000/uploadImage`, formData)
      .then((results) => {
        // upon success response, get the photo url from s3 and add it to state
        let url = results.data;
        console.log('photo post results', url);
        this.setPhotoUrl(url);
      })
      .catch((err) => {
        console.log('photo error upload');
      })
  }


  render() {

    return (
      <div className='add-spot-home'>

       <div className='add-spot-form'>
          <div style={{backgroundImage: `url("${this.state.photo}")`, backgroundSize: 'cover'}}className='add-spot-photo'>
            <label for='file' style={{color: 'white'}} className='photo-upload'>Edit Photo</label>
            <input type="file" id='file' className='photo-input' accept='image/png, image/jpeg' onChange={this.sendFile}></input>
          </div>

          {/* address maybe should be static */}
          <label>Address</label>
          <input type="text" id="address" value={this.state.address} className='txtBoxInput' onChange={this.handleChange} disabled></input>
          <label>Type</label>
          {/* make select default value match this.props.type initially */}
          <select value={this.state.type} className='txtBoxInput add-spot-select' id='type' onChange={this.handleChange}>
            <option value='driveway'>Driveway</option>
            <option value='garage'>Garage</option>
            <option value='carport'>Carport</option>
            <option value='indoor'>Indoor</option>
            <option value='outdoor'>Outdoor</option>
          </select>
          <label>Price</label>
          <input type='text' id='price' value={this.state.price} className='txtBoxInput' onChange={this.handleChange}></input>
      </div>

      <div className='button-container'>
        <Button func={this.handleSaveClick} text={'Save'} />
      </div>

    </div>
    )

  }
}

export default UpdateSpot;