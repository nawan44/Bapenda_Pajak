import React, { useState } from "react";
import EditDeviceAgent from "../../EditDeviceAgent";
import SectionDeviceRestoran from "./SectionDeviceRestoran";
import DeviceSummary from "../DeviceAll/DeviceSummary";

const DeviceRestoran = () => {
  const [selectedRecord, setSelectedRecord] = useState()
  const [listData, setListData] = useState({
    aksiList: "",
    itemList: null,
  });
  if (listData.aksiList === "editData") {
    return (<EditDeviceAgent selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    )
  } else if (listData.aksiList === "lihatData") {
    return (<DeviceSummary selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    )
  }
  else {
    // console.log("")
  }
  return (
    <>
      <SectionDeviceRestoran listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    </>
  );
};

export default DeviceRestoran;
