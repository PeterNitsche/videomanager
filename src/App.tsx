import React, { useState } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { VideosTable } from './components/video/videos-table';
import { VideoForm } from './components/video/video-form';

type AppState = { type: 'list' } | { type: 'add' } | { type: 'edit'; videoId: number };

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({ type: 'list' });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Videos</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '40px' }}>
        {appState.type === 'list' ? (
          <VideosTable onEditVideo={(videoId) => setAppState({ type: 'edit', videoId })} onAddVideo={() => setAppState({ type: 'add' })} />
        ) : (
          <VideoForm mode={appState} onClose={() => setAppState({ type: 'list' })} />
        )}
      </Container>
    </>
  );
};

export default App;
