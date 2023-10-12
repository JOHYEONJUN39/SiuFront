import { useState } from "react";
import styled from "styled-components";
import { Comment } from "../../types/Board.interface";
import CommentUI from "./CommentUI";
import { useMutation, useQueryClient } from "react-query";
import { WriteComment } from "../../types/Write.interface";
import { postComment } from "../../api/Comment/comment";
import { toast } from "react-toastify";

interface Props {
  postId: number;
  userId: string;
  comments: Comment[];
}

const Footer = ({ postId, userId, comments }: Props) => {
  const [comment, setComment] = useState("");
  const [commentOpen, setCommentOpen] = useState(false);

  const queryClient = useQueryClient();

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const writeMutate = useMutation((data: WriteComment) => postComment(data), {
    onSuccess: () => {
      setComment("");
      toast.success("댓글 작성에 성공하였습니다");
      queryClient.invalidateQueries("detail");
    },
    onError: () => {
      toast.error("댓글 작성에 실패하였습니다");
    },
  });

  const onSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      comment,
      post_id: postId,
      user_id: userId,
    };

    writeMutate.mutate(data);
  };

  return (
    <Container>
      <ToolWrapper>
        <CommentButton onClick={() => setCommentOpen(!commentOpen)}>
          댓글 {comments.length}
        </CommentButton>
      </ToolWrapper>

      <CommentBox $open={commentOpen}>
        <CommentHeader>댓글 {comments.length}</CommentHeader>

        <CommentBody>
          {comments ? (
            comments.map((comment: Comment) => (
              <CommentUI key={comment.id} comment={comment} userId={userId} />
            ))
          ) : (
            <NoComment>
              아직 댓글이 없습니다
              <br />첫 댓글을 달아보세요!
            </NoComment>
          )}
        </CommentBody>

        <form onSubmit={onSubmitComment}>
          <CommentInput>
            <CommentInputBox
              placeholder="댓글을 입력해주세요"
              value={comment}
              onChange={onChangeComment}
              name="comment"
            />
          </CommentInput>

          <CommentSubmit type="submit">등록</CommentSubmit>
        </form>
      </CommentBox>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 32px 0;
  border-top: 1px solid #a4a4a4;
  margin-top: 2rem;

  @media (max-width: 700px) {
    width: 500px;
  }
`;

const ToolWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CommentButton = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000;
  border: 1px solid #a4a4a4;
  border-radius: 42px;

  &:hover {
    color: #000;
  }
`;

const CommentBox = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  position: relative;
  width: 100%;
`;

const CommentHeader = styled.div`
  display: flex;
  height: 40px;
  border-bottom: 1px solid #a4a4a4;
  align-items: center;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const NoComment = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a4a4a4;
  line-height: 2;
  margin-bottom: 1rem;
`;

const CommentInput = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a4a4a4;
  line-height: 2;
`;

const CommentInputBox = styled.textarea`
  width: 100%;
  height: 60px;
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid #a4a4a4;
  border-radius: 4px;
  resize: none;
`;

const CommentSubmit = styled.button`
  width: 5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  cursor: pointer;
  color: #fff;
  font-size: 0.8rem;
  background-color: #a4a4a4;
  border: 1px solid #a4a4a4;
  border-radius: 2rem;
  margin-top: 0.5rem;

  &:hover {
    color: #000;
  }
`;
