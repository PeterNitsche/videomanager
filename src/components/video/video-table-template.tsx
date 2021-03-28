import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@material-ui/core';
import { ProcessedVideo } from '../../common/interfaces';
import { EditButton } from '../general/edit-button';
import { DeleteButton } from '../general/delete-button';
import { AddButton } from '../general/add-button';
import { SearchInput } from '../general/search-input';

interface VideosTableTemplateProps {
  videos: ProcessedVideo[];

  onEditVideo(videoId: number): void;
  onAddVideo(): void;
  onDeleteVideo(videoId: number): void;

  searchString?: string;
  onSearch(searchString: string): void;
}

export const VideosTableTemplate: React.FC<VideosTableTemplateProps> = ({
  videos,
  onSearch,
  searchString,
  onAddVideo,
  onEditVideo,
  onDeleteVideo,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchInput label="Search video" searchString={searchString} onSearch={onSearch} />
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Video Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell component="th" scope="row">
                    {video.name}
                  </TableCell>
                  <TableCell>{video.author.name}</TableCell>
                  <TableCell>{video.categories.map((category) => category.name).join(', ')}</TableCell>
                  <TableCell width={100}>
                    <Box display="flex" justifyContent="flex-end">
                      <Box marginRight={1}>
                        <EditButton onEdit={() => onEditVideo(video.id)} />
                      </Box>
                      <DeleteButton onDelete={() => onDeleteVideo(video.id)} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <AddButton onAdd={onAddVideo} />
      </Grid>
    </Grid>
  );
};
