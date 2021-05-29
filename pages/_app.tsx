import type { AppProps } from 'next/app';
import { QuestionProvider } from '../context/useQuestionBank';
import { questionBank } from '../data/questions';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QuestionProvider initialSections={questionBank.store}>
      <Component {...pageProps} />
    </QuestionProvider>
  );
}
export default MyApp;
