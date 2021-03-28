import { Button, Icon } from '@material-ui/core';
import React from 'react';

interface CancelButtonProps {
  onCancel(): void;
}

export const CancelButton: React.FC<CancelButtonProps> = ({ onCancel }) => {
  return (
    <Button variant="outlined" color="secondary" startIcon={<Icon>cancel</Icon>} onClick={onCancel}>
      Cancel
    </Button>
  );
};
