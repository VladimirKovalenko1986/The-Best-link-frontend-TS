export const selectLinks = (state) => state.links.items;

export const selectLoadingAllLinks = (state) => state.links.loading.allLinks;

export const selectLoadingAddLink = (state) => state.links.loading.addLink;

export const selectLoadingDeleteLink = (state) =>
  state.links.loading.deleteLink;

export const selectLoadingEditLink = (state) => state.links.loading.editLink;

export const selectError = (state) => state.links.error;

export const selectIsOpen = (state) => state.links.modal.isOpen;

export const selectModalLinkId = (state) => state.links.modal.modalLinkId;

export const selectModalType = (state) => state.links.modal.modalType;

export const selectHasNextPage = (state) => state.links.hasNextPage;

export const selectCurrentPage = (state) => state.links.currentPage;

export const selectFilter = (state) => state.links.filter;
