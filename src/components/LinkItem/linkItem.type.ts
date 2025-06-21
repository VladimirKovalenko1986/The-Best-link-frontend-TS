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

export type LinkItemProps = {
  link: {
    _id: string;
    nameType: NameType;
    link: string;
    nameLink: string;
    textLink: string;
    poster?: string | File;
  };
};
