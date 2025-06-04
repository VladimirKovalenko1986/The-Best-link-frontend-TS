import { createSlice } from '@reduxjs/toolkit';
import { fetchLinks, addLink, deleteLink, editLink } from './operations.ts';
import { logOut } from '../auth/operations.ts';
// import { selectTextFilter } from "../filtersSlice.js";

const slice = createSlice({
  name: 'links',
  initialState: {
    items: [],
    loading: {
      allLinks: false,
      addLink: false,
      deleteLink: false,
      editLink: false,
    },
    error: null,
    hasNextPage: false,
    currentPage: 1,
    filter: '',
    modal: {
      isOpen: false,
      modalLinkId: null,
      modalType: null,
    },
  },
  reducers: {
    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.modalLinkId = action.payload.id;
      state.modal.modalType = action.payload.type;
    },
    closeModal: state => {
      state.modal.isOpen = false;
      state.modal.modalLinkId = null;
      state.modal.modalType = null;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },

  extraReducers: builder =>
    builder
      .addCase(fetchLinks.pending, state => {
        state.loading.allLinks = true;
        state.error = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.items = action.payload.data;
        } else {
          state.items = [...state.items, ...action.payload.data];
        }
        state.hasNextPage = action.payload.hasNextPage;
        state.error = null;
        state.loading.allLinks = false;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.error = action.payload.data;
        state.loading.allLinks = false;
      })
      .addCase(addLink.pending, state => {
        state.loading.addLink = true;
        state.error = null;
      })
      .addCase(addLink.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
        state.error = null;
        state.loading.addLink = false;
      })
      .addCase(addLink.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.addLink = false;
      })
      .addCase(deleteLink.pending, state => {
        state.loading.deleteLink = true;
        state.error = null;
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.items = state.items.filter(
          item => item._id !== action.payload.id
        );
        state.error = null;
        state.loading.deleteLink = false;
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.deleteLink = false;
      })
      .addCase(editLink.pending, state => {
        state.loading.editLink = true;
        state.error = null;
      })
      .addCase(editLink.fulfilled, (state, action) => {
        const updatedLink = action.payload.data;
        const index = state.items.findIndex(
          item => item._id === updatedLink._id
        );

        if (index !== -1) {
          state.items[index] = updatedLink;
        }
        state.error = null;
        state.loading.editLink = false;
      })
      .addCase(editLink.rejected, (state, action) => {
        state.error = action.payload;
        state.loading.editLink = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.loading = {
          allLinks: false,
          addLink: false,
          deleteLink: false,
          editLink: false,
        };
        state.error = null;
      }),
});

export const { openModal, closeModal, setPage, setFilter } = slice.actions;
export default slice.reducer;
