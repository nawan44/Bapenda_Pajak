import React, { useState, useEffect } from "react";
import TableDevice from "./TableDevice";
import { Row, Col, Typography, Input } from 'antd';
import jwtDecode from "jwt-decode";
import Widget from "components/Widget/index";
import HeaderStatusDevice from "./Header Status Device";
import { StatusFilter } from "./statusFilter";
import styles from "../../../assets/styles/select-option.css";

const Search = Input.Search;

const { Title } = Typography;

const SectionDevice = (props) => {
    const { listData, setListData, aksiList } = props
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
    const dataRestoran = listDevice?.filter(o => 
        o[7].stringValue === "Restoran")
        console.log("Restoran??", dataRestoran)

    const data = dataRestoran?.map((row, index) => ({
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
    }));

    const [state, setState] = useState(data)
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
            ({ status }) => status === selectedStatus
        );
        console.log("filteredEvents", filteredEvents)

        setState(
            filteredEvents
        );


    };
    console.log("data", data)
    const handleSearch = (searchText) => {
        const lowercasedFilter = filter.toString().toLowerCase();

        const filteredEvents = data?.filter((item) => {
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
                                <Title style={{ float: "left" }} level={4}> Daftar Device Restoran</Title>
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