import React, { useState, useEffect } from "react";
// import GrowthCard from "../components/Metrics/GrowthCard";
// import TotalEncomeCard from "../components/Metrics/TotalEncomeCard";
import { Col, Row, Select, Radio, Card, Input, Button } from "antd";
import CardTransaction from "./Card Transaction";
import HeaderTransaction from "./Header Transaction"
import jwtDecode from "jwt-decode";
import Widget from "../../components/Widget/index";
const Option = Select.Option;
const Search = Input.Search;

const Transaction = () => {
    const [latestTransaction, setLatestTransaction] = useState()
    const [size, setSize] = useState()

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        getLatestTransaction();
    }, []);
    useEffect(() => {
        getLatestTransaction();
        const interval = setInterval(() => {
            getLatestTransaction()
        }, 10000)


        return () => clearInterval(interval)
    }, []);
    const handleSizeChange = (e) => {
        setSize({ size: e.target.value });
    };
    const getLatestTransaction = async (dataLatest) => {
        const decoded = jwtDecode(localStorage.token)
        const apiKey = decoded["api-key"]
        const token = localStorage.getItem('token')
        const headers = {
            'x-api-key': `${apiKey}`,
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const response = await fetch(
            "https://api.raspi-geek.com/v1/latestorder",

            { method: "GET", headers }
        );
        const ajson = await response.json();
        // setLatestTransaction(ajson)
        // setLatestTransaction(ajson.Records)
        setLatestTransaction(ajson.Records,)
    }
    const updateSearchChatUser = (evt) => {
        setSearchText(evt.target.value)
    };

    function handleChange(value) {

    }

    return (
        <div>
            <Widget styleName={`gx-card-full gx-p-4`} >
                <HeaderTransaction />
                <div style={{ margin: "20px 0" }} >
                    <h2>Device Berdasarkan Status</h2>
                    <Button style={{backgroundColor:"green", color:"white"}} >Online</Button>
                    <Button style={{backgroundColor:"blue", color:"white"}}>&gt; 6 Jam Off</Button>
                    <Button  style={{backgroundColor:"orange", color:"white"}}>&gt; 48 Jam Off</Button>
                    <Button  style={{backgroundColor:"red", color:"white"}}>
&gt; Dalam Pemantauan</Button>
                    <Button  style={{backgroundColor:"black", color:"white"}}> Suspend Bapenda</Button>
                    <Search placeholder="input search text" enterButton="Search" size="large" />

                </div>
            </Widget>



            <Row className="container-dashboard1">
                <CardTransaction latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
            </Row>

        </div>

    );
};

export default Transaction;
