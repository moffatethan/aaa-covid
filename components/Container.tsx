import { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  return <div className="max-w-2xl mx-auto p-6">{children}</div>;
};
