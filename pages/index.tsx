import Head from 'next/head';
import parsePhoneNumber from 'libphonenumber-js';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { Send, Mail, Phone, Home } from 'react-feather';
import { ModalPortal } from '../components/Modal/Modal';
import { FormSection } from '../components/FormSection/FormSection';
import { FormInput } from '../components/FormInput/FormInput';
import { FormSelect } from '../components/FormSelection/FormSelection';
import { provinces } from '../data/provinces';
import { companies } from '../data/companies';
import { FormRadio } from '../components/FormRadio/FormRadio';
import { FormDescription } from '../components/FormDescription/FormDescription';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

export default function Index(): JSX.Element {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const [isRecognized, setIsRecognized] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [personalDetail, setPersonalDetails] = useState<{
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    province: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit, reset, setValue } = useFormContext();
  const formSubmit = async (data: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    province: string;
    companyName: string;
    lsdNumber: string;
    travelledOutside: 'yes' | 'no';
    closeContactTravelOutside: 'yes' | 'no';
    closeContactWithCovid: 'yes' | 'no';
    outsideGroup: 'yes' | 'no';
    isTested: 'yes' | 'no';
    symptons: 'yes' | 'no';
  }) => {
    if (isBrowser) {
      window.localStorage.setItem(
        'personalDetails',
        JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          emailAddress: data.emailAddress,
          phoneNumber: parsePhoneNumber(data.phoneNumber, 'US')?.formatNational(),
          province: data.province,
        }),
      );
    }
    setLoading(true);

    const res = await fetch('/api/mail', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      setLoading(false);
      reset();
    } else {
      console.error(res);
      setError(true);
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isBrowser) {
      const personalDetails = window.localStorage.getItem('personalDetails');
      if (personalDetails) {
        setIsRecognized(true);
        setPersonalDetails(JSON.parse(personalDetails));
      }
    }
  }, [isBrowser]);

  useEffect(() => {
    for (let [key, value] of Object.entries(personalDetail)) {
      if (key === 'phoneNumber') {
        value = parsePhoneNumber(value, 'US')?.number.toString().substring(2) || '';
      }
      setValue(key, value);
    }
  }, [personalDetail, isRecognized]);

  return (
    <div className="sm:mt-8">
      <Head>
        <title>AAA Field Services | COVID-19 Assessment</title>
        <link href="/favicon.png" rel="shortcut icon" />
      </Head>
      <ModalPortal />
      <div className="max-w-2xl mx-auto bg-white border border-gray-300 sm:rounded-lg">
        <Container>
          <Logo />
          <div className="mt-4 text-4xl font-bold text-gray-800 leading-snug">
            <h1>COVID-19 Assessment</h1>
          </div>
          <div className="mt-5 font-body">
            <p className="leading-relaxed opacity-75">
              Questions with{' '}
              <code>
                <span className="text-red-500 font-bold">*</span>
              </code>
              {` `}
              are required.
            </p>
          </div>
          {error ? (
            <div className="fixed bottom-0 left-0 bg-red-500 w-full p-4 text-white">
              <p>There was a problem sending the email.</p>
            </div>
          ) : null}
        </Container>
      </div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <FormSection
          section={{
            name: 'Personal Details',
          }}
          number={1}>
          {isRecognized ? (
            <div className="bg-white border border-gray-300 shadow-sm rounded-md">
              <div className="p-4">
                <h2 className="text-xl font-medium mb-2">
                  {personalDetail.firstName} {personalDetail.lastName}
                </h2>
                <p className="flex mb-2">
                  <Mail className="text-gray-300 mr-2" /> {personalDetail.emailAddress}
                </p>
                <p className="flex mb-2">
                  <Phone className="text-gray-300 mr-2" /> {personalDetail.phoneNumber}
                </p>
                <p className="flex">
                  <Home className="text-gray-300 mr-2" />{' '}
                  {provinces[provinces.findIndex((prov) => prov.value === personalDetail.province)].display}
                </p>
              </div>
              <div className="bg-gray-50 border-gray-300 shadow-sm rounded-b-md p-2 flex justify-end">
                <button
                  onClick={() => setIsRecognized(false)}
                  className="w-full border border-gray-300 shadow-sm bg-white rounded-md font-medium py-2 px-8 hover:bg-gray-50 transition-colors sm:w-auto">
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex gap-4">
                <div className="flex-1">
                  <FormInput label="First Name" type="text" name="firstName" isRequired />
                </div>
                <div className="flex-1">
                  <FormInput label="Last Name" type="text" name="lastName" isRequired />
                </div>
              </div>
              <FormInput label="Email Address" name="emailAddress" type="email" isRequired />
              <FormInput
                label="Phone Number"
                name="phoneNumber"
                type="phone"
                help="Your most available phone number"
                isRequired
              />
              <FormSelect label="Home Province" name="province" selectOptions={provinces} isRequired />
            </>
          )}
        </FormSection>
        <FormSection
          section={{
            name: 'Company Details',
          }}
          number={2}>
          <FormSelect label="Company Name" name="companyName" selectOptions={companies} isRequired />
          <FormInput label="LSD Number" name="lsdNumber" type="text" isRequired />
        </FormSection>
        <FormSection
          section={{
            name: 'Assessment',
          }}
          number={3}>
          <FormRadio
            label="Within the last 14 days, have you visited or travelled to any country(s) outside of Canada?"
            name="travelledOutside"
            type="radio"
            options={[{ label: 'Yes' }, { label: 'No' }]}
            isRequired
          />
          <FormRadio
            label="Within the last 14 days, have you been in close contact with a person(s) who has travelled outside of Canada?"
            name="closeContactTravelOutside"
            type="radio"
            options={[{ label: 'Yes' }, { label: 'No' }]}
            isRequired
          />
          <FormRadio
            label="Within the last 14 days, have you been in close contact with a person who has or is suspected of having the COVID-19 virus?"
            name="closeContactWithCovid"
            type="radio"
            options={[{ label: 'Yes' }, { label: 'No' }]}
            isRequired
          />
          <FormRadio
            label="Within the last 14 days, have you been in close contact with a group of 10 or more people outside of your immediate family?"
            name="outsideGroup"
            type="radio"
            options={[{ label: 'Yes' }, { label: 'No' }]}
            isRequired
          />
          <FormRadio
            label="Have you been tested for COVID-19 and are awaiting results?"
            name="isTested"
            type="radio"
            options={[{ label: 'Yes' }, { label: 'No' }]}
            isRequired
          />
        </FormSection>
        <FormSection
          section={{
            name: 'COVID-19 Symptons',
            details: <FormDescription />,
          }}
          number={4}>
          <FormRadio
            label="Do you have any of the following COVID-19 related symptons listed above?"
            name="symptons"
            type="radio"
            options={[{ label: 'Yes' }, { label: 'No' }]}
            isRequired
          />
        </FormSection>
        <Container>
          <button
            className="bg-blue-500 text-white p-5 rounded-md shadow-sm w-full transition-colors hover:bg-blue-600 ring-1 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none flex justify-center disabled:opacity-75 disabled:hover:bg-blue-500 disabled:cursor-not-allowed"
            disabled={loading}>
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span className="mr-2">
                <Send />
              </span>
            )}
            {loading ? 'Sending...' : 'Send Assessment'}
          </button>
        </Container>
      </form>
      <Container>
        <p className="text-gray-500">
          Copyright &copy; {new Date().getFullYear()} AAA Field Services. All rights reserved.
        </p>
      </Container>
    </div>
  );
}
