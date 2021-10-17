import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

function Input(props) {
  //App.js에서 <Detail 데이터임={데이터임}/> 으로 바인딩한 데이터 받기 위해 props 사용

  const [rboard_title, setRboard_title] = useState("");
  const [rboard_writer, setRboard_writer] = useState("");
  const [rboard_content, setRboard_content] = useState("");
  const [attachment, setAttachment] = useState("");

  let history = useHistory();

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "rboard_title") {
      setRboard_title(value);
    } else if (name === "rboard_writer") {
      setRboard_writer(value);
    } else if (name === "rboard_content") {
      setRboard_content(value);
    }

    console.log(rboard_title);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(event.target); <form></form>이 들어온다
    //그냥 폼은 태그 엘리먼트일뿐이기에 FormData 타입으로 변경해야한다.
    let form = event.target;
    let data = new FormData(form);
    // 파일 전송중에는 submit 비활성화되도록

    axios
      .post("http://localhost:9999/app/review/input2.do", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        props.changeData(result);

        console.log("아작스요청 성공함");
        console.log("data>>>>>>", data);
        history.push("/");
      })
      .catch((err) => {
        console.log("실패");
        console.log("data>>>>>>", data);
      });
  };

  // const onClick = (event) => {
  //   event.preventDefault();

  //   let data = {
  //     rboard_title,
  //     rboard_writer,
  //     rboard_content,
  //   };

  //   //console.log("1: ",data);

  //   axios
  //     .post("http://localhost:9999/app/review/input2.do", data)
  //     .then((result) => {
  //       props.changeData(result);

  //       console.log("아작스요청 성공함");

  //       history.push("/");
  //     })
  //     .catch((err) => {
  //       console.log("실패");
  //       console.log(data);
  //     });
  // };

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    const {
      target: { files },
    } = event;
    const reader = new FileReader();
    //
    reader.onloadend = (progressEvent) => {
      const {
        currentTarget: { result },
      } = progressEvent;
      // 파일보여줄려고
      setAttachment(result);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div>
      <h2>입력창</h2>
      <form onSubmit={onSubmit}>
        영화제목 :{" "}
        <input
          type="text"
          name="rboard_title"
          value={rboard_title}
          onChange={onChange}
        />
        <br />
        글쓴이 :{" "}
        <input
          type="text"
          name="rboard_writer"
          value={rboard_writer}
          onChange={onChange}
        />{" "}
        <br />
        내용 :{" "}
        <input
          type="text"
          name="rboard_content"
          value={rboard_content}
          onChange={onChange}
        />{" "}
        <br />
        파일 : <input type="file" name="uploadFile" onChange={onFileChange} />
        <input type="submit" value="저장" />
      </form>
    </div>
  );
}

export default Input;
