import React, { useState, useEffect } from "react";
import TableDevice from "./TableDevice";
import { Row, Col, Typography,Button,Input } from 'antd';
import SearchDevice from "./SearchDevice";
import jwtDecode from "jwt-decode";
import Widget from "components/Widget/index";
import {FormOutlined} from '@ant-design/icons';
import HeaderStatusDevice from "./Header Status Device";
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
    console.log("listDevice", listDevice)

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
    const data = listDevice?.map(row => ({
        // key : row.toString(),
        device_id: row[0].stringValue,
        owner: row[1].stringValue,
        email: row[3].stringValue,
        nama_usaha: row[4].stringValue,
        type_pajak: row[7].stringValue,
        nik: row[2].stringValue,
        alamat: row[5].stringValue,
        data_source: row[6].stringValue,
        isactive: row[8].stringValue,
        status : row [9].stringValue,
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
    const [filteredPolls, setfilteredPolls] = useState(data)



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
    console.log("filteredPolls", filteredPolls)

    console.log("filteredData", filteredData)
    const greenStatus = data?.filter(o => o.status === "green");
    const orangeStatus = data?.filter(o => o.status === "orange");
    const redStatus = data?.filter(o => o.status === "red");

    function showGreen() {
        setfilteredPolls(greenStatus)
        setButtonBackgroundGreen("white")
        setButtonGreen("green")
        // =================================
        setButtonBackgroundOrange("orange")
        setButtonOrange("white")

        setButtonBackgroundRed("red")
        setButtonRed("white")

      
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
    }
     
    function showRemove  ()  {
        setfilteredPolls(data)
        // =================================
        setButtonBackgroundGreen("green")
        setButtonGreen("white")

        setButtonBackgroundOrange("orange")
        setButtonOrange("white")

        setButtonBackgroundRed("red")
        setButtonRed("white")

      
    }

    console.log("filyter", filter)
    return (
        <>
            <Widget styleName="gx-order-history">
                <Row>
                <HeaderStatusDevice   data={data}/>

                </Row>
                <Row>
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
                        onClick={() => showRemove()}
                    > Remove</Button>
                    <Search placeholder="Cari data ..."
                        enterButton="Search"
                        style={{ margin: "20px 0 " }}
                        size="large"
                        onChange={handleChangeData}
                        value={filter} />
                </div>
                </Row>
                <Row>
                    <Col span={12}>
                        <Title style={{ float: "left" }} level={4}> Daftar Device / Agent</Title>
                    </Col>
                    {/* <Col span={12}>
                        <SearchDevice style={{ float: "right" }} filter={filter}
                            handleChangeData={handleChangeData} setFilter={setFilter}
                            onSearch={handleChangeData}
                        /></Col> */}
                </Row>
                <div className="gx-table-responsive">
                    <TableDevice FormOutlined={FormOutlined} listData={listData} 
                    setListData={setListData} 
                     data={filteredPolls || filter? filteredData : data}
                    //  data={filteredData }

                     />
                </div>
            </Widget>
        </>
    );

};

export default SectionDevice;