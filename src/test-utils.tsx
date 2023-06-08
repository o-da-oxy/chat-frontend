import React from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import store from './state/store';
import { MemoryRouter } from 'react-router-dom';
interface Props {
  children: React.ReactNode;
}

const TestProvider: React.FC<Props> = ({ children }) => {
  return (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
};
const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return render(ui, { wrapper: TestProvider, ...options });
};

export * from '@testing-library/react';
export { customRender };
