import React from 'react';
import Geocode from "react-geocode";
import TxtBox from '../shared/txtBox/TxtBox.jsx';
import Picker from '../shared/Picker.jsx';
import Button from '../shared/button/button.jsx';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './Search.css';
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
    this.handleStartDateSelect = this.handleStartDateSelect.bind(this);
    this.handleEndDateSelect = this.handleEndDateSelect.bind(this);
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
    const spots = !this.props.searchMade ? 'ready for liftoff!' : this.props.spotsFound;

    return (
      <div id="search-container">
        <div id="search-result-count">{spots}</div>
        <div id="search-options-container">
          <TxtBox label={'Location'} placeholder={'Where are you going?'} handleInput={this.handleAddressInput}/>
          <div id="reservation-options-container">
            <div className="reservation-options-element">
              <div className="search-label">Start Date</div>
              {/* <label>{'Start Date'}</label> */}
              <DatePicker selected={this.state.startDate} onChange={this.handleStartDateSelect} />
            </div>
            <div className="reservation-options-element">
              <div className="search-label">End Date</div>
              {/* <label>{'End Date'}</label> */}
              <DatePicker selected={this.state.endDate} onChange={this.handleEndDateSelect} />
            </div>
            <div className="reservation-options-element">
              <Picker label={'Start Time'} options={times} initialValue={times[0]} onChangeCB={this.handleStartTimeSelect}/>
            </div>
            <div className="reservation-options-element">
              <Picker label={'End Time'} options={times} initialValue={times[1]} onChangeCB={this.handleEndTimeSelect}/>
            </div>
          </div>
        </div>
        <div id="search-button-container">
          <div id="search-button">
          <Button text={'Search'} width={'500px'} height={'75px'} func={this.handleSearch}/>
          </div>
        </div>
      </div>
    );
  }

}

export default Search;