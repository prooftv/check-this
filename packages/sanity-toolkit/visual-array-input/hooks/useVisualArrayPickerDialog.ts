import { useState, useRef, useCallback } from 'react';
import { useClickOutsideEvent } from '@sanity/ui';

export function useVisualArrayPickerDialog() {
  const [isOpen, _setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [gridView, setGridView] = useState(true);
  const dialogRef = useRef(null);

  const setIsOpen = useCallback(
    (state: boolean) => {
      if (!state) {
        setSearchQuery('');
      }
      _setIsOpen(state);
    },
    [_setIsOpen, setSearchQuery],
  );

  useClickOutsideEvent(
    () => {
      setIsOpen(false);
    },
    () => [dialogRef.current],
  );

  const openVisualArrayInput = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    openVisualArrayInput,
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    gridView,
    setGridView,
    dialogRef,
  };
}
