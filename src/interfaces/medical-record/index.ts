import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MedicalRecordInterface {
  id?: string;
  patient_id: string;
  doctor_id: string;
  diagnosis: string;
  prescription?: string;
  notes?: string;
  date: any;
  created_at?: any;
  updated_at?: any;

  user_medical_record_patient_idTouser?: UserInterface;
  user_medical_record_doctor_idTouser?: UserInterface;
  _count?: {};
}

export interface MedicalRecordGetQueryInterface extends GetQueryInterface {
  id?: string;
  patient_id?: string;
  doctor_id?: string;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
}
