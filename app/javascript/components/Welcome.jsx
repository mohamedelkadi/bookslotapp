import React, { useState, useEffect } from 'react';
import {
  Calendar, Alert, Layout, Col, Row,
} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { BookingChannel } from '../channels/booking_channel';
import DurationForm from './DurationForm';
import SlotBooking from './SlotBooking';
import { getAvailableSlots, bookSlot } from '../api/api';

const { Content, Header, Footer } = Layout;

function Welcome() {
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const [timeSlots, setTimeSlots] = useState([]);
  const [numericDuration, setNumericDuration] = useState(null);
  const [currentDuration, setCurrentDuration] = useState(null);
  const [bookCompleted, setBookCompleted] = useState(false);
  const uuid = Math.floor(Math.random() * 100);
  const selectedDay = selectedValue.format('YYYY-MM-DD');

  const onDurationFormSubmit = async (duration) => {
    const result = await getAvailableSlots({ duration, day: selectedValue });
    const { data: { slots, durationInMinutes } } = result;
    setNumericDuration(durationInMinutes);
    setBookCompleted(false);
    setTimeSlots(slots);
  };

  const notifyByMsg = (day, senderId) => {
    if (uuid === senderId) {
      return;
    }

    if (day === selectedDay) {
      onDurationFormSubmit(currentDuration).catch();
    }
  };

  useEffect(() => {
    BookingChannel.received = (response) => {
      const { data: { day, senderId } } = response;
      notifyByMsg(day, senderId);
    };
  });

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
      uuid,
    });

    setBookCompleted(true);
  };

  return (
    <Layout>
      <Header />
      <h1> Slot booking </h1>
      <Content style={{
        padding: 24,
        margin: 0,
        minHeight: 620,
      }}
      >
        <Row style={{ width: '90%', margin: 'auto' }}>
          <Col span={12}>
            <h2>Select a day </h2>
            <div>
              <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
              <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                fullscreen={false}
              />
            </div>
            <h2> Select duration </h2>
            <div>
              <DurationForm
                onSubmit={onDurationFormSubmit}
                syncCurrentDuration={(v) => {
                  setCurrentDuration({ ...currentDuration, ...v });
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <h2> Book your slot </h2>
            <SlotBooking
              bookCompleted={bookCompleted}
              onBookSlot={onBookSlot}
              timeSlots={timeSlots}
            />
          </Col>
        </Row>
      </Content>
      <Footer>
        @Tradelink test. to see the booked slots go to /debug
        {' '}
      </Footer>
    </Layout>
  );
}

export default Welcome;
