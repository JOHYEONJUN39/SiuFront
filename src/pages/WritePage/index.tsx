import { styled } from "styled-components"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Post } from "../../api/Board/Post";

const WritePage = () => {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [tag, setTag] = useState<string>("")
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

  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value)
  }

  const handleWrite = () => {
    const data = {
      user_id: "hetame",
      title,
      article: content,
      tags
    }

    Post(data)
  }

  return (
    <>
      <TitleInput
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitle}
      />

      <TagList>
        {tags.map((tag, index) => (
          <Tag onClick={() => {
            setTags(tags.filter((e) => e !== tag))
          }} key={index}>
            {tag}
          </Tag>
        ))}
        <TagInput
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={handleTag}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (tag === "") return;
              else if (tags.includes('#' + tag)) {
                setTag("")
                return;
              }
              setTags([...tags, '#' + e.currentTarget.value])
              setTag("")
            }
            else if (e.key === "Backspace" && tag === "") {
              setTags(tags.slice(0, tags.length - 1))
            }
          }}
        />
        <TagTooltip>
          엔터를 입력하여 태그를 등록할 수 있습니다 <br />
          등록된 태그를 클릭하면 삭제됩니다
        </TagTooltip>
      </TagList>

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

const TagTooltip = styled.div`
  display: none;
  position: absolute;
  top: 3rem;
  left: 0;
  width: 18rem;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  background-color: #585858;
  line-height: 1.3rem;
  font-size: 0.8rem;
  color: #fff;
  z-index: 1;
  animation: fadeIn 0.5s;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const TagInput = styled.input`
  width: 10rem;
  height: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 1rem;

  &:focus + ${TagTooltip} {
    display: block;
  }
`

const TagList = styled.div`
  width: 100%;
  height: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  position: relative;
`

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-right: 0.5rem;
  background-color: #eee;
  padding: 0 1rem;
  border-radius: 0.5rem;
  color: #2E2EFE;
  font-weight: 600;
  cursor: pointer;

  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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