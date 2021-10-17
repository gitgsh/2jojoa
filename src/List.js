import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
// import { useHistory } from 'react-router';
//let attachment2 = "C:\\Users\\jihye\\stud\\spring\\MovieTalk_0916_1531\\src\\main\\webapp\\resources\\file\\"+member.filename;

function List(props) {
  console.log("search", props.searchKeyword);

  return (
    <table width="50%" border="1">
      <thead>
        <tr>
          <th>글번호</th>
          <th>글제목</th>
          <th>글쓴이</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
      </thead>

      {props.데이터임
        .filter((data) => {
          console.log("검색어", props.searchKeyword);
          console.log("검색종류", props.keyField);

          if (props.searchKeyword.length === 0) {
            console.log("DD", data.rboard_title);

            return data;
          } else if (
            data.rboard_writer.toString().includes(props.searchKeyword)
          ) {
            return data;
          } else if (
            data.rboard_title.toString().includes(props.searchKeyword)
          ) {
            console.log(props.데이터임);
            return data;
          }
        })
        .map(function (데이터, i) {
          return (
            <tbody key={i}>
              <td>{데이터.rboard_seq}</td>

              <td>
                <Link to={`/detail/${데이터.rboard_seq}`}>
                  {데이터.rboard_title}
                </Link>
              </td>
              <td>{데이터.rboard_writer}</td>
              <td>{데이터.rboard_regdate}</td>
              <td>{데이터.rboard_hit}</td>
            </tbody>
          );
        })}
    </table>
  );
}

export default List;
