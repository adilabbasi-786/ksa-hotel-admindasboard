import { Box, Button, Grid, SimpleGrid } from "@chakra-ui/react";
import Banner from "views/admin/profile/components/Banner";
import banner from "assets/img/auth/banner.png";
import { useEffect, useState } from "react";
import Card from "components/card/Card.js";
import { useHistory } from "react-router-dom";

// Importing the JSON data directly for demonstration purposes
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";

const EmployeesData = () => {
  const history = useHistory();
  const [employeeData, setEmployeeData] = useState([]);

  // Set all the data initially
  useEffect(() => {
    setEmployeeData(tableDataDevelopment);
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card mb={{ base: "0px", "2xl": "20px" }}>
        <Button
          me="100%"
          mb="50px"
          w="180px"
          minW="140px"
          mt={{ base: "20px", "2xl": "auto" }}
          variant="brand"
          fontWeight="500"
          onClick={() => {
            history.push("/admin/emp-tables/add");
          }}
        >
          Create new Employee
        </Button>
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "1.34fr 1fr 1.62fr",
          }}
          templateRows={{
            base: "repeat(3, 1fr)",
            lg: "1fr",
          }}
          gap={{ base: "20px", xl: "20px" }}
        >
          {employeeData.map((employee, index) => (
            <Banner
              key={index} // Use index as the key since there's no unique id
              gridArea="1 / 1 / 2 / 2"
              name={employee.name}
              passportNumber={employee.passportNumber}
              status={employee.status}
              avatar={employee.avatar}
              banner={banner}
            />
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default EmployeesData;
