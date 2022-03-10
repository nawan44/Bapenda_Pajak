import React, { useState, useEffect } from "react";
import {
    PageHeader, Form, Input, Card, Cascader, Steps, Button, Select
} from "antd";
const { Option } = Select;

function DataProvinsi(props) {
    const {listData, searchProvinceId,setSearchtProvinceId,itemList,  provTrim, provinceId, setProvinceId, prov, setProv, errorProv, setErrorProv } = props

    // const [searchProvinsi, setSearchProvinsi] = useState()
    const [provinsi, setProvinsi] = useState([{}])
    const [idProv, setIdProv] = useState({})
    const searcIdProv =  provinsi.data?.find( o => o.nama === prov.replace(/^\s+/g, '') )

    useEffect(
        () => {
            if (itemList){
            setSearchtProvinceId(
                searcIdProv?.id           
                
                );}
        },
        [searcIdProv?.id]
    );
    useEffect(
        () => {
            setProvinceId(
                idProv.key
            );
        },
        [idProv.key]
    );
    useEffect(() => {
        getProvinsi();
    }, []);
   
 
    const getProvinsi = async () => {
        const response = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
            .then(response => response.json())
            .then(provinces => {
                setProvinsi({  data:provinces.provinsi })
            })
    };

    const handleChangeProvinsi = (value, key) => {
        setProv(value);
        setIdProv(key)
    };
    return (
        <div>
            <h4 style={{ margin: "30px 0 10px 0", color: "#53586D", textAlign:"left"  }}>Provinsi</h4>
            <Select
                // defaultValue="lucy" 
                style={{ margin: "40px 0 0 0", textAlign:"left" }}
                name="provinsi"
                onChange={handleChangeProvinsi}
                value={ prov}
                rules={[
                    { required: true, message: 'Pilih Provinsi Yang Ada' },
                ]}
                placeholder="Pilih Provinsi" required
                style={{ width: "100%" }} >
                {provinsi.data?.map((item) => (
                    <Option key={item.id} value={item.nama}
                    style={{textAlign:"left" }}
                        required
                        rules={[
                            { required: true, message: 'Pilih Provinsi Yang Ada' },
                        ]} >
                    </Option>
                ))}
            </Select>
            {errorProv && (
                <div style={{ color: "red", fontFamily:"NoirPro, sans-serif" }}>{errorProv}</div>
            )}
        </div>
    );
}

export default DataProvinsi;