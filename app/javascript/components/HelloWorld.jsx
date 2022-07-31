import React,  { useState }  from "react"
import PropTypes from "prop-types"
import { Calendar , Alert} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const HelloWorld = ({greeting}) => {
    const [value, setValue] = useState(moment('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(moment('2017-01-25'));


    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

  return (
      <div className={'site-calendar'}>
          <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
          <Calendar  value={value} onSelect={onSelect} onPanelChange={onPanelChange} fullscreen={false} />
      </div>
  );
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
