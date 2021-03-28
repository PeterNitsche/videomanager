import { Button, Icon } from '@material-ui/core';
import React from 'react';

interface SubmitButtonProps {
  onSubmit(): void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  return (
    <Button variant="contained" color="primary" startIcon={<Icon>save</Icon>} onClick={onSubmit}>
      Submit
    </Button>
  );
};
