import React, { useState, useEffect } from "react";
import { Select } from "antd";
import DataKelurahan from "./dataKelurahan";
const { Option } = Select;

function DataKecamatan(props) {
  const {
    searchKecId,
    setSearchKecId,
    searchKelId,
    setSearchKelId,
    listData,
    itemList,
    searchKabKotaId,
    kelId,
    setKelId,
    kecId,
    setKecId,
    kabKotaId,
    kec,
    setKec,
    kel,
    setKel,
    errorKec,
    errorKel,
    setErrorKel,
  } = props;
  const [idKec, setIdKec] = useState({});
  const [kecamatan, setKecamatan] = useState([{}]);
  const searchIdKec = kecamatan.data?.find(
    (o) => o.nama === kec?.replace(/^\s+/g, "")
  );

  useEffect(() => {
    if (itemList) {
      setSearchKecId(searchIdKec?.id);
    }
  }, [searchIdKec?.id]);
  useEffect(() => {
    setKecId(idKec.key);
  }, [idKec.key]);

  const funcIdKab = () => {
    if (itemList) {
      return searchKabKotaId;
    } else {
      return kabKotaId;
    }
  };
  useEffect(() => {
    getKecamatan();
  }, [funcIdKab()]);

  const getKecamatan = async () => {
    const response = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${funcIdKab()}`
    )
      .then((response) => response.json())
      .then((res) => {
        setKecamatan({ data: res.kecamatan });
      });
  };
  const handleChangeKecamatan = (value, key) => {
    setKec(value);
    setIdKec(key);
  };
  return (
    <div>
      <h4
        style={{ margin: "30px 0 10px 0", color: "#53586D", textAlign: "left" }}
      >
        Kecamatan
      </h4>

      <Select
        // defaultValue="lucy"
        style={{ textAlign:"left" ,width: "100%" }}
        name="kecamatan"
        onChange={handleChangeKecamatan}
        value={kec}
        rules={[
          {
            type: "array",
            required: true,
            message: "Pilih Kecamatan Yang Ada",
          },
        ]}
        placeholder="Pilih Kecamatan"
      >
        {kecamatan.data?.map((item) => (
          <Option key={item.id} value={item.nama}></Option>
        ))}
      </Select>
      {errorKec && <div style={{ color: "red" }}>{errorKec}</div>}
      {kec && (
        <DataKelurahan
          searchKecId={searchKecId}
          setSearchKecId={setSearchKecId}
          searchKelId={searchKelId}
          setSearchKelId={setSearchKelId}
          itemList={itemList}
          listData={listData}
          kelId={kelId}
          setKelId={setKelId}
          kel={kel}
          setKel={setKel}
          errorKel={errorKel}
          setErrorKel={setErrorKel}
          kecId={kecId}
        />
      )}
    </div>
  );
}

export default DataKecamatan;
