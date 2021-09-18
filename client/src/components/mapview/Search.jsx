import React from 'react';
import Geocode from "react-geocode";
import TxtBox from '../shared/txtBox/TxtBox.jsx';
import Picker from '../shared/Picker.jsx';
import Button from '../shared/button/button.jsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generateTimes, convertToUNIXTime } from './helpers.js';
Geocode.setApiKey(process.env.GOOGLE_API);

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      startTime: '', // TODO implement a default value - the nearest hour
      endTime: '', // TODO implement a default value - nearest hour + 1
      startDate: new Date(),
      endDate: new Date(),
    };
    this.handleAddressInput = this.handleAddressInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleStartTimeSelect = this.handleStartTimeSelect.bind(this);
    this.handleEndTimeSelect = this.handleEndTimeSelect.bind(this);
<<<<<<< HEAD
    console.log(process.env.GOOGLE_API)
=======
    this.handleStartDateSelect = this.handleStartDateSelect.bind(this);
    this.handleEndDateSelect = this.handleEndDateSelect.bind(this);
>>>>>>> e703bdc50991243fa6364ab72c52cd5f60f6f9b0
  }

  handleAddressInput(e) {
    const address = e.target.value;
    this.setState({
      address: address
    });
  }

  handleStartTimeSelect(time) {
    this.setState({
      startTime: time
    });
  }

  handleEndTimeSelect(time) {
    this.setState({
      endTime: time
    });
  }

  handleStartDateSelect(date) {
    this.setState({
      startDate: date
    })
  }

  handleEndDateSelect(date) {
    this.setState({
      endDate: date
    })
  }

  handleSearch() {
    Geocode.fromAddress(this.state.address)
    .then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      const { startTime, endTime, startDate, endDate } = this.state;
      const startTimeUNIX = convertToUNIXTime(startTime, startDate);
      const endTimeUNIX = convertToUNIXTime(endTime, endDate);
      this.props.getFreeSpotsAndUpdate(lat, lng, startTimeUNIX, endTimeUNIX, startTime, endTime, startDate, endDate);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    const times = generateTimes();

    return (
      <div>
        <TxtBox label={'search'} handleInput={this.handleAddressInput}/>
        <div>Start Date</div>
        <DatePicker selected={this.state.startDate} onChange={this.handleStartDateSelect} />
        <div>End Date</div>
        <DatePicker selected={this.state.endDate} onChange={this.handleEndDateSelect} />
        <Picker label={'Start Time'} options={times} initialValue={times[0]} onChangeCB={this.handleStartTimeSelect}/>
        <Picker label={'End Time'} options={times} initialValue={times[1]} onChangeCB={this.handleEndTimeSelect}/>
        <Button text={'Search'} func={this.handleSearch}/>
      </div>
    );
  }

}

export default Search;