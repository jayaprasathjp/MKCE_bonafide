import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDBadge from "components/MDBadge";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MDButton from "components/MDButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import InfoIcon from "@material-ui/icons/Info";
import { useSession } from "SessionContext";
import jsPDF from "jspdf";
import { Yard } from "@mui/icons-material";
import Alert from "@mui/material/Alert"; // Import Material-UI Alert
import AlertTitle from "@mui/material/AlertTitle"; // Import Material-UI AlertTitle
import { fabClasses } from "@mui/material";
import Swal from "sweetalert2";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "Document";

function Tables() {
  const { name, pass } = useSession();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [tableData, setTableData] = useState([]);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [data, setData] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [rowData, setRowdata] = useState([]);
  const handleClose = () => setModal(false);
  const handleOpen = () => setModal(true);
  const handleClose1 = () => setModal1(false);
  const handleOpen1 = () => setModal1(true);
  const [year, setYear] = useState("");
  const handleChange = (event) => setYear(event.target.value);
  const [academicYear, setAcademicyear] = useState("");
  const handleAcademicChange = (event) => setAcademicyear(event.target.value);
  const handlePurposeChange = (event) => setPurpose(event.target.value);

  useEffect(() => {
    const tableDataFetch = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/StudentBonafideTable/${name}`
        );
        const jsondata = await response.json();
        setTableData(jsondata);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    tableDataFetch();
  }, []);
  useEffect(() => {
    const tableDataFetch = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/StudentBonafideTable/${name}`
        );
        const jsondata = await response.json();
        setTableData(jsondata);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    tableDataFetch();
  }, []);

  const tableDataFetch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/bonafideTable/${name}`
      );
      const jsondata = await response.json();
      setTableData(jsondata);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/fetchData/${name}`);
        const jsondata = await response.json();
        setData(jsondata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleView = async (uid) => {
    try {
      const response = await fetch(
        `http://localhost:5001/particularRow/${uid}`
      );
      const jsondata = await response.json();
      console.log(jsondata);
      setRowdata(jsondata); // Update rowData state here

      setModal1(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [downloadData, setDownloaddata] = useState([]);
  // const handleDownload = async (uid) => {
  //   try {
  //     const response = await fetch(`http://localhost:5001/particularRow/${uid}`);
  //     const jsondata = await response.json();
  //     setDownloaddata(jsondata);
  //     console.log(downloadData);

  //     // const doc = new jsPDF();

  //     // // Set margins
  //     // const margin = 10;
  //     // const textX = margin;
  //     // const textY = margin;
  //     // const maxWidth = doc.internal.pageSize.getWidth() - 2 * margin;

  //     // // Draw margin rectangle in blue color
  //     // doc.setDrawColor(0, 0, 255); // Blue color
  //     // doc.rect(margin, margin, maxWidth, doc.internal.pageSize.getHeight() - 2 * margin, 'D');

  //     // // Print fetched data
  //     // const formattedData = JSON.stringify(downloadData);
  //     // const lines = doc.splitTextToSize(formattedData, maxWidth);
  //     // doc.text(lines, textX, textY);

  //     // // Save PDF
  //     // doc.save("downloaded_data.pdf");
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleDelete = async (uid) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:5001/rowDelete/${uid}`
          );
          const jsondata = await response.json();
          tableDataFetch();
          Swal.fire("Deleted!", "Bonafide  has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting data:", error);
          Swal.fire(
            "Error!",
            "An error occurred while deleting the request.",
            "error"
          );
        }
      }
    });
  };
  const [downloadUid, setDownloadUid] = useState(null);

  const checkButton = (status, uid) => {
    switch (status) {
      case "pending":
        return (
          <MDBox>
            <MDButton color="info" onClick={() => handleView(uid)}>
              <VisibilityIcon />
            </MDButton>
            <MDButton color="error" onClick={() => handleDelete(uid)}>
              <DeleteIcon />
            </MDButton>
          </MDBox>
        );
      case "accepted":
        return (
          <MDBox>
            <MDButton color="info" onClick={() => handleView(uid)}>
              <VisibilityIcon />
            </MDButton>
            <PDFDownloadLink
              document={<MyDocument uid={uid} />}
              fileName="somename5.pdf"
            >
              {({ loading }) =>
                loading ? "Loading document..." : "Download now!"
              }
              <MDButton color="success">
                <GetAppIcon />
              </MDButton>
            </PDFDownloadLink>
            {/* <div hidden>
              <MyDocument uid={uid}></MyDocument>
            </div> */}
          </MDBox>
        );
      default:
        return (
          <MDBox>
            <MDButton color="info" onClick={() => handleView(uid)}>
              <VisibilityIcon />
            </MDButton>
          </MDBox>
        );
    }
  };

  const columns = [
    { Header: "SNo.", accessor: "no", align: "left" }, // Updated to "no" instead of "no."
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Purpose", accessor: "purpose", align: "center" },
    { Header: "Applied On", accessor: "applied", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },
  ];

  const checkColor = (status) => {
    if (status === "accepted") {
      return "success";
    } else if (status === "rejected") {
      return "error";
    } else {
      return "warning";
    }
  };

  const rows = tableData.map((data, index) => ({
    no: index + 1, // Serial number
    name: data.fname,
    purpose: data.purpose,
    applied: data.applydate,
    status: (
      <MDBox>
        <MDButton color={checkColor(data.status)}>{data.status}</MDButton>
      </MDBox>
    ),
    action: checkButton(data.status, data.uid),
  }));

  const handleSubmit = async () => {
    try {
      const formData = {
        id: data[0].id,
        fname: data[0].fname,
        lname: data[0].lname,
        regno: data[0].regno,
        aadhar: data[0].aadhar,
        gender: data[0].gender,
        fathername: data[0].fathername,
        type: "BONAFDIE",
        syear: year,
        degree: data[0].degree,
        dept: data[0].dept,
        ayear: academicYear,
        dob: data[0].dob,
        boarding: data[0].boarding,
        purpose: purpose,
        image: data?.[0]?.photo,
      };
      const response = await fetch(`http://localhost:5001/applyBonafide`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Bonafide Applied Successfully!",
      });
      setModal(false);
      setAcademicyear("");
      setYear("");
      setPurpose("");
      tableDataFetch();
    } catch (error) {
      console.log(error);
    }
  };

  const check = () => (data.gender === "female" ? "D/O" : "S/O");
  const checkStatus = (status, rejection_reason) => {
    if (status === "accepted") {
      return (
        <MDBox
          sx={{
            backgroundColor: "#b9f6ca",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <MDTypography>Status: Your bonafide has been accepted</MDTypography>
        </MDBox>
      );
    } else if (status === "rejected") {
      return (
        <MDBox
          sx={{
            backgroundColor: "#ffcdd2",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <MDTypography>Status: Your bonafide has been rejected</MDTypography>
          <MDTypography>Rejected reason: {rejection_reason}</MDTypography>
        </MDBox>
      );
    } else {
      return (
        <MDBox
          sx={{
            backgroundColor: "#FFD700",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <MDTypography>
            Status: Your bonafide request is still pending
          </MDTypography>
        </MDBox>
      );
    }
  };

  const checkApplyButton = () => {
    const isButtonVisible = academicYear && year && purpose;

    return (
      <>
        {isButtonVisible && (
          <MDButton color="success" onClick={handleSubmit}>
            Apply
          </MDButton>
        )}
      </>
    );
  };

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
                <MDButton color="success" onClick={handleOpen}>
                  Apply
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Dialog
            maxWidth="lg"
            open={modal}
            justifyContent="center"
            onClose={handleClose}
          >
            <DialogTitle>BONAFIDE CERTIFICATE</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  <MDTypography>Date: {formattedDate}</MDTypography>
                  <MDTypography>
                    This is to certify that {data?.[0]?.fname}{" "}
                    {data?.[0]?.lname} (Reg NO: {data?.[0]?.regno}, Aadhar No:{" "}
                    {data?.[0]?.aadhar}) {check} MR.{data?.[0]?.fathername} is
                    bonafide of our College, Studying in {year} year B.E/B.Tech{" "}
                    {data?.[0]?.dept} during academic year {academicYear}
                  </MDTypography>
                  <MDTypography>Date of Birth: {formattedDate}</MDTypography>
                  <MDTypography>Boarding: Day Scholar</MDTypography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl fullWidth sx={{ minWidth: "200px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Select year
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={year}
                        label="Select the year"
                        onChange={handleChange}
                        sx={{ height: "40px" }}
                      >
                        <MenuItem value="I">I</MenuItem>
                        <MenuItem value="II">II</MenuItem>
                        <MenuItem value="III">III</MenuItem>
                        <MenuItem value="IV">IV</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ minWidth: "200px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Academic year
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={academicYear}
                        label="Academic year"
                        onChange={handleAcademicChange}
                        sx={{ height: "40px" }}
                      >
                        {[...Array(10)].map((_, index) => (
                          <MenuItem
                            key={index}
                            value={`2024-${2025 + index}`}
                          >{`2024-${2025 + index}`}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ minWidth: "200px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Select purpose
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={purpose}
                        label="select purpose"
                        onChange={handlePurposeChange}
                        sx={{ height: "40px" }}
                      >
                        {[
                          "LABOUR WELFARE",
                          "CHIEF MINISTER SCHOLARSHIP",
                          "PM SCHOLARSHIP",
                          "ULAVAR PATHUKAPPU THITTAM",
                          "FIRST GRADUATE APPLY PURPOSE",
                          "NON FIRST GRADUATE APPLY PURPOSE",
                          "NEET COUNSELING PURPOSE",
                          "PASSPORT APPLY PURPOSE",
                          "PASSPORT RENEWAL PURPOSE",
                          "CERTIFICATE CORRECTIONS",
                          "BANK ACCOUNT OPENING",
                          "INTERNSHIP - INDIVIDUAL",
                          "INTERNSHIP - GROUP",
                          "BANK LOAN",
                          "GIRL CHILD PROTECTION",
                          "SPORTS PARTICIPATION",
                          "PMSS BC MBC DNC SCHOLARSHIP",
                          "MINORITIES - NATIONAL SCHOLARSHIP",
                          "TAMILNADU UNORGANIZED WORKERS WELFARE BOARD",
                        ].map((purpose, index) => (
                          <MenuItem key={index} value={purpose}>
                            {purpose}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={data?.[0]?.photo}
                      alt="Jegan"
                      width="100"
                      height="100"
                    />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {checkApplyButton()}
                  </Box>
                </Box>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Dialog
            maxWidth="lg"
            open={modal1}
            justifyContent="center"
            onClose={handleClose1}
          >
            <DialogTitle>BONAFIDE CERTIFICATE</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <MDTypography>Name: {rowData?.[0]?.fname}</MDTypography>
                  <MDTypography>
                    Applied on: {rowData?.[0]?.applydate}
                  </MDTypography>
                  <MDTypography>Purpose: {rowData?.[0]?.purpose}</MDTypography>
                  <MDTypography>
                    Academic year: {rowData?.[0]?.ayear}
                  </MDTypography>
                  <MDTypography>
                    Date of Birth: {rowData?.[0]?.dob}
                  </MDTypography>
                  <MDTypography>Degree: {rowData?.[0]?.degree}</MDTypography>
                  <MDTypography>Department: {rowData?.[0]?.dept}</MDTypography>
                  <MDTypography>
                    Boarding: {rowData?.[0]?.boarding}
                  </MDTypography>
                  <MDBox>
                    {checkStatus(
                      rowData?.[0]?.status,
                      rowData?.[0]?.rejection_reason
                    )}
                  </MDBox>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  container
                  justifyContent="flex-end"
                  alignItems="flex-start"
                >
                  <img
                    src={rowData?.[0]?.photo}
                    alt="Jegan"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
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

export default Tables;
