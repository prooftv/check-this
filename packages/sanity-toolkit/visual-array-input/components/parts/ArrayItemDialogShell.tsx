import type { MutableRefObject, PropsWithChildren } from 'react';
import { Card, Dialog, Flex, Heading } from '@sanity/ui';

interface Props {
  setIsOpen: (value: boolean) => void;
  dialogRef: MutableRefObject<HTMLDivElement | null>;
}

export function ArrayItemDialogShell({
  children,
  setIsOpen,
  dialogRef,
}: Readonly<PropsWithChildren<Props>>) {
  return (
    <Dialog
      id="visual-array-input-dialog"
      width={5}
      onClose={() => {
        setIsOpen(false);
      }}
      zOffset={1000}
      header={
        <Flex align="center" justify="space-between" gap={2}>
          <Heading as="h2" size={1}>
            Add item
          </Heading>
        </Flex>
      }
    >
      <Card paddingX={4} ref={dialogRef}>
        {children}
      </Card>
    </Dialog>
  );
}
