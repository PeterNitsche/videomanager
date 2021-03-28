import React, { useEffect, useState } from 'react';
import { ProcessedVideo } from '../../common/interfaces';
import { getProcessedVideos, removeVideo } from '../../services/videos';
import { VideosTableTemplate } from './video-table-template';

interface VideosTableProps {
  onEditVideo(videoId: number): void;
  onAddVideo(): void;
}

export const VideosTable: React.FC<VideosTableProps> = ({ onEditVideo, onAddVideo }) => {
  const [videos, reloadVideos] = useVideos();
  const { filteredVideos, searchString, setSearchString } = useVideoSearch(videos);

  const onDelete = (videoId: number) => {
    removeVideo(videoId).then(reloadVideos);
  };
  return (
    <VideosTableTemplate
      videos={filteredVideos}
      searchString={searchString}
      onSearch={setSearchString}
      onEditVideo={onEditVideo}
      onDeleteVideo={onDelete}
      onAddVideo={onAddVideo}
    />
  );
};

function useVideos(): [ProcessedVideo[], () => void] {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);

  const reloadVideos = () => {
    getProcessedVideos().then(setVideos);
  };

  useEffect(reloadVideos, []);
  return [videos, reloadVideos];
}

function useVideoSearch(videos: ProcessedVideo[]) {
  const [searchString, setSearchString] = useState<string>();
  const [filteredVideos, setFilteredVideos] = useState<ProcessedVideo[]>([]);

  useEffect(() => {
    const filteredVideos = filterVideos(videos, searchString);
    setFilteredVideos(filteredVideos);
  }, [searchString, videos]);

  return {
    searchString,
    setSearchString,
    filteredVideos,
  };
}

// TODO: filter on the server if amount of videos gets too big.
function filterVideos(videos: ProcessedVideo[], searchString?: string) {
  const searchRegExp = new RegExp(searchString || '', 'i');
  return searchString
    ? videos.filter(
        (video) =>
          searchRegExp.test(video.name) ||
          searchRegExp.test(video.author.name) ||
          video.categories.some((category) => searchRegExp.test(category.name))
      )
    : videos;
}
