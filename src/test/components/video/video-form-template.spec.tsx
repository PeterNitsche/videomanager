import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { VideoFormTemplate } from '../../../components/video/video-form-template';

describe('VideoFormTemplate', () => {
  const title = 'Form Test Title';
  const validationMessage = 'Error. Please fix.';
  const video = { name: 'VideoTestName' };

  function setupFormTemplate() {
    const onVideoChangeMock = jest.fn();
    render(
      <VideoFormTemplate
        title={title}
        validationError={validationMessage}
        video={video}
        authors={[]}
        categories={[]}
        onCancel={() => {}}
        onSubmit={() => {}}
        onVideoChange={onVideoChangeMock}
      />
    );

    return { onVideoChangeMock };
  }

  it('Displays the title', () => {
    setupFormTemplate();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('Displays the video name', () => {
    setupFormTemplate();
    expect(screen.getByLabelText('Name')).toHaveValue(video.name);
  });

  it('Displays the validation error as alert', () => {
    setupFormTemplate();
    expect(screen.getByRole('alert')).toHaveTextContent(validationMessage);
  });

  describe('When inserting a video name', () => {
    it('calls onVideoChange with the new name', () => {
      const { onVideoChangeMock } = setupFormTemplate();
      fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New Video' } });
      expect(onVideoChangeMock).toBeCalledTimes(1);
      const expectedVideo = { ...video, name: 'New Video' };
      const actualVideo = onVideoChangeMock.mock.calls[0][0];
      expect(actualVideo).toEqual(expectedVideo);
    });
  });
});
