type NameType =
  | 'HTML&CSS'
  | 'JS'
  | 'React'
  | 'TS'
  | 'Node.js'
  | 'Video/HTML&CSS'
  | 'Video/JS'
  | 'Video/React'
  | 'Video/TS'
  | 'Video/Node.js';

export type ModalType = 'edit' | 'delete' | 'view' | null;

export type Link = {
  _id: string;
  nameType: NameType;
  link: string;
  nameLink: string;
  textLink: string;
  poster?: string;
};

export type EditLinkResponse = {
  status: number;
  message: string;
  data: Link;
};

export type LinksState = {
  items: Link[];
  loading: {
    allLinks: boolean;
    addLink: boolean;
    deleteLink: boolean;
    editLink: boolean;
  };
  error: string | null;
  hasNextPage: boolean;
  currentPage: number;
  filter: string;
  modal: {
    isOpen: boolean;
    modalLinkId: string | null;
    modalType: ModalType;
  };
};

export type FetchLinksParams = {
  page?: number;
  limit?: number;
  filter?: string;
};

export type FetchLinksResponse = {
  data: Link[];
  hasNextPage: boolean;
};

export type LinkDto = Omit<Link, '_id'>;
export type LinkEdit = Partial<Omit<Link, '_id'>> & {
  poster?: string | File;
};

export type EditLinkParams = {
  linkId: string;
  linkData: LinkEdit;
};
