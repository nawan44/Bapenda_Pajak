import React, { useState, useEffect } from "react";
import { Select } from "antd";
const { Option } = Select;

function DataKelurahan(props) {
  const {
    setSearchKelId,
    searchKecId,
    itemList,
    setKelId,
    kecId,
    kel,
    setKel,
    errorKel,
  } = props;
  const [idKel, setIdKel] = useState({});
  const [kelurahan, setKelurahan] = useState([{}]);
  const searchIdKel = kelurahan.data?.find(
    (o) => o.nama === kel?.replace(/^\s+/g, "")
  );

  useEffect(() => {
    if (itemList) {
      setSearchKelId(searchIdKel?.id);
    }
  }, [searchIdKel?.id]);
  useEffect(() => {
    setKelId(idKel.key);
  }, [idKel.key]);

  const funcIdKec = () => {
    if (itemList) {
      return searchKecId;
    } else {
      return kecId;
    }
  };

  useEffect(() => {
    getKelurahan();
  }, [funcIdKec()]);

  const getKelurahan = async () => {
    const response = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${funcIdKec()}`
    )
      .then((response) => response.json())
      .then((res) => {
        setKelurahan({ data: res.kelurahan });
      });
  };

  const handleChangeKelurahan = (value, key) => {
    setKel(value);
    setIdKel(key);
  };
  return (
    <div>
      <h4
        style={{ margin: "30px 0 10px 0", color: "#53586D", textAlign: "left" }}
      >
        Kelurahan
      </h4>

      <Select
        style={{ textAlign: "left", width: "100%" }}
        name="kelurahan"
        onChange={handleChangeKelurahan}
        value={kel}
        rules={[
          {
            type: "array",
            required: true,
            message: "Pilih Kelurahan Yang Ada",
          },
        ]}
        placeholder="Pilih Kelurahan"
      >
        {kelurahan.data?.map((item) => (
          <Option key={item.id} value={item.nama}></Option>
        ))}
      </Select>
      {errorKel && <div style={{ color: "red" }}>{errorKel}</div>}
    </div>
  );
}

export default DataKelurahan;
