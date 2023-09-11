import { styled } from "styled-components"
import GalleryItem from "./GalleryItem"
import type GalleriesProps from "../../types/Galleries.interface"

const Galleries = ({category} : GalleriesProps) => {
  return (
    <GalleriesContainer>
      <GalleryCategory>{category}</GalleryCategory>
      <Gallery>
        {/* map함수로 GalleryItem 랜더링 예정 */}
        <GalleryItem />
        <GalleryItem />
        <GalleryItem />
        <GalleryItem />
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

