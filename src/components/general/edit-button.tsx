import { Button, Icon } from '@material-ui/core';
import React from 'react';

interface EditButtonProps {
  onEdit(): void;
}

export const EditButton: React.FC<EditButtonProps> = ({ onEdit }) => {
  return (
    <Button variant="contained" color="primary" startIcon={<Icon>edit</Icon>} onClick={onEdit}>
      Edit
    </Button>
  );
};
