import { type ReactNode, useMemo } from 'react';
import {
  VisualArrayInputContext,
  type VisualArrayInputContextProps,
} from '../context/VisualArrayInputContext';

interface Props extends VisualArrayInputContextProps {
  children: ReactNode;
}

export const VisualArrayInputProvider = (props: Props) => {
  const { children, openVisualArrayInput } = props;

  const contextValue: VisualArrayInputContextProps = useMemo(
    () => ({ openVisualArrayInput }),
    [openVisualArrayInput],
  );

  return (
    <VisualArrayInputContext.Provider value={contextValue}>
      {children}
    </VisualArrayInputContext.Provider>
  );
};
