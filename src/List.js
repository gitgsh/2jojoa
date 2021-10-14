import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
// import { useHistory } from 'react-router';

function List(props) {
  console.log(props.데이터임);
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
      {/* map */}

      {props.데이터임.map(function (데이터, i) {
        return (
          <tbody key={i}>
            <td>{데이터.rboard_seq}</td>
            {/* <td><Link to="/detail">{데이터.rboard_title}</Link></td> */}
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
