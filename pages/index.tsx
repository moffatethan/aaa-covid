import Head from 'next/head';
import { Container } from '../components/Container';
import { FormSection } from '../components/FormSection/FormSection';
import { Logo } from '../components/Logo';
import { useQuestionBank } from '../context/useQuestionBank';

export default function Home(): JSX.Element {
  const { sections } = useQuestionBank();
  return (
    <div className="sm:mt-8">
      <Head>
        <title>AAA Field Services | COVID-19 Assessment</title>
        <link href="/favicon.png" rel="shortcut icon" />
      </Head>
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
        </Container>
      </div>
      {sections.length === 0 ? (
        <div className="mt-4 font-body">
          <p>There are no questions. Add some question sections to the question bank to get started.</p>
        </div>
      ) : (
        <FormSection section={sections[0]} />
      )}
    </div>
  );
}
