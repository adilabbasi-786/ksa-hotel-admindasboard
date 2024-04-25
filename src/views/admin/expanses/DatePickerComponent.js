// import { Flex, Text } from "@chakra-ui/react";
import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ onSelectDate }) => {
  const [startDate, setStartDate] = useState(new Date());

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <>
      <h1>click the see expanses of date</h1>
      <button
        className="example-custom-input"
        onClick={onClick}
        ref={ref}
        style={{
          marginLeft: "500px",
          marginBottom: "10px",
          background: "#2b6cb0",
          color: "#fff",
          border: "1px solid #2b6cb0",
          borderRadius: "5px",
          padding: "8px 12px",
        }}
      >
        Date:{value}
      </button>
    </>
  ));

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};

export default DatePickerComponent;
