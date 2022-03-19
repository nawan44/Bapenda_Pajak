import React, { useState, useEffect } from "react";
import TableDevice from "./TableDevice";
import { Row, Col, Typography, Button, Input } from 'antd';
import jwtDecode from "jwt-decode";
import Widget from "components/Widget/index";
import { FormOutlined } from '@ant-design/icons';
import HeaderStatusDevice from "./Header Status Device";
import { StatusFilter } from "./statusFilter";
import styles from "../../../assets/styles/select-option.css";

const Search = Input.Search;

const { Title } = Typography;

const SectionDevice = (props) => {
    const { listData, setListData } = props
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',

    });
    const [filter, setFilter] = useState("");
    const [buttonGreen, setButtonGreen] = useState("white")
    const [buttonBackgroundGreen, setButtonBackgroundGreen] = useState("green")

    const [buttonOrange, setButtonOrange] = useState("white")
    const [buttonBackgroundOrange, setButtonBackgroundOrange] = useState("orange")

    const [buttonRed, setButtonRed] = useState("white")
    const [buttonBackgroundRed, setButtonBackgroundRed] = useState("red")

    const [listDevice, setListDevice] = useState()

    useEffect(() => {
        getListDevice();
    }, []);
    const getListDevice = async (dataLatest) => {
        const decoded = jwtDecode(localStorage.token)
        const apiKey = decoded["api-key"]
        const token = localStorage.getItem('token')
        const headers = {
            'x-api-key': `${apiKey}`,
            'content-type': 'application/json',

            'Authorization': `Bearer ${token}`
        }
        const response = await fetch(
            "https://api.raspi-geek.com/v1/merchants",

            { method: "GET", headers }
        );
        const ajson = await response.json();
        setListDevice(ajson.Records)
    }
    const data = listDevice?.map((row, index) => ({
        key: index,
        device_id: row[0].stringValue,
        owner: row[1].stringValue,
        email: row[3].stringValue,
        nama_usaha: row[4].stringValue,
        type_pajak: row[7].stringValue,
        nik: row[2].stringValue,
        alamat: row[5].stringValue,
        data_source: row[6].stringValue,
        isactive: row[8].stringValue,
        status: row[9].stringValue,
        // device_id: row[0].stringValue,
        // owner: row[1].stringValue,
        // email: row[3].stringValue,
        // nama_usaha: row[4].stringValue,
        // type_pajak: row[6].stringValue,
        // nik: row[2].stringValue,
        // alamat: row[5].stringValue,
        // data_source: row[6].stringValue,
        // isactive: row[7].stringValue,
    }));

    const [state, setState] = useState(data)

    // const [filteredPolls, setfilteredPolls] = useState(data)


    // const lowercasedFilter = filter.toString().toLowerCase();
    const handleFilter = (key) => {
        const selected = parseInt(key);
        if (selected === 4) {
            return setState(
                data
            );
        }

        const statusMap = {

            1: "green",
            2: "orange",
            3: "red"
        }


        const selectedStatus = statusMap[selected];

        const filteredEvents = data?.filter(
            //   o => o.status === selectedStatus

            ({ status }) => status === selectedStatus
        );
        console.log("filteredEvents", filteredEvents)

        setState(
            filteredEvents
        );


    };
    console.log("data", data)


    // const [filteredButton, setfilteredButton] = useState(filtered)
    const handleSearch = (searchText) => {
        // const filteredEvents = data?.filter(( title ) => {
        //   title = title?.toLowerCase();
        //   return title.includes(searchText);
        // });
        const lowercasedFilter = filter.toString().toLowerCase();

        const filteredEvents = data?.filter((item) => {
            console.log("lowercasedFilter filteredEvents", lowercasedFilter)

            try {
                return Object.keys(item).some((key) => {
                    if (item[key]) {
                        return item[key].toLowerCase().includes(searchText);
                    }
                });
            } catch (e) {
                console.log("data tidak ada");
            }
        });
        console.log("filteredEvents filteredEvents", filteredEvents)
        setState(
            filteredEvents
        );
    };
    const lowercasedFilter = filter.toString().toLowerCase();
    const filteredData = data?.filter((item) => {
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
    // console.log("filteredPolls", filteredPolls)

    // // console.log("filteredData", filteredData)
    // const greenStatus = data?.filter(o => o.status === "green");
    // const orangeStatus = data?.filter(o => o.status === "orange");
    // const redStatus = data?.filter(o => o.status === "red");

    // function showGreen() {
    //     setfilteredPolls(greenStatus)
    //     setButtonBackgroundGreen("white")
    //     setButtonGreen("green")
    //     // =================================
    //     setButtonBackgroundOrange("orange")
    //     setButtonOrange("white")

    //     setButtonBackgroundRed("red")
    //     setButtonRed("white")


    // }
    // function showOrange() {
    //     setfilteredPolls(orangeStatus)
    //     setButtonBackgroundOrange("white")
    //     setButtonOrange("orange")
    //     // =================================
    //     setButtonBackgroundGreen("green")
    //     setButtonGreen("white")

    //     setButtonBackgroundRed("red")
    //     setButtonRed("white")

    // }
    // function showRed() {
    //     setfilteredPolls(redStatus)
    //     setButtonBackgroundRed("white")
    //     setButtonRed("red")
    //     // =================================
    //     setButtonBackgroundGreen("green")
    //     setButtonGreen("white")

    //     setButtonBackgroundOrange("orange")
    //     setButtonOrange("white")
    // }
    // function showRemove  ()  {
    //     setfilteredPolls(data)
    //     // =================================
    //     setButtonBackgroundGreen("green")
    //     setButtonGreen("white")

    //     setButtonBackgroundOrange("orange")
    //     setButtonOrange("white")

    //     setButtonBackgroundRed("red")
    //     setButtonRed("white")


    // }

    console.log("filyter", filter)
    return (
        <>
            <Widget styleName="gx-order-history  gx-p-4 ">
                <Row>
                    <HeaderStatusDevice data={data} />
                </Row>
                    <Row style={{margin:"40px 0 20px 0"}}>
                        <Col span={4}>
                            <StatusFilter
                                filterBy={handleFilter}
                                className={styles.action}
                            />
                           
                            
                            </Col>
                            <Col span={20}>
                            <Search value={filter} size="large" onChange={handleChangeData} enterButton="Search"
                                onSearch={handleSearch} className={styles.action} />
                        </Col>
                        </Row>
                <Row>
                            <Col span={12}>
                                <Title style={{ float: "left" }} level={4}> Daftar Device / Agent</Title>
                            </Col>

                        </Row>
                        <div className="gx-table-responsive">
                            <TableDevice data={filter === "" ? data : state} listData={listData} setListData={setListData}/>
                        </div>
            </Widget>
        </>
    );

};

export default SectionDevice;