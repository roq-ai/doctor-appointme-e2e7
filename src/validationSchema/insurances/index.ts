import * as yup from 'yup';

export const insuranceValidationSchema = yup.object().shape({
  insurance_provider: yup.string().required(),
  policy_number: yup.string().required(),
  coverage_start_date: yup.date().required(),
  coverage_end_date: yup.date().required(),
  patient_id: yup.string().nullable().required(),
  clinic_id: yup.string().nullable().required(),
});
