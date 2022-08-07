import React from "react"
import {Button, List} from "antd";

const SlotBooking = ({bookCompleted, timeSlots, onBookSlot}) => (
    <>
        {bookCompleted ? <h3> Booked successfully </h3> : (
            <List dataSource={timeSlots} style={{
                padding: '5px', height: '460px',
                overflowY: 'scroll'
            }}
                  renderItem={(item) => <List.Item style={{padding: '1px 0'}}>
                      <Button onClick={() => onBookSlot(item)} style={{width: '100%'}}>{item} </Button>
                  </List.Item>}/>)}</>
)
export default SlotBooking
