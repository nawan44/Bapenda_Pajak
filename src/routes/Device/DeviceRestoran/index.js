import React, { useState } from "react";
import EditDeviceAgent from "../../EditDeviceAgent";
import SectionDevice from "./SectionDevice";
import DeviceSummaryRestoran from "./DeviceSummaryRestoran";

const DeviceAll = () => {
  const [selectedRecord, setSelectedRecord] = useState()
  const [listData, setListData] = useState({
    aksiList: "",
    itemList: null,
  });
  console.log("BBBBBBBBBBBB ListData",listData)

  if (listData.aksiList === "editData") {
    return (<EditDeviceAgent selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    )
  } else  if (listData.aksiList === "lihatData") {
    return (<DeviceSummaryRestoran selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    )
  }
  
  else {
     console.log("")
  }
  return (
    <>
  <SectionDevice  listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList}/>
    </>
  );
};

export default DeviceAll;
