import React, {useState} from "react"
import PropTypes from "prop-types"
import {Calendar, Alert, Layout, Col, Row, Button, List} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const {Content} = Layout;

const Welcome = ({}) => {
    const [value, setValue] = useState(moment('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(moment('2017-01-25'));
    const data = ['11:00', '12:00']

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
                    <Col span={16}>
                        <div>
                            <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`}/>
                            <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange}
                                      fullscreen={false}/>
                        </div>
                    </Col>
                    <Col span={8}>
                        <List dataSource={data} style={{padding: '5px'}}
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
