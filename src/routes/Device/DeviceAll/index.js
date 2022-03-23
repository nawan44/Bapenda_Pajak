import React, { useState } from "react";
import EditDeviceAgent from "../../EditDeviceAgent";
import SectionDevice from "./SectionDevice";
import DeviceSummary from "./DeviceSummary";

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

  <SectionDevice  listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList}/>
    </>
  );
};

export default DeviceAll;
