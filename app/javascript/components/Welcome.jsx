import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Calendar, Alert, Layout, Col, Row, Button, List} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import {CreateSubscription} from '../channels/booking_channel'
import DurationForm from './DurationForm'
import {getAvailableSlots, bookSlot} from '../api/api'
const {Content} = Layout;

const Welcome = ({}) => {
    const [value, setValue] = useState(moment());
    const [selectedValue, setSelectedValue] = useState(moment());
    const [timeSlots, setTimeSlots] = useState([]);
    const [slotDuration, setSlotDuration] = useState(null);
    const [bookCompleted, setBookCompleted] = useState(false);

    const subscription = CreateSubscription((data) => {
        const {type, result} = data
        switch (type) {
            case 'request_slots_success':
                setTimeSlots(result['slots']);
                setSlotDuration(result['duration']);
                break;
            case 'book_slot_success':
        }
    })


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
            day: selectedValue,
            duration: slotDuration
        })

        setBookCompleted(true);
    }

    const onDurationFormSubmit = async (duration) => {
        const result = await getAvailableSlots({duration: duration, day: selectedValue});
        const {data: {slots, durationInMinutes}} = result
        console.log('durationInMinutes',durationInMinutes)
        setSlotDuration(durationInMinutes);
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
                            <DurationForm onSubmit={onDurationFormSubmit}/>
                        </div>
                    </Col>
                    <Col span={12}>
                        <h2> Book your slot </h2>
                        {bookCompleted ? <h3>  Booked successfully </h3> : (
                            <List dataSource={timeSlots} style={{
                                padding: '5px', height: '460px',
                                overflowY: 'scroll'
                            }}
                                  renderItem={(item) => <List.Item style={{padding: '1px 0'}}>
                                      <Button onClick={() => onBookSlot(item)} style={{width: '100%'}}>{item} </Button>
                                  </List.Item>}/>)}
                    </Col>
                </Row>
            </Content>
        </Layout>);
}

Welcome.propTypes = {
  greeting: PropTypes.string
};
export default Welcome
