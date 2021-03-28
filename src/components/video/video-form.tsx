import React, { useEffect, useState } from 'react';
import { Author, Category, ProcessedVideo } from '../../common/interfaces';
import { getAuthors } from '../../services/authors';
import { getCategories } from '../../services/categories';
import { addVideo, editVideo, getProcessedVideos } from '../../services/videos';
import { VideoFormTemplate } from './video-form-template';

type VideoFormMode = { type: 'add' } | { type: 'edit'; videoId: number };
interface VideoFormProps {
  mode: VideoFormMode;
  onClose(): void;
}

export const VideoForm: React.FC<VideoFormProps> = ({ mode, onClose }) => {
  const categories = useCategories();
  const authors = useAuthors();
  const [video, setVideo] = useVideo(mode);
  const [validationMessage, validate] = useValidation();

  const title = mode.type === 'edit' ? 'Edit video' : 'Add video';

  const onSubmit = () => {
    if (video === undefined) {
      return;
    }
    const validationResult = validate(video);
    if (!validationResult.valid) {
      return;
    }
    (mode.type === 'edit' ? editVideo : addVideo)(validationResult.video).then(onClose);
  };

  return categories && authors && video ? (
    <VideoFormTemplate
      title={title}
      validationError={validationMessage}
      categories={categories}
      authors={authors}
      video={video}
      onVideoChange={setVideo}
      onSubmit={onSubmit}
      onCancel={onClose}
    />
  ) : null;
};

function useCategories() {
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return categories;
}

function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>();

  useEffect(() => {
    getAuthors().then(setAuthors);
  }, []);

  return authors;
}

function useVideo(mode: VideoFormMode): [Partial<ProcessedVideo> | undefined, (video: ProcessedVideo) => void] {
  const [video, setVideo] = useState<Partial<ProcessedVideo>>();

  useEffect(() => {
    if (mode.type === 'edit') {
      getProcessedVideos().then((videos) => {
        const video = videos.find((video) => video.id === mode.videoId);
        if (video !== undefined) {
          setVideo(video);
        } else {
          console.error(`Cannot find video with id ${mode.videoId}`);
        }
      });
    } else {
      setVideo({ id: -1 });
    }
  }, [mode]);

  return [video, setVideo];
}

function useValidation(): [
  string | undefined,
  (video: Partial<ProcessedVideo>) => { valid: true; video: ProcessedVideo } | { valid: false }
] {
  const [message, setMessage] = useState<string>();

  const validate = (video: Partial<ProcessedVideo>) => {
    let message: string | undefined;
    let result: { valid: true; video: ProcessedVideo } | { valid: false } = { valid: false };
    if (video.id === undefined) {
      message = 'Internal Error! No Video ID defined.';
    } else if (!video.name) {
      message = 'Please insert a name!';
    } else if (!video.author) {
      message = 'Please assign an author!';
    } else if (!video.categories || video.categories?.length === 0) {
      message = 'Please assign at least one category!';
    } else {
      result = {
        valid: true,
        video: {
          id: video.id,
          name: video.name,
          author: video.author,
          categories: video.categories,
        },
      };
    }
    setMessage(message);
    return result;
  };
  return [message, validate];
}
