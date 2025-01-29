import { Patient } from "../types";

interface PatientInfoProps {
  patient: Patient | null;
}
const PatientInfo = (props: PatientInfoProps) => {
  if (props.patient) {
    return (
      <div>
        <h1>{props.patient.name}</h1>
        <div>gender: {props.patient.gender}</div>
        <div>ssn: {props.patient.ssn}</div>
        <div>occupation: {props.patient.occupation}</div>
      </div>
    );
  }
  return <div></div>;
};

export default PatientInfo;
