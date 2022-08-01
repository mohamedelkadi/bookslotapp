import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {Calendar, Alert, Layout, Col, Row, Button, List} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import  { CreateSubscription } from '../channels/booking_channel'
const {Content} = Layout;

const Welcome = ({}) => {
    const [value, setValue] = useState(moment('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(moment('2017-01-25'));
    const [ timeSlots, setTimeSlots ]  = useState([]);
    const subscription = CreateSubscription((data)=>{ setTimeSlots(data); console.log('nice', data)})


    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
        subscription.send({date: newValue})
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
                    <Col span={16}>
                        <div>
                            <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`}/>
                            <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange}
                                      fullscreen={false}/>
                        </div>
                    </Col>
                    <Col span={8}>
                        <List dataSource={timeSlots} style={{padding: '5px'}}
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
