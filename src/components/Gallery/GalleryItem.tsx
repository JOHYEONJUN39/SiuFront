import DOMPurify from "dompurify";
import { styled } from "styled-components"
import { articleToThumbnail } from "../../hooks/articleToThumbnail";
import { useNavigate } from "react-router-dom";
import { Post } from "../../types/PostData.interface";

const GalleryItem = ({content} : {content : Post}) => {
  const navigate = useNavigate();
  const article = content.article;
  const displayedTitleText = article.length > 50 ? `${article.substring(0,50)}...` : article;
  
  const navigatePost = () => {
    navigate(`/posts/${content.id}`);
  }
  

  return (
    <GalleryItems onClick={navigatePost}>
      <GalleryItemImageCon>
        <GalleryItemImage src={articleToThumbnail(content.article)} alt="" />
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
  display: flex;
  justify-content: center;
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