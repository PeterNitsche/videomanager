import { getCategories } from './categories';
import { getAuthors, updateAuthor } from './authors';
import { Author, Category, ProcessedVideo, Video } from '../common/interfaces';

export const getProcessedVideos = (): Promise<ProcessedVideo[]> => {
  return Promise.all([getCategories(), getAuthors()]).then(assembleVideos);
};

function assembleVideos([categories, authors]: [Category[], Author[]]): ProcessedVideo[] {
  const categoryById = createCategoryByIdMap(categories);
  return authors.reduce<ProcessedVideo[]>((videos, author) => videos.concat(processAuthorVideos(author, categoryById)), []);
}

type CategoryByIdMap = { [categoryId: number]: Category };
function createCategoryByIdMap(categories: Category[]): CategoryByIdMap {
  return categories.reduce<CategoryByIdMap>((map, category) => ({ ...map, [category.id]: category }), {});
}

function processAuthorVideos(author: Author, categoryById: CategoryByIdMap) {
  return author.videos.map<ProcessedVideo>((video) => ({
    id: video.id,
    name: video.name,
    author: author,
    categories: video.catIds.map((categoryId) => categoryById[categoryId]),
  }));
}

export const addVideo = ({ name, author, categories }: ProcessedVideo): Promise<void> => {
  // TODO: Generate ID on the server!
  return getProcessedVideos().then((videos) => {
    const maxId = videos.reduce((max, current) => (current.id > max ? current.id : max), 0) + 1;
    const newVideo: Video = {
      id: maxId + 1,
      name,
      catIds: categories.map((category) => category.id),
    };

    /**
     * Whole author needs to be updated since nested REST request is not possible with current db.json structure.
     * (e.g. POST request like authors/authorId/videos)
     * I'm not allowed to change db.json. :-)
     * Same for the other CRUD functions.
     */
    updateAuthor({
      ...author,
      videos: [...author.videos, newVideo],
    });
  });
};

export const editVideo = (video: ProcessedVideo): Promise<void> => {
  const { id, name, author, categories } = video;
  const editVideo: Video = {
    id,
    name,
    catIds: categories.map((category) => category.id),
  };

  const videoIndex = author.videos.findIndex((video) => video.id === id);

  // author has been changed and we need to remove it from the old author
  if (videoIndex === -1) {
    return removeVideo(id).then(() => addVideo(video));
  } else {
    return updateAuthor({
      ...author,
      videos: [...author.videos.slice(0, videoIndex), editVideo, ...author.videos.slice(videoIndex + 1, author.videos.length)],
    });
  }
};

export const removeVideo = (videoId: number): Promise<void> => {
  return getProcessedVideos().then((videos) => {
    const video = videos.find((video) => video.id === videoId);
    if (video === undefined) {
      throw Error(`Video with id ${videoId} doesn't exist anymore.`);
    }
    const { author } = video;
    const videoIdx = author.videos.findIndex((video) => video.id === videoId);
    return updateAuthor({
      ...author,
      videos: [...author.videos.slice(0, videoIdx), ...author.videos.slice(videoIdx + 1, author.videos.length)],
    });
  });
};
