import React, { useState, useEffect } from "react";
import { Select } from "antd";
const { Option } = Select;

function DataKabupaten(props) {
  const {
    itemList,
    setSearchKabKotaId,
    searchProvinceId,
    setKabKotaId,
    provinceId,
    kab,
    setKab,
    errorKab,
  } = props;
  const [idKab, setIdKab] = useState({});
  const [kabupaten, setKabupaten] = useState([{}]);
  const searchIdKab = kabupaten.data?.find(
    (o) => o.nama === kab?.replace(/^\s+/g, "")
  );

  useEffect(() => {
    if (itemList) {
      setSearchKabKotaId(searchIdKab?.id);
    }
  }, [searchIdKab?.id]);

  useEffect(() => {
    setKabKotaId(idKab.key);
  }, [idKab.key]);

  // useEffect(() => {
  //     getKabupaten();
  // }, [itemList]);
  const funcIdProv = () => {
    if (itemList) {
      return searchProvinceId;
    } else {
      return provinceId;
    }
  };
  useEffect(() => {
    getKabupaten();
  }, [funcIdProv()]);

  const getKabupaten = async () => {
    const response = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${funcIdProv()}`
    )
      .then((response) => response.json())
      .then((regencies) => {
        setKabupaten({ data: regencies.kota_kabupaten });
      });
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
    setIdKab(key);
  };

  return (
    <div>
      <h4
        style={{ margin: "30px 0 10px 0", color: "#53586D", textAlign: "left" }}
      >
        Kabupaten
      </h4>

      <Select
        style={{ textAlign: "left", width: "100%" }}
        name="kabupaten"
        onChange={handleChangeKabupaten}
        value={kab}
        rules={[
          {
            type: "array",
            required: true,
            message: "Pilih Kabupaten Yang Ada",
          },
        ]}
        placeholder="Pilih Kabupaten"
      >
        {kabupaten.data?.map((item) => (
          <Option key={item.id} value={item.nama}></Option>
        ))}
      </Select>
      {errorKab && <div style={{ color: "red" }}>{errorKab}</div>}
    </div>
  );
}

export default DataKabupaten;
