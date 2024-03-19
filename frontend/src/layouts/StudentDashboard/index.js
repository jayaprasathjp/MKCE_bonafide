// @mui/icons-material components
import WeekendIcon from '@mui/icons-material/Weekend';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import StoreIcon from '@mui/icons-material/Store';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Footer from 'examples/Footer';
import MDBox from 'components/MDBox';
import { Grid } from '@mui/material';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
// @mui/icons-material components
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// @mui/icons-material components
import EngineeringIcon from '@mui/icons-material/Engineering';
// @mui/icons-material components
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// @mui/icons-material components
import DescriptionIcon from '@mui/icons-material/Description';


import { useSession } from "SessionContext";
import { useState, useEffect } from 'react';

// Your existing code continues here...

function StudentDashboard() {
  const { name, pass,role } = useSession();
  const [dept, setDept] = useState('');
  const [batch, setBatch] = useState('');
  const [count, setCount] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/fetchDataLogin/${name}`);
        const jsondata = await response.json();
        setBatch(jsondata[0].Batch)
        setDept(jsondata[0].Department)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(`http://localhost:5001/Count/${name}`);
        const { count } = await response.json(); // Extract the count value
        setCount(count); // Set only the count value to the state
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };
    fetchCount();
  }, []);



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<AccountCircleIcon />}
                title="Welcome"
                count={name}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<EngineeringIcon />}
                title="Department"
                count={dept}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<CalendarTodayIcon />}
                title={batch}
                count="2021-2025"

              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<DescriptionIcon />}
                title="Bonafided applied"
                count={count} // Display the count value
              />

            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default StudentDashboard;
