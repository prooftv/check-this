import { Button } from '@sanity/ui';
import { AddIcon } from '@sanity/icons';

export function VisualArrayInputArrayFunctionsFn(
  openVisualArrayInput: (handleAdd?: unknown) => void,
) {
  return function ArrayFunctions() {
    return (
      <Button
        text="Add item..."
        icon={AddIcon}
        mode="ghost"
        onClick={() => {
          openVisualArrayInput();
        }}
      />
    );
  };
}
