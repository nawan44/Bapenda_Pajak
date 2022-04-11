import React from "react";
import Productivity from "../../../components/Widgets/Productivity";

const DeviceSummary = ({ selectedRecord, setSelectedRecord, listData, setListData, aksiList, itemList }) => {
  
    
  return (
    <>
        <Productivity  selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    </>
  );
};

export default DeviceSummary;
