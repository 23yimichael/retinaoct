export interface Navigation {
  navigate: (
    route: string,
    params?: {
      patient?: Patient;
      scan?: Scan;
    }
  ) => void;
  goBack: () => void;
}

export interface Patient {
  id: number;
  mrn: string;
  doctorId: string;
  doctor: Doctor;
  notes: string;
  scans: Scan[];
  createdAt: Date;
  updatedAt: Date;
  updatedAtString: string;
}

export interface Scan {
  id: number;
  url: string;
  eye: string;
  diagnosis: string;
  note: string;
  doctorId: number;
  doctor: Doctor;
  patientId: number;
  patient: Patient;
  createdAt: Date;
  updatedAt: Date;
  updatedAtString: string;
}

export interface Doctor {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patients: Patient[];
  scans: Scan[];
  createdAt: Date;
  updatedAt: Date;
}
