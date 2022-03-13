import React, { useState, useEffect } from "react";
// import GrowthCard from "../components/Metrics/GrowthCard";
// import TotalEncomeCard from "../components/Metrics/TotalEncomeCard";
import { Col, Row, Select, Radio, Card, Input, Button } from "antd";
import CardStatusDevice from "./Card Status Device";
import HeaderStatusDevice from "./Header Status Device"
import jwtDecode from "jwt-decode";
import Widget from "../../components/Widget/index";
import { latestTransaction1 } from '../../components/DataDummy';
import * as moment from 'moment';
import "../../assets/styles/card-status-device.css"

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
const StatusDeviceRestoran = () => {
    // const [latestTransaction, setLatestTransaction] = useState()
                        const filterStatusHotel = latestTransaction1.data

    // const objTransactionThisMonth = bulan && bulan.filter(o => o.created_at === bulanIni);

    const latestTransaction = filterStatusHotel?.filter(o => 
        o[5].stringValue === "Restoran")
        console.log("filterStatusHotel??", latestTransaction)


    const now = moment().format('YYYY-MM-DD')
    const [buttonGreen, setButtonGreen] = useState("white")
    const [buttonBackgroundGreen, setButtonBackgroundGreen] = useState("green")

    const [buttonOrange, setButtonOrange] = useState("white")
    const [buttonBackgroundOrange, setButtonBackgroundOrange] = useState("orange")

    const [buttonRed, setButtonRed] = useState("white")
    const [buttonBackgroundRed, setButtonBackgroundRed] = useState("red")

    const [buttonDark, setButtonDark] = useState("white")
    const [buttonBackgroundDark, setButtonBackgroundDark] = useState("black")

    const [buttonGrey, setButtonGrey] = useState("white")
    const [buttonBackgroundGrey, setButtonBackgroundGrey] = useState("grey")

    const [stateWarna, setStateWarna] = useState()

    const all_transaction = latestTransaction && latestTransaction.map(row => ({
        merchant_id: row[1].stringValue,
        total_value: Number(row[3].stringValue),
        nama_usaha: row[2].stringValue,
        created_at: moment(row[4].stringValue).format('YYYY-MM-DD'),
        status: moment(row[4].stringValue).fromNow(),
    }));

    const result_all_status_device = all_transaction?.map((item, i, array) => {
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
    const [filteredPolls, setfilteredPolls] = useState(result_all_status_device)

    useEffect(() => {
        setState({ eventsData });
    }, [eventsData]);

    const lowercasedFilter = filter.toString().toLowerCase();
    const filteredData = filteredPolls?.filter((item) => {
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

    const greenStatus = result_all_status_device?.filter(item => item.status === 0)
    const orangeStatus = result_all_status_device?.filter(item => item.status === 1)
    const redStatus = result_all_status_device?.filter(item => item.status === 2)
    const darkStatus = result_all_status_device?.filter(item => item.status >= 3)
    const greyStatus = result_all_status_device?.filter(item => item.status < 0)


    function showGreen() {
        setfilteredPolls(greenStatus)
        setButtonBackgroundGreen("white")
        setButtonGreen("green")
        // =================================
        setButtonBackgroundOrange("orange")
        setButtonOrange("white")

        setButtonBackgroundRed("red")
        setButtonRed("white")

        setButtonBackgroundDark("black")
        setButtonDark("white")

        setButtonBackgroundGrey("grey")
        setButtonGrey("white")
    }
    function showOrange() {
        setfilteredPolls(orangeStatus)
        setButtonBackgroundOrange("white")
        setButtonOrange("orange")
        // =================================
        setButtonBackgroundGreen("green")
        setButtonGreen("white")

        setButtonBackgroundRed("red")
        setButtonRed("white")

        setButtonBackgroundDark("black")
        setButtonDark("white")

        setButtonBackgroundGrey("grey")
        setButtonGrey("white")       
    }
    function showRed() {
        setfilteredPolls(redStatus)
        setButtonBackgroundRed("white")
        setButtonRed("red")
        // =================================
        setButtonBackgroundGreen("green")
        setButtonGreen("white")

        setButtonBackgroundOrange("orange")
        setButtonOrange("white")

        setButtonBackgroundDark("black")
        setButtonDark("white")

        setButtonBackgroundGrey("grey")
        setButtonGrey("white")
    }
    function showBlack() {
        setfilteredPolls(darkStatus)
        setButtonBackgroundDark("white")
        setButtonDark("black")
        // =================================
        setButtonBackgroundGreen("green")
        setButtonGreen("white")

        setButtonBackgroundOrange("orange")
        setButtonOrange("white")

        setButtonBackgroundRed("red")
        setButtonRed("white")

        setButtonBackgroundGrey("grey")
        setButtonGrey("white")
    }
    function showGrey() {
        setfilteredPolls(greyStatus)
        setButtonBackgroundGrey("white")
        setButtonGrey("grey")
        // =================================
        setButtonBackgroundGreen("green")
        setButtonGreen("white")

        setButtonBackgroundOrange("orange")
        setButtonOrange("white")

        setButtonBackgroundRed("red")
        setButtonRed("white")

        setButtonBackgroundDark("black")
        setButtonDark("white")
    }
    function showRemove() {
        setfilteredPolls(result_all_status_device)
        // =================================
        setButtonBackgroundGreen("green")
        setButtonGreen("white")

        setButtonBackgroundOrange("orange")
        setButtonOrange("white")

        setButtonBackgroundRed("red")
        setButtonRed("white")

        setButtonBackgroundDark("black")
        setButtonDark("white")

        setButtonBackgroundGrey("grey")
        setButtonGrey("white")
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

    console.log("buttonBackgroundGreen", buttonBackgroundGreen)


    return (
        <div>
            <Widget styleName={`gx-card-full gx-p-4`} >
                <HeaderStatusDevice result_all_status_device={result_all_status_device} />
                <div style={{ margin: "20px 0" }} >
                    <h2 style={{ margin: "20px 0 30px 0" }}>Device Berdasarkan Status</h2>
                    <Button
                        onClick={() => showGreen()}
                        style={{
                            backgroundColor: `${buttonBackgroundGreen}`,
                            color: `${buttonGreen}`,
                            borderColor: "green"
                        }}
                    >Online</Button>
                    <Button
                        onClick={() => showOrange()}
                        style={{
                            backgroundColor: `${buttonBackgroundOrange}`,
                            color: `${buttonOrange}`,
                            borderColor: "orange"

                        }}
                    >2 Hari Off</Button>
                    <Button
                        onClick={() => showRed()}
                        style={{
                            backgroundColor: `${buttonBackgroundRed}`,
                            color: `${buttonRed}`,
                            borderColor: "red"

                        }}
                    > Dalam Pemantauan</Button>
                    <Button
                        onClick={() => showGrey()}
                        style={{
                            backgroundColor: `${buttonBackgroundGrey}`,
                            color: `${buttonGrey}`,
                            borderColor: "grey"

                        }}
                    > Off</Button>
                    <Button
                        onClick={() => showBlack()}
                        style={{
                            backgroundColor: `${buttonBackgroundDark}`,
                            color: `${buttonDark}`,
                            borderColor: "black"

                        }}
                    > Pelaporan Bapenda</Button>
                    <Button
                        onClick={() => showRemove()}

                    // style={{
                    //     backgroundColor: `${buttonBackgroundGreen}`,
                    //     color: `${buttonGreen}`
                    // }}
                    > Remove</Button>
                    <Search placeholder="Cari data ..."
                        enterButton="Search"
                        style={{ margin: "20px 0 0 0" }}
                        size="large"
                        onChange={handleChangeData}
                        value={filter} />
                </div>
            </Widget>
            <Row className="container-dashboard1">
                <CardStatusDevice
                    // latestTransaction={latestTransaction} 

                    // filteredPolls={filteredPolls} setfilteredPolls ={setfilteredPolls}
                    result_all_status_device={filteredData}
                    stateWarna={stateWarna} setStateWarna={setStateWarna}
                // setLatestTransaction={setLatestTransaction} 
                />
            </Row>

        </div>

    );
};

export default StatusDeviceRestoran;
