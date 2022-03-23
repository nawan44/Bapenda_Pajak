import React, { useState } from "react";
import EditDeviceAgent from "../../EditDeviceAgent";
import SectionDeviceParkir from "./SectionDeviceParkir";
import DeviceSummary from "../DeviceAll/DeviceSummary";

const DeviceParkir = () => {
  const [selectedRecord, setSelectedRecord] = useState()
  const [listData, setListData] = useState({
    aksiList: "",
    itemList: null,
  });

  if (listData.aksiList === "editData") {
    return (<EditDeviceAgent selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    )
  } else  if (listData.aksiList === "lihatData") {
    return (<DeviceSummary selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    )
  }
  
  else {
    //  console.log("")
  }
  return (
    <>
  <SectionDeviceParkir  listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList}/>
    </>
  );
};

export default DeviceParkir;
