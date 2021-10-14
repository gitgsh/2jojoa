import logo from "./logo.svg";
import "./App.css";
import react, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Switch, useParams } from "react-router-dom";
import Detail from "./Detail";
import Input from "./Input";
import Update from "./Update";
import List from "./List";

function App() {
  // 지혜지요요요
  let [데이타, 데이타임] = useState([""]);
  let [데이터임, 데이터변경임] = useState([""]);
  useEffect(() => {
    // componentDidMount
    // 컴포넌트가 화면에 나타날 때 실행하고 싶은 함수를 이 곳에 넣는다.
    axios
      .get("http://localhost:9999/app/review/aaa.do")
      .then((result) => {
        console.log("아작스요청 성공함");
        console.log("DD", result);

        let dataA = result.data.list2;

        데이터변경임([...dataA]);
      })
      .catch((err) => {
        console.log("아작스요청 실패함", err);
      });
  }, []);
  const changeData = (result) => {
    console.log("App의 changeData ...");
    //console.log(data);
    let dataA = result.data.list2;

    데이터변경임([...dataA]);
  }; //

  const updateData = (result) => {
    console.log("App의 changeData ...");
    //console.log(data);
    let dataA = result.data.list2;

    데이터변경임([...dataA]);
    // updateData={updateData}
  }; //

  return (
    <div className="App">
      <header className="App-header">
        진아수정중
        <Route exact path="/">
          <button>
            <Link to="/input" className="input">
              글쓰기
            </Link>
          </button>

          <List 데이터임={데이터임} />
        </Route>

        <Route path="/detail/:seq" component={Detail}>
          <div>상세페이지</div>
          <Detail 데이터임={데이터임} />
        </Route>

        <Route path="/input" component={Input}>
          <div>입력페이지</div>
          <Input changeData={changeData} />
        </Route>
        <Route path="/update/:seq" component={Update}>
          <div>수정페이지</div>
          <Update 데이터임={데이터임} updateData={updateData} />
        </Route>
      </header>
    </div>
  );
}

export default App;
