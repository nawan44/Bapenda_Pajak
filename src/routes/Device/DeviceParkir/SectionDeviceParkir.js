import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Input, Button } from 'antd';
import jwtDecode from "jwt-decode";
import Widget from "components/Widget/index";
import HeaderStatusDevice from "../DeviceAll/Header Status Device";
import TableDevice from "../DeviceAll/TableDevice";
import {useHistory, useLocation} from "react-router-dom";

// import styles from "../../../assets/styles/select-option.css";

const Search = Input.Search;

const { Title } = Typography;

const SectionDeviceParkir = (props) => {
    const history = useHistory();
    let location = useLocation();
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
    const dataParkir = listDevice?.filter(o =>
        o[7].stringValue === "Parkir")
    console.log("Parkir??", dataParkir)

    const data = dataParkir?.map((row, index) => ({
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
        key: index,
    }));

    const [filteredPolls, setfilteredPolls] = useState(data)
    const greenStatus = data?.filter(item => item.status === "green")
    const orangeStatus = data?.filter(item => item.status === "orange")
    const redStatus = data?.filter(item => item.status === "red")

    console.log("filteredPolls", filteredPolls)
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

    function showRemove() {
        setfilteredPolls(data)
        // =================================
        setButtonBackgroundGreen("green")
        setButtonGreen("white")
        setButtonBackgroundOrange("orange")
        setButtonOrange("white")
        setButtonBackgroundRed("red")
        setButtonRed("white")
    }
    const handleChangeData = (event) => {
        setFilter(event.target.value);
    };
    const lowercasedFilter = filter.toString().toLowerCase();
    console.log("lowercasedFilter", lowercasedFilter)

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
    const titleStatus = () => {
        if(location.pathname ==="/device-all" ) {
          return "All"
        } else if(location.pathname ==="/device-restoran" ) {
          return "Restoran"
        }else if(location.pathname ==="/device-parkir" ) {
          return "Parkir"
        }else if(location.pathname ==="/device-hotel" ) {
          return "Hotel"
        }
      }
    return (
        <>
            <Widget styleName="gx-order-history  gx-p-4 ">
                <Row>
                    <HeaderStatusDevice data={data} />
                </Row>
                <Row>
                    <div style={{ margin: "20px 0" }} >
                        <h2 style={{ margin: "20px 0 30px 0" }}>Device  {titleStatus()} Berdasarkan Status</h2>
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
                        > &gt; 3 Hari Off</Button>

                        <Button
                            onClick={() => showRemove()}
                        > Remove</Button>
                        <Search placeholder="Cari data ..."
                            enterButton="Search"
                            style={{ margin: "20px 0 0 0" }}
                            size="large"
                            onChange={handleChangeData}
                            value={filter} />
                    </div>
                </Row>

                <Row style={{ margin: "30px 0 5px 0" }}>
                    <Col span={24}>
                        <Title style={{ float: "left" }} level={4}> Daftar Device  {titleStatus()}</Title>
                    </Col>

                </Row>
                <div className="gx-table-responsive">
                    <TableDevice data={filter === "" ? filteredPolls || data : filteredData} listData={listData} setListData={setListData} />
                </div>
            </Widget>
        </>
    );

};

export default SectionDeviceParkir;