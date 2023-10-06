import { styled } from "styled-components"
import GalleryItem from "./GalleryItem"
import type GalleriesProps from "../../types/Galleries.interface"
import { useEffect, useState } from "react"
import { GetByTag } from "../../api/Search/Search"
type Post = {
  article: string;
  id: number;
  title: string;
  tag_name: [key: string];
  created_at: string;
  updated_at: string;
  user_id: string;
  view: number;
};
const Galleries = ({category} : GalleriesProps) => {
  const [tagContent, setTagContent] = useState<Post[]>([]);
  
  useEffect(() =>{
    async function getTagContent() {
      const data = await GetByTag(`#${category}`);
      setTagContent(data.data.sort(() => 0.5 - Math.random()).slice(0,4));
      console.log(data);
    }
    getTagContent();
  }
  , [])

  

  return (
    <GalleriesContainer>
      <GalleryCategory>{category}</GalleryCategory>
      <Gallery>
        {
          tagContent.map((content : Post, index) => {
            
            return <GalleryItem content={content} key={index} />
          })
        }
      </Gallery>
    </GalleriesContainer>
  )
}

export default Galleries

const GalleriesContainer = styled.div`
  width: 100%;
  height: 350px;
  font-size: 1.5rem;
  box-sizing: border-box;
  font-weight: bold;
`

const GalleryCategory = styled.div`
  width: 100%;
  height: 90px;
  font-size: 1.7rem;
  box-sizing: border-box;
  font-weight: bold;
  padding: 30px 0 0 30px;
`

const Gallery = styled.div`
  width: 100%;
  height: 260px;
  box-sizing: border-box;
  display: flex;
`

