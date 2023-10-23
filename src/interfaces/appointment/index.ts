import { BillingInterface } from 'interfaces/billing';
import { UserInterface } from 'interfaces/user';
import { ClinicInterface } from 'interfaces/clinic';
import { GetQueryInterface } from 'interfaces';

export interface AppointmentInterface {
  id?: string;
  appointment_date: any;
  appointment_time: any;
  patient_id: string;
  doctor_id: string;
  clinic_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;
  billing?: BillingInterface[];
  user_appointment_patient_idTouser?: UserInterface;
  user_appointment_doctor_idTouser?: UserInterface;
  clinic?: ClinicInterface;
  _count?: {
    billing?: number;
  };
}

export interface AppointmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  patient_id?: string;
  doctor_id?: string;
  clinic_id?: string;
  status?: string;
}
