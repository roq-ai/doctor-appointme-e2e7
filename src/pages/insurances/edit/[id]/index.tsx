import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef, useMemo } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { useRoqClient, useInsuranceFindFirst } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';
import { convertQueryToPrismaUtil } from 'lib/utils';
import { insuranceValidationSchema } from 'validationSchema/insurances';
import { InsuranceInterface } from 'interfaces/insurance';
import { UserInterface } from 'interfaces/user';
import { ClinicInterface } from 'interfaces/clinic';

function InsuranceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const roqClient = useRoqClient();
  const queryParams = useMemo(
    () =>
      convertQueryToPrismaUtil(
        {
          id,
        },
        'insurance',
      ),
    [id],
  );
  const { data, error, isLoading, mutate } = useInsuranceFindFirst(queryParams, {}, { disabled: !id });
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: InsuranceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await roqClient.insurance.update({
        data: values as RoqTypes.insurance,
        where: {
          id,
        },
      });
      mutate(updated);
      resetForm();
      router.push('/insurances');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<InsuranceInterface>({
    initialValues: data,
    validationSchema: insuranceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Insurances',
              link: '/insurances',
            },
            {
              label: 'Update Insurance',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Insurance
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.insurance_provider}
            label={'Insurance Provider'}
            props={{
              name: 'insurance_provider',
              placeholder: 'Insurance Provider',
              value: formik.values?.insurance_provider,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.policy_number}
            label={'Policy Number'}
            props={{
              name: 'policy_number',
              placeholder: 'Policy Number',
              value: formik.values?.policy_number,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="coverage_start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Coverage Start Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.coverage_start_date ? new Date(formik.values?.coverage_start_date) : null}
              onChange={(value: Date) => formik.setFieldValue('coverage_start_date', value)}
            />
          </FormControl>
          <FormControl id="coverage_end_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Coverage End Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.coverage_end_date ? new Date(formik.values?.coverage_end_date) : null}
              onChange={(value: Date) => formik.setFieldValue('coverage_end_date', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'patient_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <AsyncSelect<ClinicInterface>
            formik={formik}
            name={'clinic_id'}
            label={'Select Clinic'}
            placeholder={'Select Clinic'}
            fetcher={() => roqClient.clinic.findManyWithCount({})}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/insurances')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'insurance',
    operation: AccessOperationEnum.UPDATE,
  }),
)(InsuranceEditPage);
