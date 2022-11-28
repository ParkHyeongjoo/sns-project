import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { motion } from "framer-motion";
import "./Write.scss";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Write = () => {
  const mb_nick = sessionStorage.getItem("nick");
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const titleRef = useRef();
  const clickBtn = (e) => {
    setType(e.target.value);
  };

  // checkBox 하나만 클릭되게
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("category");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
  };
  const onsubmit = (e) => {
    e.preventDefault();

    if (titleRef.current.value === "") {
      alert("제목을 작성해주세요");
    } else if (value === "") {
      alert("내용을 입력해주세요");
    } else if (type === "") {
      alert("게시판을 선택해주세요");
    } else {
      axios
        .post("/boardWrite", {
          board_title: titleRef.current.value,
          board_content: value,
          board_type: type,
          mb_nick: mb_nick,
        })
        .then(function (res) {
          console.log(res.data);
          if (res.data !== 1) {
            alert("게시글 등록에 실패했습니다!");
          } else {
            alert("게시글 등록 완료!");
            navigate(`/`);
          }
        })
        .catch(function (error) {
          alert("게시물 등록에 실패했습니다!");
        });
    }
  };
  const quillRef = useRef();

  const imageHandler = () => {
    // file input 임의 생성
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.onchange = async () => {
      const file = input.files;
      const formData = new FormData();

      if (file) {
        formData.append("multipartFiles", file[0]);
      }
      // file 데이터 담아서 서버에 전달하여 이미지 업로드
      const res = await axios.post("uploadImg", formData);
      console.log(
        "current : ",
        quillRef.current.getEditor().getSelection().index
      );

      if (quillRef.current) {
        // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 불러오는 url을 이용하여 이미지 태그 추가
        const index = quillRef.current.getEditor().getSelection().index;

        const quillEditor = quillRef.current.getEditor();
        quillEditor.setSelection(index, 1);

        quillEditor.clipboard.dangerouslyPasteHTML(
          index,
          `<img src=${res.data} alt=${"alt text"} />`
        );
      }
    };
  };

  const modules = React.useMemo(
    () => ({
      toolbar: {
        // container에 등록되는 순서대로 tool 배치
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ], // 리스트, 인덴트 설정
          ["image"], // 이미지 업로드 설정
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
          ["clean"], // toolbar 설정 초기화 설정
        ],

        // custom 핸들러 설정
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    []
  );
  // toolbar에 사용되는 tool format
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "image",
    "align",
    "color",
    "background",
  ];
  return (
    <motion.iv
      className="write"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="content">
        <input
          ref={titleRef}
          type="text"
          placeholder="제목을 입력해 주세요"
          className="title"
        />
        <form>
          <div className="menu">
            <h1>Category</h1>
            <div className="toy">
              <input
                onClick={clickBtn}
                onChange={(e) => checkOnlyOne(e.target)}
                type="checkbox"
                name="category"
                value="Toy"
                id="toy"
              />
              <label htmlFor="toy">인원모집</label>
            </div>

            <div className="error">
              <input
                onClick={clickBtn}
                onChange={(e) => checkOnlyOne(e.target)}
                type="checkbox"
                name="category"
                value="Error"
                id="error"
              />
              <label htmlFor="error">오류게시판</label>
            </div>

            <div className="free">
              <input
                onClick={clickBtn}
                onChange={(e) => checkOnlyOne(e.target)}
                type="checkbox"
                name="category"
                value="Free"
                id="free"
              />
              <label htmlFor="free">자유게시판</label>
            </div>
          </div>
        </form>
        <div className="editorContainer">
          <ReactQuill
            ref={quillRef}
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
      <div className="submit">
        <button onClick={onsubmit}>글 작성하기</button>
      </div>
    </motion.iv>
  );
};

export default Write;
