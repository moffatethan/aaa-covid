import type { AppProps } from 'next/app';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [currentDefaultValues, setCurrentDefaultValues] = useState({});
  const methods = useForm();
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isBrowser) {
      const personalDetails = window.localStorage.getItem('personalDetails');
      if (personalDetails) {
        setCurrentDefaultValues(JSON.parse(personalDetails));
      }
    }
  }, [isBrowser]);

  useEffect(() => {
    for (const [key, value] of Object.entries(currentDefaultValues)) {
      methods.setValue(key, value);
    }
  }, [currentDefaultValues]);

  return !methods ? (
    <h1>Loading...</h1>
  ) : (
    <FormProvider {...methods}>
      <Component {...pageProps} />
    </FormProvider>
  );
}
export default MyApp;
