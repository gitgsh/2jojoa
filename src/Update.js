import React, { useState, useEffect } from "react";
import { useParams, useLocation, Redirect } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

function Update(props) {
  let [ldata, setLdata] = useState([props.데이터임]);
  console.log("data==>", ldata);

  //App.js에서 <Detail 데이터임={데이터임}/> 으로 바인딩한 데이터 받기 위해 props 사용
  let { seq } = useParams();
  console.log("u>>seq", seq);

  console.log("props.데이터임==>", props.데이터임);
  console.log("ldata=>", ldata);

  let findMovie = props.데이터임.find(function (movie) {
    console.log("movie", movie.rboard_seq);

    return movie.rboard_seq == seq;
  });

  console.log(">>>>>>>>>>" + findMovie);

  console.log(">>>>", findMovie.rboard_seq);
  console.log(">>>>", findMovie.rboard_content);
  console.log(">>>>", findMovie.rboard_seq);

  const [rboard_title, setRboard_title] = useState(findMovie.rboard_title);
  const [rboard_writer, setRboard_writer] = useState(findMovie.rboard_writer);
  const [rboard_content, setRboard_content] = useState(
    findMovie.rboard_content
  );
  const [rboard_seq, setRboard_seq] = useState(findMovie.rboard_seq);
  let history = useHistory();

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "rboard_title") {
      setRboard_title(value);
    } else if (name === "rboard_content") {
      setRboard_content(value);
    }

    console.log(rboard_title);
  };
  useEffect(() => {}, []);

  const onClick = (event) => {
    event.preventDefault();

    let data = {
      rboard_title,
      rboard_content,
      rboard_seq,
    };

    console.log("1: ", data);

    axios
      .post("http://localhost:9999/app/review/update2.do", data)
      .then((result) => {
        //console.log(data);
        console.log("아작스요청 성공함");
        console.log("Update", result);

        props.updateData(result);
        // window.location.replace("/")

        //?setLdata(data)
        //history.push("/");
        //  window.location.replace(`#/detail/${findMovie.rboard_seq}`)
        history.push(`/detail/${findMovie.rboard_seq}`);
      })
      .catch((err) => {
        console.log("실패");
        console.log(data);
      });
  };

  return (
    <div>
      <h2>수정창</h2>
      <form>
        영화제목 :{" "}
        <input
          type="text"
          name="rboard_title"
          value={rboard_title}
          onChange={onChange}
        />
        <br />
        글쓴이 : {rboard_writer} <br />
        내용 :{" "}
        <input
          type="text"
          name="rboard_content"
          value={rboard_content}
          onChange={onChange}
        />{" "}
        <br />
        <input type="submit" value="저장" onClick={onClick} />
      </form>
    </div>
  );
}

export default Update;
