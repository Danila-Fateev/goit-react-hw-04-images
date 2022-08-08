import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export function App() {
  const [page, setPage] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bigPicture, setBigPicture] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (!isLoading) setIsLoading(true);
      const moreItems = await fetch(
        `https://pixabay.com/api/?q=${searchWord}&page=${page}&key=27675022-eae91b965f306fbe1611b8e88&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(r => {
          if (r.ok) {
            return r.json();
          }
          Promise.reject(new Error('error'));
        })
        .then(r => {
          setTotal(r.total);
          return r.hits.map(el => {
            const itemId = el.id;
            const itemPicture = el.webformatURL;
            const itemlargeImage = el.largeImageURL;

            return { itemId, itemPicture, itemlargeImage };
          });
        })
        .catch(error => console.log(error));
      setItems([...items, ...moreItems]);
      setIsLoading(false);
    }
    if (!searchWord) return;
    fetchData();
  }, [page, searchWord]);

  const submitForm = async e => {
    e.preventDefault();
    const inputValue = e.currentTarget.elements.formInput.value;

    if (inputValue) {
      setSearchword(inputValue);
      setPage(1);
      setItems([]);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = e => {
    const chosenItem = items.find(
      el => el.itemId.toString() === e.currentTarget.id
    );
    setIsModalOpen(true);
    setBigPicture(chosenItem.itemlargeImage);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Searchbar onSubmit={submitForm} />
      <ImageGallery>
        {items.map(el => (
          <ImageGalleryItem key={el.itemId} item={el} openModal={openModal} />
        ))}
      </ImageGallery>
      {items.length > 0 && items.length !== total && (
        <Button loadMore={loadMore} />
      )}
      {isLoading && <Loader />}
      {isModalOpen && <Modal bigPicture={bigPicture} closeModal={closeModal} />}
    </div>
  );
}
