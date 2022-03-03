import React, { useState, useEffect } from "react";
import {
    PageHeader, Form, Input, Card, Cascader, Steps, Button, Select
} from "antd";
const { Option } = Select;

function DataProvinsi(props) {
    const { provinceId, setProvinceId, prov, setProv, errorProv, setErrorProv } = props

    const [provinsi, setProvinsi] = useState([{}])
    const [idProv, setIdProv] = useState({})

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
        // let text = value.target.value;
        // let regAngka = /^[0-9\b]+$/i;


        // console.log(text);
    };
    return (
        <div>
            <h4 style={{ margin: "20px 0 20px 0", color: "#53586D" }}>Provinsi</h4>
            <Select
                // defaultValue="lucy" 
                style={{ margin: "40px 0 0 0" }}
                name="provinsi"
                onChange={handleChangeProvinsi}
                value={prov}
                rules={[
                    { required: true, message: 'Pilih Provinsi Yang Ada' },
                ]}
                placeholder="Pilih Provinsi" required
                style={{ width: "100%" }} >
                {provinsi.data?.map((item) => (
                    <Option key={item.id} value={item.nama}
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