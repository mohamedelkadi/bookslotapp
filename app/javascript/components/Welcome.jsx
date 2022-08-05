import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Calendar, Alert, Layout, Col, Row, Button, List} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import {CreateSubscription} from '../channels/booking_channel'
import DurationForm from './DurationForm'

const {Content} = Layout;

const Welcome = ({}) => {
    const [value, setValue] = useState(moment());
    const [selectedValue, setSelectedValue] = useState(moment());
    const [timeSlots, setTimeSlots] = useState([]);
    const subscription = CreateSubscription((data) => {
        setTimeSlots(data);
        console.log('nice', data)
    })


    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

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
                            <DurationForm onSubmit={(duration) => (subscription.send({
                                type: 'request_slots',
                                duration: duration,
                                day: selectedValue
                            }))}/>
                        </div>
                    </Col>
                    <Col span={12}>
                        <h2> Book your slot </h2>
                        <List dataSource={timeSlots} style={{
                            padding: '5px', height: '460px',
                            overflowY: 'scroll'
                        }}
                              renderItem={(item) => <List.Item style={{padding: '1px 0'}}> <Button
                                  style={{width: '100%'}}>{item} </Button>
                              </List.Item>}/>
                    </Col>
                </Row>
            </Content>
        </Layout>);
}

Welcome.propTypes = {
  greeting: PropTypes.string
};
export default Welcome
