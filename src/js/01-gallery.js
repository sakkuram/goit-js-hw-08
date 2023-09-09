import { galleryItems } from './gallery-items.js';
import * as asd from 'basiclightbox';

const gallery = document.querySelector('.gallery');
let currentModal;

console.log(basicLightbox);

function renderGallery() {
  galleryItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('gallery__item');

    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.href = item.original;

    const image = document.createElement('img');
    image.classList.add('gallery__image');
    image.src = item.preview;
    image.alt = item.description;
    image.setAttribute('data-source', item.original);

    link.appendChild(image);
    listItem.appendChild(link);
    gallery.appendChild(listItem);
  });
}

function openModal(imageUrl) {
  const modalContent = `
    <div class="modal">
      <img src="${imageUrl}" alt="Full-size Image">
    </div>
  `;

  const modal = asd.create(modalContent);

  currentModal = modal;
  modal.show();

  document.addEventListener('keydown', closeModalOnEscape);
}

gallery.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('gallery__image')) {
    const largeImageUrl = e.target.dataset.source;
    openModal(largeImageUrl);
  }
});

function closeModalOnEscape(e) {
  if (e.key === 'Escape' && currentModal) {
    currentModal.close();
    currentModal = null;
    document.removeEventListener('keydown', closeModalOnEscape);
  }
}

renderGallery();
