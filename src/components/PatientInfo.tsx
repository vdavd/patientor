import { Patient, Diagnosis } from "../types";

interface PatientInfoProps {
  patient: Patient | null;
  diagnoses: Diagnosis[];
}
const PatientInfo = (props: PatientInfoProps) => {
  const getDiagnosis = (code: string) => {
    return props.diagnoses.find((diagnosis) => diagnosis.code === code);
  };

  if (props.patient) {
    return (
      <div>
        <h1>{props.patient.name}</h1>
        <div>gender: {props.patient.gender}</div>
        <div>ssn: {props.patient.ssn}</div>
        <div>occupation: {props.patient.occupation}</div>
        <h3>entries</h3>
        {props.patient.entries.map((e) => (
          <div key={e.id}>
            <div>
              {e.date} {e.description}
            </div>
            <ul>
              {e.diagnosisCodes?.map((code) => {
                const diagnosis = getDiagnosis(code);
                return (
                  <li key={code}>
                    {diagnosis?.code} {diagnosis?.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return <div></div>;
};

export default PatientInfo;
