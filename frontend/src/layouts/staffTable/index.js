import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from '@mui/material/IconButton';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDBadge from "components/MDBadge";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MDButton from "components/MDButton";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import InfoIcon from '@material-ui/icons/Info';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { useSession } from 'SessionContext';
import { useMediaQuery } from '@mui/material';
import Swal from 'sweetalert2';
function StaffTable() {
  const { name, pass } = useSession();
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [data, setData] = useState([]);
  const [rowData, setRowdata] = useState([])
  const handleClose = () => setModal(false);
  const handleClose1 = () => setModal1(false);
  const [reason, setReason] = useState('');
  const [id, setId] = useState('');
  const [dept, setDept] = useState('');
  useEffect(() => {
    const FetchDept = async () => {
      try {
        const response = await fetch(`http://localhost:5001/fetchStaffDetails/${name}`);
        const jsondata = await response.json();
        setDept(jsondata[0].Department)
        tableDataFetch();

      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    FetchDept();
  }, []);

  useEffect(() => {
    tableDataFetch(); // Call tableDataFetch when dept changes
  }, [dept]); // Add dept as a dependency

  const tableDataFetch = async () => {
    console.log(dept);
    try {
      const response = await fetch(`http://localhost:5001/bonafideTable/${dept}`);
      const jsondata = await response.json();
      setTableData(jsondata);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleAccept = async (uid) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this request!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, accept it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5001/acceptData/${uid}`);
          const jsondata = await response.json();
          tableDataFetch();
          Swal.fire(
            'Deleted!',
            'Bonafide  has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting data:', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the request.',
            'error'
          );
        }
      }
    });
  };

  const handleView = async (uid) => {
    try {
      const response = await fetch(`http://localhost:5001/particularRow/${uid}`);
      const jsondata = await response.json();
      console.log(jsondata)
      setRowdata(jsondata) // Update rowData state here
      console.log(setRowdata)
      setModal1(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = async (uid) => {
    setModal(true)
    setId(uid);
  };
  const handleRejection = async () => {
    console.log(id);
    setModal(false);
    setReason('');
    const form = {
      reason: reason
    };
    console.log(form);
    try {
      const response = await fetch(`http://localhost:5001/rejectBonafide/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
      });
      tableDataFetch()
    }
    catch (error) {
      console.log(error);
    }
  }


  const checkButton = (status, uid) => {
    switch (status) {
      case "pending":
        return (
          <MDBox>
            <MDButton color="info" onClick={() => handleAccept(uid)}><CheckIcon /></MDButton>
            <MDButton color="error" onClick={() => handleDelete(uid)}><CancelIcon /></MDButton>
            <MDButton color="info" onClick={() => handleView(uid)}><VisibilityIcon /></MDButton>
          </MDBox>
        );
      case "accepted":
        return (
          <MDBox>
            <MDButton color="success">ACCEPTED</MDButton>
          </MDBox>
        );
      default:
        return (
          <MDBox>
            <MDButton color="error">REJECTED</MDButton>
          </MDBox>
        );
    }
  };


  const columns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Roll No.", accessor: "regno", align: "left" },
    { Header: "Purpose", accessor: "purpose", align: "center" },
    { Header: "applied on", accessor: "applied", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const rows = tableData.map(data => ({
    name: data.fname,
    regno: data.regno,
    purpose: data.purpose,
    applied: data.applydate,
    action: checkButton(data.status, data.uid),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                justifyContent="space-between"
                alignItems="center"
                display="flex"
              >
                <MDTypography variant="h6" color="white">
                  Bonafide Information
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Dialog maxWidth="lg" open={modal} justifyContent="center" onClose={handleClose}>
            <DialogTitle>REJECTION REASON</DialogTitle>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"

            >
              <div>
                <TextField
                  id="outlined-multiline-static"
                  label="Reason for rejection"
                  multiline
                  rows={4}
                  onChange={(e) => { setReason(e.target.value) }}

                />
              </div>
            </Box>

            <DialogContent>

            </DialogContent>
            <DialogActions>
              <MDButton color="error" onClick={handleRejection}>Submit</MDButton>
            </DialogActions>
          </Dialog>

          <Dialog maxWidth="lg" open={modal1} justifyContent="center" onClose={handleClose1}>
            <DialogTitle>BONAFIDE CERTIFICATE</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <MDTypography>
                    Name: {rowData?.[0]?.fname}
                  </MDTypography>
                  <MDTypography>
                    Applied on: {rowData?.[0]?.applydate}
                  </MDTypography>
                  <MDTypography>
                    Purpose: {rowData?.[0]?.purpose}
                  </MDTypography>
                  <MDTypography>
                    Academic year: {rowData?.[0]?.ayear}
                  </MDTypography>
                  <MDTypography>
                    Date of Birth: {rowData?.[0]?.dob}
                  </MDTypography>
                  <MDTypography>
                    Degree: {rowData?.[0]?.degree}
                  </MDTypography>
                  <MDTypography>
                    Department: {rowData?.[0]?.dept}
                  </MDTypography>
                  <MDTypography>
                    Boarding: {rowData?.[0]?.boarding}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="flex-start">
                  <img src={rowData?.[0]?.photo} alt="Jegan" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default StaffTable;
