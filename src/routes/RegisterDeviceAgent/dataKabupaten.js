import React, { useState, useEffect } from "react";
import { Select} from "antd";
const { Option } = Select;

function DataKabupaten(props) {
    const { kabKotaId, setKabKotaId,provinceId ,kab, setKab, errorKab, setErrorKab} = props
    const [idKab, setIdKab] = useState({})
    const [kabupaten, setKabupaten] = useState([{}])
 
    useEffect(
        () => {
            setKabKotaId(
                idKab.key
            )
        },
        [idKab.key]
    );
    
    useEffect(() => {
        getKabupaten();
    }, [provinceId]);
    
    const getKabupaten = async () => {
        const response = await
            fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${provinceId}`)
                .then(response => response.json())
                .then(regencies => {
                    setKabupaten({ data: regencies.kota_kabupaten })
                })
        // .then(response => response)
        // .then(regencies => console.log(regencies));
        // fetch(`http://www.emsifa.com/api-wilayah-indonesia/#/api/regencies/15.json`, {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     // body: JSON.stringify(body)
        //  
    };
    const handleChangeKabupaten = (value, key) => {
        setKab(value);
        setIdKab(key)
    };

    return (
        <div>
            <h4 style={{ margin: "20px 0 20px 0", color: "#53586D" }}>Kabupaten</h4>

            <Select
                style={{ margin: "40px 0 0 0" }}
                name="kabupaten"
                onChange={handleChangeKabupaten}
                value={kab}
                rules={[
                    { type: 'array', required: true, message: 'Pilih Kabupaten Yang Ada' },
                ]}
                placeholder="Pilih Kabupaten"
                style={{ width: "100%" }} >
                {kabupaten.data?.map((item) => (
                    <Option key={item.id} value={item.nama} ></Option>
                ))}
            </Select>
            {errorKab && (
                <div style={{ color: "red" }}>{errorKab}</div>
            )}
        </div>
    );
}

export default DataKabupaten;