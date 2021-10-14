import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

function Input(props) {
  //App.js에서 <Detail 데이터임={데이터임}/> 으로 바인딩한 데이터 받기 위해 props 사용

  const [rboard_title, setRboard_title] = useState("");
  const [rboard_writer, setRboard_writer] = useState("");
  const [rboard_content, setRboard_content] = useState("");
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

  const onClick = (event) => {
    event.preventDefault();

    let data = {
      rboard_title,
      rboard_writer,
      rboard_content,
    };

    //console.log("1: ",data);

    axios
      .post("http://localhost:9999/app/review/input2.do", data)
      .then((result) => {
        props.changeData(result);

        console.log("아작스요청 성공함");

        history.push("/");
      })
      .catch((err) => {
        console.log("실패");
        console.log(data);
      });
  };

  return (
    <div>
      <h2>입력창</h2>
      <form>
        영화제목 : <input type="text" name="rboard_title" onChange={onChange} />
        <br />
        글쓴이 : <input
          type="text"
          name="rboard_writer"
          onChange={onChange}
        />{" "}
        <br />
        내용 : <input
          type="text"
          name="rboard_content"
          onChange={onChange}
        />{" "}
        <br />
        <input type="submit" value="저장" onClick={onClick} />
      </form>
    </div>
  );
}

export default Input;
