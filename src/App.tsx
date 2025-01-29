import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfo";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const match = useMatch("/api/patients/:id");

  const id = match ? match.params.id : null;

  useEffect(() => {
    const getPatient = async (id: string) => {
      const newPatient = await patientService.getOne(id);
      setPatient(newPatient);
    };
    if (id) {
      getPatient(id);
    }
  }, [id]);

  //const fetchPatientData = async (id: string | undefined) => {
  //  if (id) {
  //    const patient = await patientService.getOne(id);
  //    console.log(patient);
  //    return patient;
  //  }
  //  return null;
  //};
  //console.log(match?.params.id);
  //const patient = fetchPatientData(match?.params.id);
  //console.log("here");
  //console.log(patient);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/api/patients/:id"
            element={<PatientInfo patient={patient} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
