import React, { useState } from 'react';
import {
  Select,
  Form,
  Typography,
  Button,
  Space,
} from 'antd';

const { Text } = Typography;
const { Option } = Select;
const HOURS = ['00', '01', '2', '03', '04', '05', '06', '07'];
const MINUTES = ['00', '15', '30', '45'];

function DurationForm({ onSubmit, syncCurrentDuration }) {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  return (
    <Form
      form={form}
      layout="inline"
      onValuesChange={(values) => syncCurrentDuration(values)}
      onFinish={(values) => {
        const { hours, minutes } = values;

        if ((parseInt(hours, 10) > 0 || parseInt(minutes, 10)) > 0) {
          setError(null);
          onSubmit(values);
        } else {
          setError("Both hours and minutes can't be zero, please select valid duration");
        }
      }}
    >

      <Form.Item name="hours">
        <Select defaultValue="00">
          {HOURS.map((h) => (
            <Option value={h}>
              {h}
              {' '}
              hours
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="minutes">
        <Select defaultValue="00">
          {MINUTES.map((m) => (
            <Option value={m}>
              {m}
              {' '}
              minutes
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        List available slots
      </Button>

      {error && (
        <Space>
          {' '}
          <Text type="danger">
            {' '}
            {error}
            {' '}
          </Text>
          {' '}
        </Space>
      ) }

    </Form>
  );
}

export default DurationForm;
