import * as yup from 'yup';

export const medicalRecordValidationSchema = yup.object().shape({
  diagnosis: yup.string().required(),
  prescription: yup.string().nullable(),
  notes: yup.string().nullable(),
  date: yup.date().required(),
  patient_id: yup.string().nullable().required(),
  doctor_id: yup.string().nullable().required(),
});
