import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {BACK_URL} from '../../Link'
const { Title } = Typography;
const { Meta } = Card;

function YouKnowPage() {

    const [Posts, setPosts] = useState([])
    var image = 'https://user-images.githubusercontent.com/34932546/89632522-4c6ff880-d8dd-11ea-9c3b-9e5c034626ee.jpg';
    var mainImg = 'https://cdn.wadiz.kr/ft/images/green001/2020/0605/20200605142924749_2233.jpg/wadiz/optimize/';
    useEffect(() => {
        axios.get(/*localhost123*/'/api/post/getPosts')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.posts)
                    setPosts(response.data.posts)
                } else {
                    alert('Failed to get Posts')
                }
            })


    }, [])


    const renderCards = Posts.map((posts, index) => {

        // var minutes = Math.floor(post.duration / 60);
        // var seconds = Math.floor(post.duration - minutes * 60);
        var person = getPercent();

        function getPercent() {
            var peo = 100 / posts.people;
            if (posts.joinPeople) {
                peo = peo * posts.joinPeople
            } else {
                peo = peo * 0
            }
            peo = peo + '%'
            return peo;
        }
        var finOrNot = posts.fin;
        if (finOrNot == null) {
            finOrNot=false;
            console.log("null == finornot==" + finOrNot);
        }
        var sdate = posts.startday;
        var thistime = moment();
        var cdate = moment(posts.startday);//.add(posts.daycount, "days");
        // console.log(moment.duration(cdate.diff(thistime)).asDays());
        // console.log(posts.title + '시간 차이: ', moment.duration(cdate.diff(thistime)).asHours());
        var resultDate = moment.duration(cdate.diff(thistime)).asDays();
        
      
        if (resultDate <= 0 || finOrNot==true) {
            //console.log('posts._id='+posts._id);
            if(finOrNot == false){
                const variable = {postId : posts._id}
                
                axios.post(/*localhost123*/'/api/post/makefin',variable)
                .then(response => {
                    if (response.data.success) {
                        console.log("fin==",response.data.post);
                    } else {
                        alert('Failed to make Fin')
                    }
                })
            }

            return
        }

        return <Col lg={6} md={8} xs={24} style={{ marginBottom: '40px' }}>
            <a href={`/post/${posts._id}`} >
                <div style={{ position: 'relative', margin: '0px 10px', height: '150px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.2)', borderRadius: '10px 10px' }}>

                    {finOrNot
                        ? <div style={{ width: '100%', height: '150px', background: 'darkgray' }}><img style={{ width: '100%', filter: 'brightness(30%)' }} alt="thumbnail" src={`${BACK_URL}/${posts.filePath}`} />
                            <p style={{ position: 'absolute', top: "50%", left: '50%', transform: 'translate(-50%,-50%)', fontSize: '22px', color: 'white', textAlign: 'center', fontWeight: '600' }}>마감된<br />프로젝트</p>
                        </div>
                        : <img style={{ width: '100%' }} alt="thumbnail" src={`${BACK_URL}/${posts.filePath}`} />}


                </div><br />

                <Meta
                    avatar={
                        <Avatar src={posts.writer.image} />
                    }
                    title={posts.title}
                />
                <span>{posts.writer.name} </span><br />

                {/* <span style={{ marginLeft: '3rem' }}> {posts.views} views</span> */}
                <span style={{ marginLeft: '3rem' }}> {moment(posts.createdAt).format("yyyy년 MM월 D일")} </span><br />

                <div style={{ marginTop: '10px', marginLeft: '23px', width: '65%', height: '10px', display: 'inline-block', border: '1px solid gray', borderRadius: '10px 10px', overflow: 'hidden' }}>
                    <div className='bar' name='bar' id="bar" style={{ float: 'left', width: `${person}`, height: '10px', display: 'inline', border: '1px solid gray', borderRadius: '10px 10px', background: 'red' }}></div>
                </div>
                <span> {posts.joinPeople ? posts.joinPeople : `0`}/{posts.people ? (posts.people + `명`) : `∞명`}</span>
                <br />
            </a>

        </Col>
 
    })




    const renderCards2 = Posts.map((posts, index) => {

        // var minutes = Math.floor(post.duration / 60);
        // var seconds = Math.floor(post.duration - minutes * 60);
        var person = getPercent();

        function getPercent() {
            var peo = 100 / posts.people;
            if (posts.joinPeople) {
                peo = peo * posts.joinPeople
            } else {
                peo = peo * 0
            }
            peo = peo + '%'
            return peo;
        }
       var finOrNot = posts.fin;
        if (finOrNot == null) {
            finOrNot=false;
            console.log("null == finornot==" + finOrNot);
        }
        var sdate = posts.startday;
        var thistime = moment();
        var cdate = moment(posts.startday);//.add(posts.daycount, "days");
        // console.log('cdate=' + cdate + 'sdate=' + sdate + 'thistime=' + thistime + ' 일 차이: ', moment.duration(cdate.diff(thistime)).asDays());
        // console.log(posts.title + '시간 차이: ', moment.duration(cdate.diff(thistime)).asHours());
        var resultDate = moment.duration(cdate.diff(thistime)).asDays();
        
        if (resultDate <= 0)
            finOrNot = true;   
        
         if (finOrNot==false){
             return
         }

        return <Col lg={6} md={8} xs={24} style={{ marginBottom: '40px' }}>
            <a href={`/post/${posts._id}`} >
                <div style={{ position: 'relative', margin: '0px 10px', height: '150px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.2)', borderRadius: '10px 10px' }}>

                    {finOrNot
                        ? <div style={{ width: '100%', height: '150px', background: 'darkgray' }}><img style={{ width: '100%', filter: 'brightness(30%)' }} alt="thumbnail" src={`${BACK_URL}/${posts.filePath}`} />
                            <p style={{ position: 'absolute', top: "50%", left: '50%', transform: 'translate(-50%,-50%)', fontSize: '22px', color: 'white', textAlign: 'center', fontWeight: '600' }}>마감된<br />프로젝트</p>
                        </div>
                        : <img style={{ width: '100%' }} alt="thumbnail" src={`${BACK_URL}/${posts.filePath}`} />}


                </div><br />

                <Meta
                    avatar={
                        <Avatar src={posts.writer.image} />
                    }
                    title={posts.title}
                />
                <span>{posts.writer.name} </span><br />

                {/* <span style={{ marginLeft: '3rem' }}> {posts.views} views</span> */}
                <span style={{ marginLeft: '3rem' }}> {moment(posts.createdAt).format("yyyy년 MM월 D일")} </span><br />

                <div style={{ marginTop: '10px', marginLeft: '23px', width: '65%', height: '10px', display: 'inline-block', border: '1px solid gray', borderRadius: '10px 10px', overflow: 'hidden' }}>
                    <div className='bar' name='bar' id="bar" style={{ float: 'left', width: `${person}`, height: '10px', display: 'inline', border: '1px solid gray', borderRadius: '10px 10px', background: 'red' }}></div>
                </div>
                <span> {posts.joinPeople ? posts.joinPeople : `0`}/{posts.people ? (posts.people + `명`) : `∞명`}</span>
                <br />
            </a>

        </Col>

    })


    return (<div style={{ width: '100%', overflow: 'hidden' }}>
        <section id='mainsection' style={{ backgroundImage: `url(${image})`, padding: '60px 0px', textAlign: 'center', height: '224px' }}><a href="/upload">
            <h1 style={{ color: 'white', fontSize: '34px', margin: '0px' }}><b>알 수도 있는 사람</b></h1>
            <p style={{ color: 'white', fontSize: '20px' }}>친구를 찾는데 도움이 됩니다.</p>
        </a>
        </section>
        
        <div id='renderZone' style={{ width: '85%', margin: '3rem auto' }}>

            
        </div>
        
    </div>
    )
};

export default YouKnowPage
