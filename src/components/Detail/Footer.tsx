import { useState } from "react";
import styled from "styled-components"

const Footer = () => {
  const [comment, setComment] = useState('');
  const [commentOpen, setCommentOpen] = useState(false);

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }

  return (
    <Container>

      <ToolWrapper>
        <CommentButton
          onClick={() => setCommentOpen(!commentOpen)}
        >
          댓글
        </CommentButton>
      </ToolWrapper>

      <CommentBox $open={commentOpen}>

        <CommentHeader>
          댓글 0
        </CommentHeader>

        <CommentBody>
          <NoComment>
            아직 댓글이 없습니다<br />
            첫 댓글을 달아보세요!
          </NoComment>
        </CommentBody>

        <CommentInput>
          <CommentInputBox 
            placeholder="댓글을 입력해주세요"
            value={comment}
            onChange={onChangeComment}
          />
        </CommentInput>

      </CommentBox>

    </Container>
  )
}

export default Footer

const Container = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 32px 0;
  border-top: 1px solid #A4A4A4;
`

const ToolWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const CommentButton = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000;
  border: 1px solid #A4A4A4;
  border-radius: 42px;

  &:hover {
    color: #000;
  }
`

const CommentBox = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => $open ? 'block' : 'none'};
  position: relative;
  width: 100%;
`

const CommentHeader = styled.div`
  display: flex;
  height: 40px;
  padding-bottom: 1rem;
  border-bottom: 1px solid #A4A4A4;
  align-items: center;
`

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`

const NoComment = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #A4A4A4;
  line-height: 2;
  margin-bottom: 1rem;
`

const CommentInput = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #A4A4A4;
  line-height: 2;
`

const CommentInputBox = styled.textarea`
  width: 100%;
  height: 60px;
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid #A4A4A4;
  border-radius: 4px;
  resize: none;
`