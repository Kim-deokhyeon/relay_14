import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
import { Route, Link } from 'react-router-dom';
import { Card, Avatar, Col, Typography, Row, Button } from 'antd';
import axios from 'axios';
import * as Yup from "yup";
import "./SearchPage.css";
import { useDispatch } from "react-redux";
const { Title } = Typography;
const { Meta } = Card;


function SearchPage(props) {
  
  
  //검색창 입력용
  const [key, setKey] = useState('');
  const onChangeKey = e => {
    setKey(e.target.value);
  };

  useEffect(() => {
  }, [key]);


  const searchVariable = {
    keyword: props.location.state.key
  }


  //검색 결과
  const [Users, setUsers] = useState([]);

  //페이지내에서 재 검색 하기 위한 코드
  const [find, setfind] = useState(0);
  useEffect(() => {
    axios.post('/api/users/searchUser', searchVariable)
      .then(response => {
        //console.log(response)
        if (response.data.success) {
          setUsers(response.data.user)
        } else {
          alert('Failed to get User Data')
        }
      })

  }, [find]);



  //검색 결과 유저목록 받아오기
  useEffect(() => {
    axios.post(/*localhost123*/'/api/users/searchUser', searchVariable)
      .then(response => {
        //console.log(response)
        if (response.data.success) {
          setUsers(response.data.user)
        } else {
          alert('Failed to get User Data')
        }
      })
  }, [])


  const renderCards = Users.map((users, index) => {

    return <Col lg={24} md={24} xs={24} style={{ marginBottom: '10px', marginLeft: '20px' }}>
      <div class="people_item">
        <button class="plus_button">♡</button>
        <div class="people_item_top">
          <img class="people_img" src={`${users.image}`} alt="profile_img"></img>
          <div class="people_content">
            <p class="people_name">{`${users.name}`}</p>
            <p class="people_school">{`${users.school}`}</p>
            <p class="people_email">{`${users.email}`}</p>
          </div>
        </div>
        <div class="people_item_bottom">
          <div class="people_tag_box">
            <span class="people_tag_item">{`${users.tag[0]}`}</span>
            <span class="people_tag_item">{`${users.tag[1]}`}</span>
            <span class="people_tag_item">{`${users.tag[2]}`}</span>
          </div>
        </div>
      </div>
    </Col>

  })

  return (
    <div class="root">
      <div class="top">
        <h1 class="search_title">우리들의 고여버린 기억</h1>
        <form class="search_box" method="post">
          <input required class="search_input" onChange={onChangeKey} type="text" defaultValue={`${props.location.state.key}`} />
          <div class="icon_box">
            <button class="mike_button"><span class="material-icons">👄</span></button>
            <Link to={{
              pathname: `/search/${key}`,
              state: {
                key: key
              }
            }}>
              <span class="material-icons" onClick={() => setfind(find + 1)}>🔍</span>
            </Link>
          </div>
        </form>
        <div class="tag_box">
          <span class="tag_item">군자초</span>
          <span class="tag_item">18기</span>
          <span class="tag_item">보이스카우트</span>
        </div>
      </div>
      <div class="people_main_box">
        <p class="people_main_title">혹시, 너도 고였니?😉</p>
        <div class="people_box">

          <Row gutter={16}>{renderCards}</Row>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;