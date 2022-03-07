import React, { useState, useEffect } from "react";
import EventsTable from "./EventTable";
import { Row, Col, Typography } from 'antd';
import TitleSearch from "./TitleSearch";
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

const EventsSection = (props) => {
    const { latestTransaction, setLatestTransaction } = props
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      
      });
    const [state, setState] = useState();
    const [filter, setFilter] = useState("");
    const data = latestTransaction && latestTransaction.map(row => ({
        invoice_id: row[0].stringValue,
        merchant_id: row[1].stringValue,
        nama_usaha: row[2].stringValue,
        total_value: formatter.format(row[3].stringValue) , 
        created_at: row[4].stringValue
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
        <section   >
            <Row>
                <Col span={12}>    
                <Title style={{float:"left"}} level={4}> Latest Transaction</Title>
                </Col>
                <Col span={12}>
                    <TitleSearch style={{float:"right"}}  filter={filter} handleChangeData={handleChangeData} setFilter={setFilter} onSearch={handleChangeData}
                /></Col>
            </Row>
            <header  >


            </header>

            <EventsTable data={filteredData} />
        </section>
    );

};

export default EventsSection;