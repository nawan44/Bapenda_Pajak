import React, { useState, useEffect } from "react";
import TableDevice from "./TableDevice";
import { Row, Col, Typography,Button } from 'antd';
import SearchDevice from "./SearchDevice";
import jwtDecode from "jwt-decode";
import Widget from "components/Widget/index";
import {FormOutlined} from '@ant-design/icons';

const { Title } = Typography;

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

const SectionDevice = (props) => {
    const { listData, setListData } = props
    console.log("listData", listData)
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',

    });
    const [state, setState] = useState();
    const [filter, setFilter] = useState("");
   
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
    const data = listDevice && listDevice.map(row => ({
        // key : row.toString(),
        device_id: row[0].stringValue,
        owner: row[1].stringValue,
        email: row[3].stringValue,
        nama_usaha: row[4].stringValue,
        type_pajak: row[6].stringValue,

        nik: row[2].stringValue,
        alamat: row[5].stringValue,
        data_source: row[7].stringValue,
        isactive: row[8].stringValue,

    }));
    useEffect(() => {
        setState({ eventsData });
    }, [eventsData]);

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
            <Widget styleName="gx-order-history">
                <Row>
                    <Col span={12}>
                        <Title style={{ float: "left" }} level={4}> Daftar Device / Agent</Title>
                    </Col>
                    <Col span={12}>
                        <SearchDevice style={{ float: "right" }} filter={filter}
                            handleChangeData={handleChangeData} setFilter={setFilter}
                            onSearch={handleChangeData}
                        /></Col>
                </Row>
                {/* <header  >


            </header> */}
                <div className="gx-table-responsive">

                    <TableDevice listData={listData} setListData={setListData}  data={filteredData} />
                </div>
            </Widget>
        </>
    );

};

export default SectionDevice;