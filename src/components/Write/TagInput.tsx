import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  onTagsChange: (tags: string[]) => void;
  tags: string[];
}

const TagInput = ({ onTagsChange, tags }: Props) => {
  const [tag, setTag] = useState<string>("");

  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const addTag = () => {
    if (tag === "") return;

    if (tag.length < 2) {
      setTag("");
      return;
    }

    if (tags.includes("#" + tag)) {
      setTag("");
      return;
    }

    const newTags = [...tags, "#" + tag];
    onTagsChange(newTags);
    setTag("");
  };

  const removeTag = (clickedTag: string) => {
    const newTags = tags.filter((tag) => tag !== clickedTag);
    onTagsChange(newTags);
  };

  return (
    <TagList>
      {tags.map((tag, index) => (
        <Tag onClick={() => removeTag(tag)} key={index}>
          {tag}
        </Tag>
      ))}
      <InputBox>
        <TagIn
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={handleTag}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            } else if (e.key === "Backspace" && tag === "") {
              // 태그 입력 필드가 비어있을 때 Backspace를 누르면 마지막 태그를 삭제합니다.
              const lastTag = tags[tags.length - 1];
              if (lastTag) {
                removeTag(lastTag);
              }
            }
          }}
        />
        <TagTooltip>
          엔터를 입력하여 태그를 등록할 수 있습니다 <br />
          등록된 태그를 클릭하면 삭제됩니다
        </TagTooltip>
      </InputBox>
    </TagList>
  );
};

export default TagInput;

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
`;

const InputBox = styled.div`
  position: relative;
`;

const TagIn = styled.input`
  width: 10rem;
  height: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 1rem;
  box-sizing: border-box;

  &:focus + ${TagTooltip} {
    display: block;
  }
`;

const TagList = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  position: relative;
`;

const Tag = styled.div`
  display: flex;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  background-color: #eee;
  padding: 0 1rem;
  border-radius: 0.5rem;
  color: #2e2efe;
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
`;
