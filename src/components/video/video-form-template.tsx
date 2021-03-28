import {
  Box,
  Paper,
  TextField,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Grid,
  Chip,
  Checkbox,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import React from 'react';
import { Author, Category, ProcessedVideo } from '../../common/interfaces';
import { CancelButton } from '../general/cancel-button';
import { SubmitButton } from '../general/submit-button';

const idPrefix = 'video-form-template-';

export interface VideoFormTemplateProps {
  title: string;
  validationError?: string;
  video: Partial<ProcessedVideo>;
  categories: Category[];
  authors: Author[];
  onVideoChange(video: Partial<ProcessedVideo>): void;
  onCancel(): void;
  onSubmit(): void;
}

export const VideoFormTemplate: React.FC<VideoFormTemplateProps> = ({
  title,
  validationError,
  categories,
  authors,
  video,
  onVideoChange,
  onSubmit,
  onCancel,
}) => {
  const onNameChange = (event: React.ChangeEvent<{ value: any }>) => {
    onVideoChange({ ...video, name: event.target.value });
  };

  const onCategoryChange = (event: React.ChangeEvent<{ value: any }>) => {
    const categoryIds = event.target.value as number[];
    const selectedCategories = categories.filter((category) => categoryIds.some((catId) => catId === category.id));
    onVideoChange({ ...video, categories: selectedCategories });
  };

  const onAuthorChange = (event: React.ChangeEvent<{ value: any }>) => {
    const authorId = event.target.value;
    const author = authors.find((author) => author.id === authorId);
    onVideoChange({ ...video, author });
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        {validationError && (
          <Grid item xs={12}>
            <Alert severity="error">{validationError}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            id={`${idPrefix}name`}
            label="Name"
            variant="outlined"
            value={video.name || ''}
            onChange={onNameChange}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel shrink htmlFor={`${idPrefix}author`}>
            Author
          </InputLabel>
          <Select
            id={`${idPrefix}author`}
            variant="outlined"
            value={video.author?.id || ''}
            onChange={onAuthorChange}
            style={{ width: '100%' }}>
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel shrink htmlFor={`${idPrefix}categories`}>
            Categories
          </InputLabel>
          <Select
            id={`${idPrefix}categories`}
            variant="outlined"
            multiple
            value={video.categories?.map((category) => category.id) || []}
            onChange={onCategoryChange}
            input={<Input />}
            renderValue={(selected) => (
              <>
                {(selected as number[]).map((value) => (
                  <Chip style={{ marginRight: 2 }} key={value} label={categories.find((category) => category.id === value)?.name} />
                ))}
              </>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
            style={{ width: '100%' }}>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                <Checkbox checked={video.categories?.some((cat) => category.id === cat.id) || false} />
                <ListItemText primary={category.name} />
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box marginRight={1}>
              <SubmitButton onSubmit={onSubmit} />
            </Box>
            <Box>
              <CancelButton onCancel={onCancel} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
