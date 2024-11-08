import { Card, Text, Flex } from '@sanity/ui';
import styled from 'styled-components';
import { useColorSchemeValue } from 'sanity';
import type { Item } from '../../types';
import type { PropsWithChildren } from 'react';

interface Props {
  item: Item;
}

const StyledItemGridCardWrapper = styled(Card)<{ $currentScheme?: 'light' | 'dark' }>`
  --hover-bg: ${(props) => (props.$currentScheme === 'light' ? '#F2F3F5' : '#2A2C30')};

  all: initial;
  padding: 0.75em;
  border-radius: 0.1875rem;
  grid-template-rows: auto 1fr;
  gap: 0.75rem;

  &:hover {
    background: var(--hover-bg);
    cursor: pointer;
  }
`;

export function ItemGridCardWrapper({
  children,
  onClick,
  ...props
}: Readonly<PropsWithChildren<{ onClick: () => unknown }>>) {
  const scheme = useColorSchemeValue();

  return (
    <StyledItemGridCardWrapper
      {...props}
      display="grid"
      role="button"
      tone="transparent"
      padding={2}
      radius={2}
      style={{ position: 'relative' }}
      onClick={onClick}
      $currentScheme={scheme}
    >
      {children}
    </StyledItemGridCardWrapper>
  );
}
