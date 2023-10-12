export interface page {
  key : string
}

export interface props {
  pages : page[]
  activePage : string;
  setActivePage : React.Dispatch<React.SetStateAction<string>>
}