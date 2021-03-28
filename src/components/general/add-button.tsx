import { Button, Icon } from '@material-ui/core';
import React from 'react';

interface AddButtonProps {
  onAdd(): void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onAdd }) => {
  return (
    <Button variant="contained" color="primary" startIcon={<Icon>add</Icon>} onClick={onAdd}>
      Add
    </Button>
  );
};
