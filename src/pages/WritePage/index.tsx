import { styled } from "styled-components"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Post } from "../../api/Board/Post";
import TagInput from "../../components/Write/TagInput";
import { useMutation } from "react-query";
import AllLoading from "../../components/Loading/AllLoading";

type Post = {
  user_id: string;
  title: string;
  article: string;
  tags: string[];
}

const WritePage = () => {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])

  const quillRef = useRef<ReactQuill>(null);

  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  }

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const wirteMutation = useMutation((post: Post) => Post(post), {
    onSuccess: () => {
      alert("글 작성이 완료되었습니다.")
      navigate("/")
    },
    onError: () => {
      alert("글 작성에 실패했습니다.")
    }
  })

  const handleWrite = () => {
    const data = {
      user_id: "hetame",
      title,
      article: content,
      tags
    }

    wirteMutation.mutate(data)
  }

  return (
    <>
      <TitleInput
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitle}
      />

      <TagInput onTagsChange={setTags} />

      <ReactQuill
        ref={quillRef}
        modules={modules}
        style={{ height: "80vh", paddingBottom: "2rem" }}
        theme="snow"
        value={content}
        onChange={setContent}
      />

      <WriteBottom>
        <ExitButton onClick={() => navigate("/")}>Exit</ExitButton>
        <WriteButton onClick={handleWrite}>Write</WriteButton>
      </WriteBottom>

      {
        wirteMutation.isLoading && <AllLoading />
      }
    </>
  )
}

export default WritePage

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
`

const WriteBottom = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  border-top: 1px solid #ccc;
`

const WriteButton = styled.button`
  width: 6rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #A9A9F5;
  color: #fff;
  cursor: pointer;
`

const ExitButton = styled.button`
  width: 6rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #BDBDBD;
  color: #fff;
  cursor: pointer;
`