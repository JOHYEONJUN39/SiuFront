import styled from "styled-components";
import { Comment } from "../../types/Board.interface";
import { useTimeStamp } from "../../hooks/useTimeStamp";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useMutation, useQueryClient } from "react-query";
import {
  DeleteComment,
  DisLikeComment,
  EditWriteComment,
  LikeComment,
} from "../../types/Write.interface";
import {
  deleteComment,
  editComment,
  likeComment,
  unlikeComment,
} from "../../api/Comment/comment";
import { toast } from "react-toastify";

interface Props {
  comment: Comment;
  userId: string;
}

const CommentUI = ({ comment, userId }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editCommentText, setEditCommentText] = useState<string>("");

  const queryClient = useQueryClient();

  const timeAgo = useTimeStamp(comment.created_at);

  const changeEdit = () => {
    setEdit(!edit);
    setEditCommentText(comment.comment);
  };

  const editMutation = useMutation(
    (data: EditWriteComment) => editComment(data),
    {
      onSuccess: () => {
        setEdit(false);
        toast.success("수정되었습니다");
        queryClient.invalidateQueries("detail");
      },
      onError: () => {
        toast.error("수정에 실패하였습니다");
      },
    }
  );

  const deleteMutation = useMutation(
    (data: DeleteComment) => deleteComment(data),
    {
      onSuccess: () => {
        toast.success("삭제되었습니다");
        queryClient.invalidateQueries("detail");
      },
      onError: () => {
        toast.error("삭제에 실패하였습니다");
      },
    }
  );

  const likeMutation = useMutation((data: LikeComment) => likeComment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("detail");
    },
    onError: () => {
      toast.error("좋아요 실패");
    },
  });

  const disLikeMutation = useMutation(
    (data: DisLikeComment) => unlikeComment(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("detail");
      },
      onError: () => {
        toast.error("좋아요 취소 실패");
      },
    }
  );

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditCommentText(e.target.value);
  };

  const handleEdit = () => {
    const data = {
      comment_id: comment.id,
      comment: editCommentText,
    };

    editMutation.mutate(data);
  };

  const handleDelete = () => {
    const data = {
      comment_id: comment.id,
    };

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    deleteMutation.mutate(data);
  };

  const handleLike = () => {
    const data = {
      comment_id: comment.id,
      user_id: userId,
    };

    likeMutation.mutate(data);
  };

  const handleDisLike = () => {
    const data = {
      comment_id: comment.id,
      user_id: userId,
    };

    disLikeMutation.mutate(data);
  };

  return (
    <Container>
      <CommentHeader>
        <CommentInfo>
          <CommentUserImg src={comment.user.profile_image} alt="user" />

          <CommentUser>
            <div className="user_id">{comment.user_id}</div>
            <div className="time_ago">{timeAgo}</div>
          </CommentUser>
        </CommentInfo>

        {comment.user_id === userId && (
          <ToolBox>
            <div className="edit" onClick={changeEdit}>
              수정
            </div>
            <div className="delete" onClick={handleDelete}>
              삭제
            </div>
          </ToolBox>
        )}
      </CommentHeader>

      <CommentBody>
        {edit ? (
          <EditBox>
            <Edit value={editCommentText} onChange={handleComment} />
            <EditButton onClick={handleEdit}>수정</EditButton>
          </EditBox>
        ) : (
          <Content>{comment.comment}</Content>
        )}

        {comment.liked ? (
          <CommentLike onClick={handleDisLike}>
            <FcLike />
            <div className="like__count">{comment.like_count}</div>
          </CommentLike>
        ) : (
          <CommentLike onClick={handleLike}>
            <AiOutlineHeart />
            <div className="like__count">{comment.like_count}</div>
          </CommentLike>
        )}
      </CommentBody>
    </Container>
  );
};

export default CommentUI;

const Container = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CommentUserImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 1rem;
  background-color: #000;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CommentUser = styled.div`
  display: flex;
  flex-direction: column;

  & > .user_id {
    font-size: 0.8rem;
    font-weight: 600;
  }

  & > .time_ago {
    font-size: 0.8rem;
    color: #a4a4a4;
  }
`;

const CommentBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  white-space: pre-line;
`;

const EditBox = styled.div`
  display: flex;
  width: 100%;
`;

const Edit = styled.textarea`
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  resize: none;
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 0.1rem;
`;

const EditButton = styled.div`
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  background-color: #f2f2f2;
  color: #a4a4a4;
  font-weight: 600;
  margin-right: 0.2rem;
`;

const ToolBox = styled.div`
  display: flex;

  & > .edit {
    font-size: 0.8rem;
    color: #a4a4a4;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  & > .delete {
    font-size: 0.8rem;
    color: #a4a4a4;
    cursor: pointer;
  }
`;

const CommentLike = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  margin-bottom: 0;
  cursor: pointer;

  & > svg {
    animation: bounce 0.5s linear;
  }

  & > .like__count {
    font-size: 0.7rem;
    margin-top: 0.2rem;
    color: #a4a4a4;
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;
