import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    page: null,
    items: [],
    isLoading: false,
    searchWord: '',
    isModalOpen: false,
    bigPicture: '',
    total: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchWord, page, isLoading } = this.state;

    if (prevState.searchWord !== searchWord || prevState.page !== page) {
      if (!isLoading) {
        this.setState({ isLoading: true });
      }

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
          if (prevState.total !== r.total) {
            this.setState({ total: r.total });
          }
          return r.hits.map(el => {
            const itemId = el.id;
            const itemPicture = el.webformatURL;
            const itemlargeImage = el.largeImageURL;

            return { itemId, itemPicture, itemlargeImage };
          });
        })
        .catch(error => console.log(error));
      this.setState(prevState => {
        return {
          items: [...prevState.items, ...moreItems],
          isLoading: false,
        };
      });
    }
  }
  submitForm = async e => {
    e.preventDefault();
    const inputValue = e.currentTarget.elements.formInput.value;

    if (inputValue) {
      this.setState(prevState => {
        if (prevState.searchWord !== inputValue) {
          return {
            page: 1,
            searchWord: inputValue,
            items: [],
          };
        }
      });
    }
  };

  loadMore = async e => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  openModal = e => {
    const chosenItem = this.state.items.find(
      el => el.itemId.toString() === e.currentTarget.id
    );
    this.setState({
      isModalOpen: true,
      bigPicture: chosenItem.itemlargeImage,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { items, isLoading, isModalOpen, bigPicture, total } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.submitForm} />
        <ImageGallery>
          {items.map(el => (
            <ImageGalleryItem
              key={el.itemId}
              item={el}
              openModal={this.openModal}
            />
          ))}
        </ImageGallery>
        {items.length > 0 && items.length !== total && (
          <Button loadMore={this.loadMore} />
        )}
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal bigPicture={bigPicture} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
