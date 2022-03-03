import React, { useState, useEffect } from "react";
import { Select } from "antd";
const { Option } = Select;

function DataKelurahan(props) {
    const {kelId, setKelId, kecId,kel, setKel , errorKel, setErrorKel} = props
    const [idKel, setIdKel] = useState({})
    const [kelurahan, setKelurahan] = useState([{}])


    useEffect(
        () => {
            setKelId(
                idKel.key
            )
        },
        [idKel.key]
    );
    useEffect(() => {
        getKelurahan();
    }, [kecId]);
    const getKelurahan = async () => {
        const response = await
            fetch(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${kecId}`)
                .then(response => response.json())
                .then(res => {
                    setKelurahan({ data: res.kelurahan })

                })

    };

    const handleChangeKelurahan = (value, key) => {
        setKel(value);
        setIdKel(key)

    };
    return (
        <div>
            <h4 style={{ margin: "20px 0 20px 0", color: "#53586D" }}>Kelurahan</h4>

            <Select
                style={{ margin: "40px 0 0 0" }}
                name="kelurahan"
                onChange={handleChangeKelurahan}
                value={kel}
                rules={[
                    { type: 'array', required: true, message: 'Pilih Kelurahan Yang Ada' },
                ]}
                placeholder="Pilih Kelurahan"
                style={{ width: "100%" }} >
                {kelurahan.data?.map((item) => (
                    <Option key={item.id} value={item.nama} ></Option>
                ))}
            </Select>
            {errorKel && (
                <div style={{ color: "red" }}>{errorKel}</div>
            )}
        </div>
    );
}

export default DataKelurahan;