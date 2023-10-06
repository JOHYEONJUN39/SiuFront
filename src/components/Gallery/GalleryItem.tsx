import DOMPurify from "dompurify";
import { styled } from "styled-components"

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

const GalleryItem = ({content} : {content : Post}) => {
  const article = content.article;
  const displayedTitleText = article.length > 50 ? `${article.substring(0,50)}...` : article;
  
  return (
    <GalleryItems>
      <GalleryItemImageCon>
        <GalleryItemImage src="https://resize.blogsys.jp/c3cd8a2c434824d88dc3a9b1397c7954d3ff3857/crop1/343x343/https://livedoor.blogimg.jp/shibainu_donguri/imgs/a/8/a875be26.png" alt="" />
      </GalleryItemImageCon>
      <GalleryItemTitle 
        dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(displayedTitleText || '').replace(/<\/?p>/g, ''),
        }} />
    </GalleryItems>
  )
}

export default GalleryItem

const GalleryItemImageCon = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 30px 30px 0 0;
  box-sizing: border-box;
`

const GalleryItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px 30px 0 0;
`

const GalleryItemTitle = styled.div`
  width: 100%;
  height: 80px;
  font-size: 1rem;
  line-height: 1.3;
  border-radius: 0 0 30px 30px;
  box-sizing: border-box;
  padding: 10px 20px;
  display: flex;
  align-items: flex-start;
  transition: background-color 0.1s ease-in-out;
`
const GalleryItems = styled.div`
  width: 280px;
  height: 100%;
  border-radius: 30px;
  box-sizing: border-box;
  &:not(:last-child) {
    margin-right: 40px;
  }
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1);
    & ${GalleryItemTitle} {
      background-color: #E5F5FF;
    }
  } 
`