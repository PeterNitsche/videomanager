import { Button, Icon } from '@material-ui/core';
import React from 'react';

interface DeleteButtonProps {
  onDelete(): void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <Button variant="contained" color="secondary" startIcon={<Icon>remove</Icon>} onClick={onDelete}>
      Delete
    </Button>
  );
};
