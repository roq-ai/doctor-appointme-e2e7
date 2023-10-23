import * as yup from 'yup';

export const billingValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  payment_status: yup.string().required(),
  billing_date: yup.date().required(),
  patient_id: yup.string().nullable().required(),
  clinic_id: yup.string().nullable().required(),
  appointment_id: yup.string().nullable().required(),
});
