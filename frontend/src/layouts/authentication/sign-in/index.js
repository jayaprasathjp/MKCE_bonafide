import React, { useState } from "react";

// react-router-dom components
import { Link, Navigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Stack from '@mui/material/Stack';
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Tabs, Tab, Divider } from '@mui/material';
import tab from "assets/theme-dark/components/tabs/tab";
import { useSession } from "SessionContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
function Signin() {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const { name, setName, pass, setPass,role,setRole} = useSession();
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };
  const handleSignIn = async () => {
    setRole("staff")
    const LoginData = {
      uname:name,
      pass:pass
    };

    console.log(LoginData);

    try {
      const response = await fetch(`http://localhost:5001/loginStaff`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(LoginData),
      });
      console.log("signing in as staff")
      const res=await response.json();
      if(res.success===true){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'login success!',
        });
        navigate('/staffDashboard');
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'login failed',
        });
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while creating code test");
    }
  }
  const handleStudentSignIn= async () => {
    const LoginData = {
      uname:name,
      pass:pass
    };  
    setRole((prev)=>{
      console.log("student set state");
      return "student"
    });

    console.log(LoginData);

    try {
      const response = await fetch(`http://localhost:5001/login`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(LoginData),
      });
      console.log("signing in as student",role)

      const res=await response.json();
      if(res.success===true){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login success!',
        });
        navigate('/dashboard');
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'Login fail!',
        });
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while creating code test");
    }
  }
  return (
    
    <BasicLayout image={bgImage}>
  
      <Card>
        <Tabs value={tabIndex} onChange={handleChangeTab}>
          <Tab label="Faculty login" />
          <Tab label="Student Login" />
        </Tabs>
        <Stack spacing={2} alignItems="center" sx={{ marginTop: '20px', width: 'auto' }}>
          {tabIndex === 0 && (
            <>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
                sx={{ width: "400px" }}
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Faculty sign in
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3} sx={{ width: "400px" }}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput type="text" label="faculty username" onChange={(e) =>
                      setName(e.target.value)
                    } fullWidth />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput type="password" label="Faculty Password" onChange={(e) =>
                      setPass(e.target.value)
                    } fullWidth />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                      sign in
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MDTypography
                        component={Link}
                        to="/authentication/sign-up"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </>

          )}
          {tabIndex === 1 && (
            <>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
                sx={{ width: "400px" }}
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Students Sign in
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3} sx={{ width: "400px" }}>
              <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput type="text" label="student username" onChange={(e) =>
                      setName(e.target.value)
                    } fullWidth />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput type="password" label="student Password" onChange={(e) =>
                      setPass(e.target.value)
                    } fullWidth />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth onClick={handleStudentSignIn}>
                      sign in
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MDTypography
                        component={Link}
                        to="/authentication/sign-up"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>

            </>

          )}
        </Stack>

      </Card>
    </BasicLayout>
  );
}

export default Signin;
