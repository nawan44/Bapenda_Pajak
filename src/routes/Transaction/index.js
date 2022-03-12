import React, { useState, useEffect } from "react";
// import GrowthCard from "../components/Metrics/GrowthCard";
// import TotalEncomeCard from "../components/Metrics/TotalEncomeCard";
import { Col, Row, Select, Radio, Card, Input, Button } from "antd";
import CardTransaction from "./Card Transaction";
import HeaderTransaction from "./Header Transaction"
import jwtDecode from "jwt-decode";
import Widget from "../../components/Widget/index";
import { latestTransaction1 } from '../../components/DataDummy';
import * as moment from 'moment';

const Option = Select.Option;
const Search = Input.Search;
const eventsData = [
    {
        key: 1,
        title: "Bulletproof EP1",
        fileType: "Atmos",
        process: "match media",
        performedBy: "Denise Etridge",
        operationNote: "-",
        updatedAt: "26/09/2018 17:21",
        status: "complete"
    },
    {
        key: 2,
        title: "Dexter EP2",
        fileType: "Video",
        process: "Compliance",
        performedBy: "Dane Gill",
        operationNote: "passed",
        updatedAt: "21/09/2018 12:21",
        status: "inProgress"
    }
];
const Transaction = () => {
    // const [latestTransaction, setLatestTransaction] = useState()
    const [size, setSize] = useState()
    const latestTransaction = latestTransaction1.data
    const now = moment().format('YYYY-MM-DD')

    const [stateWarna, setStateWarna] = useState()
    const [searchText, setSearchText] = useState('');

    const all_transaction = latestTransaction && latestTransaction.map(row => ({
        merchant_id: row[1].stringValue,
        total_value: Number(row[3].stringValue),
        nama_usaha: row[2].stringValue,
        created_at: moment(row[4].stringValue).format('YYYY-MM-DD'),
        status: moment(row[4].stringValue).fromNow(),

    }));

    const result_all_transaction = all_transaction?.map((item, i, array) => {
        const defaultValue = {
            merchant_id: item.merchant_id,
            nama_usaha: item.nama_usaha,
            created_at: moment(item.created_at).format('YYYY-MM-DD'),
            total_value: 0,
            status: moment(now).diff(moment(item.created_at), 'days')
        }
        const finalValue = array.filter(other => other.merchant_id === item.merchant_id) //we filter the same items
            .reduce((accum, currentVal) => { //we reduce them into a single entry
                accum.total_value += currentVal.total_value;
                return accum;
            }, defaultValue);
        return finalValue;

    })
        .filter((item, thisIndex, array) => { //now our new array has duplicates, lets remove them
            const index = array.findIndex((otherItem, otherIndex) => otherItem.merchant_id === item.merchant_id && otherIndex !== thisIndex && otherIndex > thisIndex);
            return index === -1
        })


    const [state, setState] = useState();
    const [filter, setFilter] = useState("");

    const allStatus = result_all_transaction.map(row => moment(now).diff(moment(row.created_at), 'days'))

    console.log("result_all_transactionresult_all_transaction", result_all_transaction)

    useEffect(() => {
        setState({ eventsData });
    }, [eventsData]);

    const lowercasedFilter = filter.toString().toLowerCase();
    const filteredData = result_all_transaction?.filter((item) => {
        try {
            return Object.keys(item).some((key) => {
                if (item[key]) {
                    return item[key].toLowerCase().includes(lowercasedFilter);
                }
            });
        } catch (e) {
            console.log("data tidak ada");
        }
    });
    const handleChangeData = (event) => {
        setFilter(event.target.value);
    };
    const onClick = () => {

    }

    const warna = (aa) => {
        if (aa === 0) {
            return "green"
        } else if (aa === 1) {
            return "orange"
        } else if (aa === 2) {
            return "red"
        } else if (aa >= 10) {
            return "dark"
        } else {
            return "grey"
        }
    }

    // useEffect(() => {
    //     getLatestTransaction();
    // }, []);
    // useEffect(() => {
    //     getLatestTransaction();
    //     const interval = setInterval(() => {
    //         getLatestTransaction()
    //     }, 10000)
    //     return () => clearInterval(interval)
    // }, []);
    // const handleSizeChange = (e) => {
    //     setSize({ size: e.target.value });
    // };
    // const getLatestTransaction = async (dataLatest) => {
    //     const decoded = jwtDecode(localStorage.token)
    //     const apiKey = decoded["api-key"]
    //     const token = localStorage.getItem('token')
    //     const headers = {
    //         'x-api-key': `${apiKey}`,
    //         'content-type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     }

    //     const response = await fetch(
    //         "https://api.raspi-geek.com/v1/latestorder",

    //         { method: "GET", headers }
    //     );
    //     const ajson = await response.json();
    //     // setLatestTransaction(ajson)
    //     // setLatestTransaction(ajson.Records)
    //     setLatestTransaction(ajson.Records,)
    // }
    const updateSearchChatUser = (evt) => {
        setSearchText(evt.target.value)
    };
    const handleSort = (value) => {
        setFilter(value)
    }
    console.log("filter", filter)

    return (
        <div>
            <Widget styleName={`gx-card-full gx-p-4`} >
                <HeaderTransaction result_all_transaction={result_all_transaction} />
                <div style={{ margin: "20px 0" }} >
                    <h2>Device Berdasarkan Status</h2>
                    <Button 
                    // value={1} onClick={() => handleSort(1)} 
                    style={{ backgroundColor: "green", color: "white" }} >Online</Button>
                    <Button style={{ backgroundColor: "orange", color: "white" }}>2 Hari Off</Button>
                    <Button style={{ backgroundColor: "red", color: "white" }}> Dalam Pemantauan</Button>
                    <Button style={{ backgroundColor: "grey", color: "white" }}> Off</Button>
                    <Button style={{ backgroundColor: "black", color: "white" }}> Pelaporan Bapenda</Button>
                    <Search placeholder="input search text"
                        enterButton="Search" 
                        size="large"
                        onChange={handleChangeData}
                        value={filter} />
                </div>
            </Widget>
            <Row className="container-dashboard1">
                <CardTransaction
                    // latestTransaction={latestTransaction} 
                    result_all_transaction={filteredData}
                    stateWarna={stateWarna} setStateWarna={setStateWarna}
                // setLatestTransaction={setLatestTransaction} 
                />
            </Row>

        </div>

    );
};

export default Transaction;
