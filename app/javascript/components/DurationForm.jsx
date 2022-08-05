import React, {useState} from "react"
import {
    Input,
    Select,
    Col,
    Row,
    Form,
    Button
} from 'antd';

const {Option} = Select;
const HOURS = ['00', '01', '03', '04', '05', '06', '07']
const MINUTES = ['00', '10', '15', '20', '25', '30', '35', '45', '50', '55']

const DurationForm = ({onSubmit}) => {
    const [form] = Form.useForm();

    return (
        <Form form={form} layout="inline" onFinish={(values) => {
            onSubmit(values)
        }}>

                    <Form.Item name="hours" >
                        <Select defaultValue="00">
                            {HOURS.map((h) => <Option value={h}>{h} hours</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="minutes" >
                        <Select defaultValue="00">
                            {MINUTES.map((m) => <Option value={m}>{m} minutes</Option>)}
                        </Select>
                    </Form.Item>


                <Button type="primary" htmlType="submit">
                    List available slots
                </Button>
        </Form>)
}


export default DurationForm
