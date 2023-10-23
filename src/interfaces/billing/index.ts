import { UserInterface } from 'interfaces/user';
import { ClinicInterface } from 'interfaces/clinic';
import { AppointmentInterface } from 'interfaces/appointment';
import { GetQueryInterface } from 'interfaces';

export interface BillingInterface {
  id?: string;
  patient_id: string;
  clinic_id: string;
  appointment_id: string;
  amount: number;
  payment_status: string;
  billing_date: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  clinic?: ClinicInterface;
  appointment?: AppointmentInterface;
  _count?: {};
}

export interface BillingGetQueryInterface extends GetQueryInterface {
  id?: string;
  patient_id?: string;
  clinic_id?: string;
  appointment_id?: string;
  payment_status?: string;
}
