import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import {Calendar, Alert, Layout, Col, Row} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import {BookingChannel} from '../channels/booking_channel'
import DurationForm from './DurationForm'
import SlotBooking from './SlotBooking'
import {getAvailableSlots, bookSlot} from '../api/api'
const {Content} = Layout;

const Welcome = ({}) => {
    const [value, setValue] = useState(moment());
    const [selectedValue, setSelectedValue] = useState(moment());
    const [timeSlots, setTimeSlots] = useState([]);
    const [numericDuration, setNumericDuration] = useState(null);
    const [currentDuration, setCurrentDuration] = useState(null);
    const [bookCompleted, setBookCompleted] = useState(false);
    const uuid = Math.floor(Math.random() * 100);
    const selectedDay = selectedValue.format('YYYY-MM-DD')

    useEffect(() => {
        BookingChannel.received = (response) => {
            const {data: {day, senderId}} = response
            notifyByMsg(day, senderId)
        }
    })

    const notifyByMsg = (day, senderId) => {
        console.log(senderId, uuid, 'id')
        if (uuid === senderId) {
            return;
        }

        if (day === selectedDay) {
            onDurationFormSubmit(currentDuration).catch();
        }
    }

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const onBookSlot = async (item) => {

        await bookSlot({
            slot: item,
            day: selectedDay,
            duration: numericDuration,
            uuid: uuid,
        })

        setBookCompleted(true);

    }

    const onDurationFormSubmit = async (duration) => {
        const result = await getAvailableSlots({duration: duration, day: selectedValue});
        const {data: {slots, durationInMinutes}} = result
        setNumericDuration(durationInMinutes);
        setBookCompleted(false);
        setTimeSlots(slots);
    }

    return (
        <Layout>
            <h1> Slot booking </h1>
            <Content style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}>
                <Row style={{width: '90%', margin: 'auto'}}>
                    <Col span={12}>
                        <h2>Select a day </h2>
                        <div>
                            <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`}/>
                            <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange}
                                      fullscreen={false}/>
                        </div>
                        <h2> Select duration </h2>
                        <div>
                            <DurationForm onSubmit={onDurationFormSubmit}
                                          syncCurrentDuration={(v) => {
                                              console.log('syncxx', v)
                                              setCurrentDuration({...currentDuration, ...v})
                                              console.log('currnt', currentDuration)
                                          }}/>
                        </div>
                    </Col>
                    <Col span={12}>
                        <h2> Book your slot </h2>
                        <SlotBooking bookCompleted={bookCompleted} onBookSlot={onBookSlot} timeSlots={timeSlots}/>
                    </Col>
                </Row>
            </Content>
        </Layout>);
}

Welcome.propTypes = {
  greeting: PropTypes.string
};
export default Welcome
