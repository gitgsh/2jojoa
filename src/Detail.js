import React from "react";
import { useParams, useLocation, Route, Link } from "react-router-dom";
import axios from "axios";
// import { useHistory } from 'react-router';
import { useHistory } from "react-router";

function Detail(props) {
  //App.js에서 <Detail 데이터임={데이터임}/> 으로 바인딩한 데이터 받기 위해 props 사용
  let history = useHistory();
  //delete 함수
  function del() {
    axios
      .delete(
        "http://localhost:9999/app/review/del.do?rboard_seq=" +
          findMovie.rboard_seq,
        {
          data: {
            rboard_seq: findMovie.rboard_seq,
          },
        }
      )
      .then((findMovie) => {
        console.log("delete 요청 성공");
        console.log("fff", findMovie);
        history.push("/");
        //window.location.replace("/")
      })
      .catch((err) => {
        console.log("delete 요청 실패", err);
      });
  }

  let { seq } = useParams();
  console.log(">>seq", seq);
  //detail axios
  axios
    .get("http://localhost:9999/app/review/detail.do", {
      params: {
        rboard_seq: seq,
      },
    })
    .then((result) => {
      console.log(result);
      console.log("detail ajax성공");
    })
    .catch(console.log("detail ajax실패"));

  //detail find함수 이용해서 데이터 가져오기
  let findMovie = props.데이터임.find(function (movie) {
    return movie.rboard_seq == seq;
  });

  return (
    <div>
      <div>안녕</div>
      <p>글제목: {findMovie.rboard_title}</p>
      <p>작성자: {findMovie.rboard_writer}</p>
      <p>글내용: {findMovie.rboard_content}</p>
      <button onClick={del}>삭제</button>
      <button
        onClick={() => {
          history.push(`/update/${findMovie.rboard_seq}`);
        }}
      >
        수정
      </button>

      {/* <button onClick={()=>{useHistory()}}></button> */}
    </div>
  );
}

export default Detail;
