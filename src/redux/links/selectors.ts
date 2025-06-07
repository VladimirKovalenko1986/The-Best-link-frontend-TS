import type { RootState } from '../types';

export const selectLinks = (state: RootState) => state.links.items;

export const selectLoadingAllLinks = (state: RootState) =>
  state.links.loading.allLinks;

export const selectLoadingAddLink = (state: RootState) =>
  state.links.loading.addLink;

export const selectLoadingDeleteLink = (state: RootState) =>
  state.links.loading.deleteLink;

export const selectLoadingEditLink = (state: RootState) =>
  state.links.loading.editLink;

export const selectError = (state: RootState) => state.links.error;

export const selectIsOpen = (state: RootState) => state.links.modal.isOpen;

export const selectModalLinkId = (state: RootState) =>
  state.links.modal.modalLinkId;

export const selectModalType = (state: RootState) =>
  state.links.modal.modalType;

export const selectHasNextPage = (state: RootState) => state.links.hasNextPage;

export const selectCurrentPage = (state: RootState) => state.links.currentPage;

export const selectFilter = (state: RootState) => state.links.filter;
