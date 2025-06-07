import { createSlice } from '@reduxjs/toolkit';
import { fetchLinks, addLink, deleteLink, editLink } from './operations.ts';
import { logOut } from '../auth/operations.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  LinksState,
  ModalType,
  FetchLinksParams,
  FetchLinksResponse,
  Link,
} from './links.type.ts';

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
  } as LinksState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ id: string; type: ModalType }>
    ) => {
      state.modal.isOpen = true;
      state.modal.modalLinkId = action.payload.id;
      state.modal.modalType = action.payload.type;
    },
    closeModal: state => {
      state.modal.isOpen = false;
      state.modal.modalLinkId = null;
      state.modal.modalType = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },

  extraReducers: builder =>
    builder
      .addCase(fetchLinks.pending, state => {
        state.loading.allLinks = true;
        state.error = null;
      })
      .addCase(
        fetchLinks.fulfilled,
        (
          state,
          action: PayloadAction<
            FetchLinksResponse,
            string,
            { arg: FetchLinksParams }
          >
        ): void => {
          const isFirstPage = action.meta.arg.page === 1;

          state.items = isFirstPage
            ? action.payload.data
            : [...state.items, ...action.payload.data];

          state.hasNextPage = action.payload.hasNextPage;
          state.loading.allLinks = false;
          state.error = null;
        }
      )
      .addCase(fetchLinks.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch links';
        state.loading.allLinks = false;
      })
      .addCase(addLink.pending, state => {
        state.loading.addLink = true;
        state.error = null;
      })
      .addCase(addLink.fulfilled, (state, action: PayloadAction<Link>) => {
        state.items.push(action.payload);
        state.error = null;
        state.loading.addLink = false;
      })
      .addCase(addLink.rejected, (state, action) => {
        state.error = action.payload || 'Failed to add link';
        state.loading.addLink = false;
      })
      .addCase(deleteLink.pending, state => {
        state.loading.deleteLink = true;
        state.error = null;
      })
      .addCase(
        deleteLink.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.items = state.items.filter(
            item => item._id !== action.payload.id
          );
          state.error = null;
          state.loading.deleteLink = false;
        }
      )
      .addCase(deleteLink.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete link';
        state.loading.deleteLink = false;
      })
      .addCase(editLink.pending, state => {
        state.loading.editLink = true;
        state.error = null;
      })
      .addCase(editLink.fulfilled, (state, action: PayloadAction<Link>) => {
        const updatedLink = action.payload;
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
        state.error = action.payload || 'Failed to edit link';
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
