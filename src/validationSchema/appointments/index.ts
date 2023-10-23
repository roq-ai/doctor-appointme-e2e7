import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  appointment_date: yup.date().required(),
  appointment_time: yup.date().required(),
  status: yup.string().required(),
  patient_id: yup.string().nullable().required(),
  doctor_id: yup.string().nullable().required(),
  clinic_id: yup.string().nullable().required(),
});
