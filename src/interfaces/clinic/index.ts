import { AppointmentInterface } from 'interfaces/appointment';
import { BillingInterface } from 'interfaces/billing';
import { InsuranceInterface } from 'interfaces/insurance';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ClinicInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  appointment?: AppointmentInterface[];
  billing?: BillingInterface[];
  insurance?: InsuranceInterface[];
  user?: UserInterface;
  _count?: {
    appointment?: number;
    billing?: number;
    insurance?: number;
  };
}

export interface ClinicGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
