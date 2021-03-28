import { Author } from '../common/interfaces';

export const getAuthors = (): Promise<Author[]> => {
  return fetch(`${process.env.REACT_APP_API}/authors`).then((response) => (response.json() as unknown) as Author[]);
};

export const updateAuthor = (author: Author): Promise<void> => {
  return (
    fetch(`${process.env.REACT_APP_API}/authors/${author.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(author),
    })
      // get rid of return value to stay clean
      .then(() => {})
      .catch((error) => {
        console.error('Error while updating author:', error);
      })
  );
};
