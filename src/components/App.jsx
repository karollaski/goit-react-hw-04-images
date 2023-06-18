import css from './App.module.css';
import Notiflix from 'notiflix';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { useEffect, useState } from 'react';
import fetchApi from './service/Api';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const getImages = async () => {
      try {
        setIsLoading(true);
        const imageData = await fetchApi(searchQuery, page);
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          Notiflix.Notify.warning(
            'No results were found for your search, please try something else.',
            {
              distance: '2px',
              cssAnimationStyle: 'from-right',
              showOnlyTheLastOne: 'true',
            }
          );
        }

        setImages(prevImages => [...prevImages, ...imagesHits]);
        setTotalPages(Math.ceil(imageData.totalHits / 12));
        setIsLoading(false);
      } catch (error) {
        console.error(`Sorry something went wrong. ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  return (
    <div className={css.App}>
      <SearchBar onSubmit={handleFormSubmit} />

      {images.length > 0 ? <ImageGallery images={images} /> : null}

      {isLoading ? <Loader /> : null}

      {images.length > 0 && totalPages !== page && !isLoading ? (
        <Button onClick={loadMore} />
      ) : null}
    </div>
  );
};

export default App;
