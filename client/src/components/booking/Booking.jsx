import React from 'react';
import axios from 'axios';
import './Booking.css';
import PageHeader from '../shared/pageHeader/pageHeader.jsx';
import Button from '../shared/button/button.jsx';
import { withRouter, Link } from "react-router-dom";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.fee = 0.75;
    this.hour = (this.props.reservation.UNIXend - this.props.reservation.UNIXstart) / 3600;
    this.handleConfirmBookingButtonClick = this.handleConfirmBookingButtonClick.bind(this);
  }

  handleConfirmBookingButtonClick() {
    axios.post('/booking', {
      spot_id: this.props.reservation.spot_id,
      renter_id: this.props.user_id,
      start_time: this.props.reservation.UNIXstart,
      end_time: this.props.reservation.UNIXend
    })
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render () {
    return (
      <div id="booking">
        <div id="booking-header">
          <PageHeader title={'Confirm Booking'} isVisible={true} isBackButtonVisible={true} linkto={"/rent"} />
        </div>
        <div id="booking-body">
            <div id="booking-spot-container">
              <div id="booking-spot-photo-container">
                <img id="booking-spot-photo" src={this.props.reservation.photo} />
              </div>
              <div id="booking-spot-address-container">
                <div>{this.props.reservation.address}</div>
                <div>{`$${this.props.reservation.price}/hour`}</div>
            </div>
          </div>
          <hr className="booking-hr" />
          <div id="booking-price-container">
            <table id="booking-price-table">
              <tbody>
                <tr id={"booking-price-table-price"}>
                  <td className="booking-price-table-col1">{`\$${this.props.reservation.price} x ${this.hour}`}</td>
                  <td className="booking-price-table-col2">{`\$${(this.props.reservation.price * this.hour).toFixed(2)}`}</td>
                </tr>
                <tr id={"booking-price-table-fee"}>
                  <td className="booking-price-table-col1">Service Fee</td>
                  <td className="booking-price-table-col2">{`\$${(this.fee).toFixed(2)}`}</td>
                </tr>
                <tr id={"booking-price-table-empty"}>
                  <td className="booking-price-table-col1"></td>
                  <td className="booking-price-table-col2"></td>
                </tr>
                <tr id={"booking-price-table-total"}>
                  <td className="booking-price-table-col1">Total</td>
                  <td className="booking-price-table-col2">{`\$${(this.props.reservation.price * this.hour + this.fee).toFixed(2)}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr className="booking-hr" />
          <div id="booking-policy-container">
            <div id="booking-policy-header">Galileo cancellation-policy</div>
            <div>The reservation of the spot is nonrefundable.</div>
          </div>
          <hr className="booking-hr" />
          <div id="booking-button-container">
            <Link to="/rent" id="booking-button-link"><Button text={'Confirm'} func={this.handleConfirmBookingButtonClick} /></Link>
          </div>
        </div>
      </div>
    )
  };
}

export default withRouter(Booking);



