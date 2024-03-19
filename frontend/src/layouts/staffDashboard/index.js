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
// @mui/icons-material components
import SchoolIcon from '@mui/icons-material/School';
import { useSession } from 'SessionContext';
import { useState, useEffect } from 'react';

// Your existing code continues here...

function StaffDashboard() {
  const { name, pass } = useSession();
  const [dept, setDept] = useState('');
  const [accept, setAccept] = useState('');
  const [reject, setReject] = useState('');
  const [pending, setPending] = useState('');

  useEffect(() => {
    const FetchDept = async () => {
      try {
        const response = await fetch(`http://localhost:5001/fetchStaffDetails/${name}`);
        const jsondata = await response.json();
        setDept(jsondata[0].Department);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    FetchDept();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      console.log(dept)
      try {
        const response = await fetch(`http://localhost:5001/acceptCount/${dept}`);
        const { count } = await response.json(); // Extract the count value
        setAccept(count);
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };
    fetchCount();
  }, [dept]); // Add dept as a dependency
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await fetch(`http://localhost:5001/pendingCount/${dept}`);
        const { count } = await response.json();
        setPending(count); // Set pending count instead of accept count
      } catch (error) {
        console.error('Error fetching pending count:', error);
      }
    };
    fetchPendingCount();
  }, [dept]);
  
  useEffect(() => {
    console.log(pending); // Log accept state here
  }, [pending]); // Add accept as a dependency

  useEffect(() => {
    console.log(accept); // Log accept state here
  }, [accept]); // Add accept as a dependency

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<SchoolIcon />}
                title="Welcome"
                count="Jegan"
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
                title="Bonafide approved"
                count={accept}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<DescriptionIcon />}
                title="Bonafided request Pending "
                count={pending}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

    </DashboardLayout>
  );
}

export default StaffDashboard;
