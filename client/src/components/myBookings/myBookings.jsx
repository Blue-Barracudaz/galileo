import React from 'react';
import ParkingSpot from '../shared/parkingSpot/parkingSpot.jsx';
import Trash from '../shared/icons/trash.jsx';
import './myBookings.css';
import TabSelector from '../shared/tabSelector/TabSelector.jsx';
import PageHeader from '../shared/pageHeader/pageHeader.jsx';

class MyBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: []
    };
  }

  onClick = () => {
    console.log('CLICKED DELETED')
  }

  componentDidMount () {
    console.log('PPROPS.USEID', this.props.user_id)
    fetch(`/my-bookings/${this.props.user_id}`)
      .then((res) => res.json())
      .then((bookings) => {
        console.log('MY BOOKINGS', bookings);
        let requiredBookings = bookings.map((booking) => {
          let duration = (Number(booking.end_time) - Number(booking.start_time)) / 3600;
          let total = duration * booking.price;

          let unixStart = booking.start_time;
          let unixEnd = booking.end_time;
          let humanStartTime = new Date(unixStart * 1000);
          let humanEndTime = new Date(unixEnd * 1000);
          let options = { year: 'numeric', month: 'long', day: 'numeric' };
          let requiredDate = humanStartTime.toLocaleDateString('en-US', options);
          // console.log('Required date', requiredDate);
          let timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }
          let requiredStartTime = humanStartTime.toLocaleTimeString('en-US', timeOptions)
          // console.log('HUMAN TIME', requiredStartTime);
          let requiredEndTime = humanEndTime.toLocaleTimeString('en-US', timeOptions);
          // console.log('HUMAN END TIME', requiredEndTime)
          booking.time = `${requiredStartTime} - ${requiredEndTime}`;
          booking.date = requiredDate;
          booking.total = total;
          return booking;
        })
        this.setState({bookings: requiredBookings}, () => console.log('FINAL BOOKINGS', this.state.bookings))
      })
      .catch((err) => {
        console.log('ERROR GETTING MY BOOKINGS', err);
      })
  }

  render () {
    return (
      <div className='my-bookings'>
        <PageHeader title='Active Bookings' linkto='/rent'/>
        <div className='my-bookings-list'>
          {
            this.state.bookings.map((booking, idx) => <ParkingSpot key={idx} image={booking.photo_url} address={booking.address} date={booking.date} time={booking.time} total={booking.total} onIconClick={this.onClick}  ActionIcon={Trash}/>)
          }
        </div>
        <TabSelector view={3} />
      </div>
    )
  }
}

export default MyBookings;