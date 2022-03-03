import React, { useState, useEffect } from "react";
import { Select} from "antd";
import DataKelurahan from "./dataKelurahan";
const { Option } = Select;

function DataKecamatan(props) {
    const {kelId, setKelId, kecId, setKecId, kabKotaId, kec, setKec,kel, setKel, errorKec, setErrorKec, errorKel, setErrorKel } = props
    const [idKec, setIdKec] = useState({})
    const [kecamatan, setKecamatan] = useState([{}])

    useEffect(
        () => {
            setKecId(
                idKec.key
            )
        },
        [idKec.key]
    );
    useEffect(() => {
        getKecamatan();
    }, [kabKotaId]);
    const getKecamatan = async () => {
        const response = await
            fetch(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${kabKotaId}`)
                .then(response => response.json())
                .then(res => {
                    setKecamatan({ data: res.kecamatan })

                })
        // console.log("responseresponseresponseresponseresponseresponse", response)

    };
    const handleChangeKecamatan = (value,key) => {
        setKec(value);
        setIdKec(key)
    };

    return (
        <div>
          <h4 style={{ margin: "20px 0 20px 0", color: "#53586D" }}>Kecamatan</h4>

<Select
    // defaultValue="lucy" 
    style={{ margin: "40px 0 0 0" }}
    name="kecamatan"
    onChange={handleChangeKecamatan}
    value={kec}
    rules={[
        { type: 'array', required: true, message: 'Pilih Kecamatan Yang Ada' },
    ]}
    placeholder="Pilih Kecamatan"
    style={{ width: "100%" }} >
    {kecamatan.data?.map((item) => (
        <Option key={item.id} value={item.nama}  ></Option>
    ))}
</Select>
{errorKec && (
                <div style={{ color: "red" }}>{errorKec}</div>
            )}
{kec && (
<DataKelurahan  kelId={kelId} setKelId={setKelId} kel={kel} setKel={setKel} errorKel={errorKel} setErrorKel={setErrorKel} kecId={kecId}/>
 )}
        </div>
    );
}

export default DataKecamatan;