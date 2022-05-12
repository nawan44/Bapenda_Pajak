import React, { useState } from "react";
import EventsTable from "./EventTable";
import { Row, Col, Typography } from "antd";
import TitleSearch from "./TitleSearch";
const { Title } = Typography;

const EventsSection = (props) => {
  const { latestTransaction } = props;
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const [filter, setFilter] = useState("");
  const data =
    latestTransaction &&
    latestTransaction.map((row, index) => ({
      key: index + row[0].stringValue,
      invoice_id: row[0].stringValue,
      merchant_id: row[1].stringValue,
      nama_usaha: row[2].stringValue,
      total_value: formatter.format(row[3].stringValue),
      created_at: row[4].stringValue,
    }));

  const lowercasedFilter = filter.toString();
  const filteredData = data?.filter((item) => {
    try {
      return Object.keys(item).some((key) => {
        if (item[key]) {
          return item[key].toLowerCase().includes(lowercasedFilter);
        }
      });
    } catch (e) {
      // console.log("data tidak ada");
    }
  });
  const handleChangeData = (event) => {
    setFilter(event.target.value);
  };
  return (
    <>
      <Row>
        <Col span={12}>
          <Title style={{ float: "left" }} level={4}>
            {" "}
            Latest Transaction
          </Title>
        </Col>
        <Col span={12}>
          <TitleSearch
            style={{ float: "right" }}
            filter={filter}
            handleChangeData={handleChangeData}
            onSearch={handleChangeData}
          />
        </Col>
      </Row>

      <div className="gx-table-responsive">
        <EventsTable data={filteredData} />
      </div>
    </>
  );
};

export default EventsSection;
