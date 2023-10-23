import { UserInterface } from 'interfaces/user';
import { ClinicInterface } from 'interfaces/clinic';
import { GetQueryInterface } from 'interfaces';

export interface InsuranceInterface {
  id?: string;
  insurance_provider: string;
  policy_number: string;
  coverage_start_date: any;
  coverage_end_date: any;
  patient_id: string;
  clinic_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  clinic?: ClinicInterface;
  _count?: {};
}

export interface InsuranceGetQueryInterface extends GetQueryInterface {
  id?: string;
  insurance_provider?: string;
  policy_number?: string;
  patient_id?: string;
  clinic_id?: string;
}
