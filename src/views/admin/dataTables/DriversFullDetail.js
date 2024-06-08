import React from "react";
import { Text } from "@chakra-ui/react";

const DriversFullDetail = ({ driver }) => {
  return (
    <div>
      <Text>Name: {driver?.attributes?.driverName}</Text>
      <Text>License Number: {driver?.attributes?.driverLisenceNumber}</Text>
      <Text>Salary: {driver?.attributes?.salary}</Text>
      <Text>Passport Number: {driver?.attributes?.PassportNumber}</Text>
      <Text>Iqama Number: {driver?.attributes?.iqamaNumber}</Text>
      <Text>Phone Number: {driver?.attributes?.driverPhoneNumber}</Text>
      <Text>Passport Expiry: {driver?.attributes?.passportExpiry}</Text>
      <Text>Iqama Expiry: {driver?.attributes?.iqamaExpiry}</Text>
      <Text>Iqama picture: {driver?.attributes?.iqamaExpiry}</Text>
      {/* Add more details as needed */}
    </div>
  );
};

export default DriversFullDetail;
