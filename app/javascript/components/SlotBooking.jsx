import React from 'react';
import {
  Button, List, Space, Alert,
} from 'antd';

function SlotBooking({ bookCompleted, timeSlots, onBookSlot }) {
  return (
    <>
      {bookCompleted ? (
        <Space>
          <Alert type="success" message="Booked successfully" />
        </Space>
      ) : (
        <List
          dataSource={timeSlots}
          style={{
            padding: '5px',
            height: '460px',
            overflowY: 'scroll',
          }}
          renderItem={(item) => (
            <List.Item style={{ padding: '1px 0' }}>
              <Button onClick={() => onBookSlot(item)} style={{ width: '100%' }}>
                {item}
              </Button>
            </List.Item>
          )}
        />
      )}
    </>
  );
}
export default SlotBooking;
