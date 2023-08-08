import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { getImages } from '../api/api';

import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: {},
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery &&
      this.state.searchQuery.trim() !== ''
    ) {
      this.apiImages();
    }
  }

  apiImages = async () => {
    try {
      this.setState({ isLoading: true });
      const { searchQuery, page } = this.state;
      const data = await getImages(searchQuery, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        page: prevState.page + 1,
        totalHits: data.totalHits,
      }));
      if (this.state.page === 1)
        toast.success(`We found ${data.totalHits} images`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  handleLoadMoreClick = () => {
    this.apiImages();
  };

  handleImageClick = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: {} });
  };

  render() {
    const { images, isLoading, showModal, selectedImage, totalHits } =
      this.state;

    return (
      <div className={css.app}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              backgroundColor: '#f2b5c8',
              color: '#fff',
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            },
            iconTheme: {
              primary: '#f2b5c8',
              secondary: '#fff',
            },
          }}
        />
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              alt={image.tags}
              handleImageClick={this.handleImageClick}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && images.length < totalHits && (
          <Button onClick={this.handleLoadMoreClick} />
        )}
        {showModal && (
          <Modal
            largeImageURL={selectedImage.largeImageURL}
            alt={selectedImage.tags}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
