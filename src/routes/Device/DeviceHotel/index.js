import React, { useState } from "react";
import EditDeviceAgent from "../../EditDeviceAgent";
import SectionDeviceHotel from "./SectionDeviceHotel";
import DeviceSummary from "../DeviceAll/DeviceSummary";

const DeviceAll = () => {
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
  <SectionDeviceHotel  listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList}/>
    </>
  );
};

export default DeviceAll;
