import React from "react";
import { useState, useEffect } from "react";
import {
  Page,
  Image,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import logo1 from "logo.jpeg";
import logo2 from "krlogo.jpeg";
import photo from "download.jpeg";
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  logo1: {
    height: "50px",
    width: "150px",
    marginTop: "10px",
  },
  logo2: {
    height: "50px",
    width: "100px",
    marginTop: "5px",
    marginRight: "270px",
    marginLeft: "-20px",
  },
  logos: {
    flexDirection: "row",
    marginTop: "5x",
  },
  prin1: {
    marginTop: "30px",
    fontSize: "10px",
  },

  date: {
    fontSize: "10px",
    marginLeft: "400px",
  },
  topic: {
    marginTop: "60px",
    textAlign: "center",
    color: "blue",
    fontSize: "15px",
    fontWeight: "bold",
  },
  body: {
    marginHorizontal: "2px",
    fontSize: "14.5px",
    marginVertical: "30px",
  },
  dob: {
    fontSize: "12px",
  },
  photo: {
    height: "150px",
    width: "100px",
    position: "absolute",
    marginTop: "350px",
    marginLeft: "400px",
  },
  purpose: {
    marginTop: "150px",
    fontSize: "13px",
  },
  sign: {
    fontSize: "13px",
    marginTop: "120px",
    marginLeft: "350px",
    marginBottom: "110px",
  },
  container: {
    backgroundColor: "transparent",
    margin: "20px",
    border: "1px solid black",
    padding: "30px",
  },
});
// Create Document Component
export function MyDocument({ uid }) {
  console.log(uid);
  const [downloadData, setDownloadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/particularRow/${uid}`
        );
        const jsondata = await response.json();
        setDownloadData(jsondata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [uid]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {downloadData.length > 0 && (
            <>
              <View style={styles.logos}>
                <View>
                  <Image style={styles.logo2} src={logo2} />
                </View>
                <View>
                  <Image style={styles.logo1} src={logo1} />
                </View>
              </View>

              <View style={styles.prin1}>
                <Text>Dr. B.S.Murugan, M.Tech, Ph.D Principal</Text>
              </View>
              <View style={styles.date}>
                <Text>DATE : {downloadData[0].applydate}</Text>
              </View>
              <View style={styles.topic}>
                <Text>BONAFIDE CERTIFICATE</Text>
              </View>
              <View style={styles.body}>
                <Text>
                  This is to certify that JP (Reg No : {downloadData[0].regno},
                  Aadhar No : {downloadData[0].aadhar}) S/O Mr.{" "}
                  {downloadData[0].fathername} is a bonafide student of our
                  College, Studying in {downloadData[0].degree} during academic
                  year {downloadData[0].syear} during the academic year
                  {downloadData[0].ayear}
                </Text>
              </View>
              <View style={styles.dob}>
                <Text>Date of Birth : {downloadData[0].dob}</Text>
              </View>
              <View style={styles.dob}>
                <Text>Boarding : {downloadData[0].boarding}</Text>
              </View>
              <View style={styles.photo}>
                <Image src={downloadData[0].photo} />
              </View>
              <View style={styles.purpose}>
                <Text>
                  This certificate is issued for the purpose of{" "}
                  {downloadData[0].purpose}
                </Text>
              </View>
              <View style={styles.sign}>
                <Text>PRINCIPAL</Text>
              </View>
            </>
          )}
        </View>
      </Page>
    </Document>
  );
}
