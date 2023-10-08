import { styled } from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { EditPost, GetPost, Post } from "../../api/Board/Post";
import TagInput from "../../components/Write/TagInput";
import { useMutation, useQuery } from "react-query";
import AllLoading from "../../components/Loading/AllLoading";
import { EditWritePost, WritePost } from "../../types/Write.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { toast } from "react-toastify";

const WritePage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const quillRef = useRef<ReactQuill>(null);
  const query = new URLSearchParams(useLocation().search);
  const editQuery = query.get("post");

  const user = useSelector((state: RootState) => state.user);

  const { data } = useQuery(
    ["post", editQuery],
    () => GetPost(Number(editQuery)),
    {
      enabled: !!editQuery,
      refetchOnWindowFocus: false,
    }
  );

  const handleTags = (tags: string[]) => {
    setTags(tags);
  };

  useEffect(() => {
    if (data) {
      setTitle(data.post.title);
      setContent(data.post.article);

      const tagArr = [...data.tags];
      setTags(tagArr);
    }
  }, [data]);

  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const wirteMutation = useMutation((post: WritePost) => Post(post), {
    onSuccess: () => {
      toast.success("글 작성이 완료되었습니다.");
      navigate("/");
    },
    onError: () => {
      toast.error("글 작성에 실패했습니다.");
    },
  });

  const editMutation = useMutation(
    (edit: EditWritePost) => EditPost(edit, Number(editQuery)),
    {
      onSuccess: () => {
        toast.success("글 수정이 완료되었습니다.");
        navigate(`/posts/${editQuery}`);
      },
      onError: () => {
        toast.error("글 수정에 실패했습니다.");
      },
    }
  );

  const handleWrite = () => {
    if (data && editQuery) {
      const editData = {
        title,
        article: content,
        tags,
      };
      editMutation.mutate(editData);
      return;
    }

    const writeData = {
      user_id: user.id,
      title,
      article: content,
      tags,
    };

    wirteMutation.mutate(writeData);
  };

  return (
    <Container>
      <TitleInput
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitle}
      />

      <TagInput onTagsChange={handleTags} tags={tags} />

      <ReactQuill
        ref={quillRef}
        modules={modules}
        style={{ height: "500px", paddingBottom: "2rem" }}
        theme="snow"
        value={content}
        onChange={setContent}
      />

      <WriteBottom>
        <ExitButton onClick={() => navigate("/")}>Exit</ExitButton>
        <WriteButton onClick={handleWrite}>
          {editQuery ? "Edit" : "Write"}
        </WriteButton>
      </WriteBottom>

      {wirteMutation.isLoading && <AllLoading />}
    </Container>
  );
};

export default WritePage;

const Container = styled.div``;

const TitleInput = styled.input`
  width: 100%;
  height: 4rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  padding: 0 1rem;
  box-sizing: border-box;
  font-weight: bold;
`;

const WriteBottom = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  border-top: 1px solid #ccc;
`;

const WriteButton = styled.button`
  width: 6rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #a9a9f5;
  color: #fff;
  cursor: pointer;
`;

const ExitButton = styled.button`
  width: 6rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #bdbdbd;
  color: #fff;
  cursor: pointer;
`;
