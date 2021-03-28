import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import React from 'react';

interface SearchInputProps {
  label: string;
  searchString?: string;
  onSearch(searchString: string): void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ label, searchString, onSearch }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      value={searchString || ''}
      onChange={(event) => {
        onSearch(event.target.value);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
