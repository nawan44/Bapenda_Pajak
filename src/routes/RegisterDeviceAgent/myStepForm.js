import React, { useState, useEffect } from "react";
import { Form, Input, Steps, Button, Select, message } from "antd";
import { useHistory } from "react-router-dom";
import DataProvinsi from "./dataProvinsi";
import DataKabupaten from "./dataKabupaten";
import DataKecamatan from "./dataKecamatan";
import "../../assets/styles/forRegistrasi.css";
import { Switch } from "antd";
import jwtDecode from "jwt-decode";

const { Option } = Select;

const { Step } = Steps;

function MyStepForm() {
  const history = useHistory();
  const [dataSumber, setDataSumber] = useState();
  const [category, setCategory] = useState();
  const [selectActive, setSelectActive] = useState(true);

  const [form] = Form.useForm();

  const [provinceId, setProvinceId] = useState(null);

  const [prov, setProv] = useState("");

  const [errorProv, setErrorProv] = useState(false);
  const [errorKab, setErrorKab] = useState(false);
  const [errorKec, setErrorKec] = useState(false);
  const [errorKel, setErrorKel] = useState(false);
  const [errorAlamat, setErrorAlamat] = useState(false);
  const [errorSumberData, setErrorSumberData] = useState(false);
  const [errorTypePajak, setErrorTypePajak] = useState(false);
  const [current, setCurrent] = useState(0);
  const [kabKotaId, setKabKotaId] = useState(null);
  const [kab, setKab] = useState("");
  const [kec, setKec] = useState("");
  const [kecId, setKecId] = useState(null);
  const [kel, setKel] = useState("");
  const [kelId, setKelId] = useState(null);
  const [alamatDetil, setAlamatDetil] = useState("");

  const [regisDeviceAgent, setRegisDeviceAgent] = useState({
    merchant_id: "",
    owner: "",
    nik: "",
    email: "",
    nama_usaha: "",
    alamat: "",
    kategori: "",
    data_source: "",
    isactive: true,
  });
  useEffect(
    () => {
      setRegisDeviceAgent({
        ...regisDeviceAgent,
        alamat:
          alamatDetil + ", " + kel + ", " + kec + ", " + kab + ", " + prov,
      });
    },
    [alamatDetil],
    [prov]
  );
  useEffect(() => {
    setRegisDeviceAgent({
      ...regisDeviceAgent,
      isactive: selectActive,
    });
  }, [selectActive]);
  useEffect(() => {
    setRegisDeviceAgent({
      ...regisDeviceAgent,
      kategori: category,
    });
  }, [category]);
  useEffect(() => {
    setRegisDeviceAgent({
      ...regisDeviceAgent,
      data_source: dataSumber,
    });
  }, [dataSumber]);

  useEffect(() => {
    if (provinceId) {
      setErrorProv("");
    }

    if (kabKotaId) {
      setErrorKab("");
    }
    if (kecId) {
      setErrorKec("");
    }
    if (kelId) {
      setErrorKel("");
    }
  }, [provinceId, kabKotaId, kecId, kelId]);
  useEffect(() => {
    if (alamatDetil) {
      setErrorAlamat("");
    }
  }, [alamatDetil]);
  useEffect(() => {
    if (dataSumber) {
      setErrorSumberData("");
    }
    if (category) {
      setErrorTypePajak("");
    }
  }, [dataSumber, category]);
  const success = () => {
    message.success("Pendaftaran Berhasil");
  };

  useEffect(() => {
    if (provinceId?.toString() !== kabKotaId?.toString().slice(0, -2)) {
      setKab("");
      setKec("");
      setKel("");
      setAlamatDetil("");
    }
    else if (
      kabKotaId?.toString() !== kecId?.toString().slice(0, -3) ||
      provinceId?.toString() !== kecId?.toString().slice(0, -5)
    ) {
      setKec("");
      setKel("");
      setAlamatDetil("");
    } else if (
      kecId?.toString() !== kelId?.toString().slice(0, -3) ||
      kabKotaId?.toString() !== kelId?.toString().slice(0, -6) ||
      provinceId?.toString() !== kelId?.toString().slice(0, -8)
    ) {
      setKel("");
      setAlamatDetil("");
    }
  }, [provinceId, kabKotaId, kecId, kelId]);

  const handleClickNext = () => {
    if (current === 0) {
      form
        .validateFields()
        .then(() => {
          setCurrent(current + 1);
        })

        .catch((err) => console.log(err));
    } else if (current === 1 && prov && kab && kec && kel && alamatDetil) {
      form
        .validateFields()
        .then(() => {
          setCurrent(current + 1);
        })
        .catch((err) => console.log(err));
    } else if (current === 2 && category && dataSumber) {
      form
        .validateFields()
        .then(() => {
          setCurrent(current + 1);
        })
        .catch((err) => console.log(err));
    }

    if (current === 1 && provinceId === undefined) {
      setErrorProv("   ❌ Pilih Provinsi terlebih dulu");
    } else if (
      (current === 1 && kabKotaId === undefined) ||
      provinceId?.toString() !== kabKotaId?.toString().slice(0, -2)
    ) {
      setErrorKab("   ❌ Pilih Kabupaten terlebih dulu");
    } else if (
      (current === 1 && kecId === undefined) ||
      kabKotaId?.toString() !== kecId?.toString().slice(0, -3)
    ) {
      setErrorKec("   ❌ Pilih Kecamatan terlebih dulu");
    } else if (
      (current === 1 && kelId === undefined) ||
      kecId?.toString() !== kelId?.toString().slice(0, -3)
    ) {
      setErrorKel("   ❌ Pilih Kelurahan terlebih dulu");
    } else if (current === 1 && !alamatDetil) {
      setErrorAlamat("   ❌ Isi alamat detil terlebih dulu");
    }
    if (current === 2 && dataSumber === undefined) {
      setErrorSumberData("   ❌ Pilih Sumber Data terlebih dulu");
    }
    if (current === 2 && category === undefined) {
      setErrorTypePajak("   ❌ Pilih Type Pajak terlebih dulu");
    } else {
      console.log("");
    }
  };
  const handleClickPrev = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current - 1);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setRegisDeviceAgent({
      ...regisDeviceAgent,
      [e.target.name]: e.target.value,
    });
  };
  const handleAlamat = (event) => {
    setAlamatDetil(event.target.value);
  };
  const handleChangeSelect = (value) => {
    setDataSumber(value);
  };
  const handleChangeTypePajak = (value) => {
    setCategory(value);
  };
  const handleIsActive = (checked, e) => {
    setSelectActive(checked);
  };
  const handleFinish = async (values) => {
    try {
      const decoded = jwtDecode(localStorage.token);
      const apiKey = decoded["api-key"];
      const response = await fetch("https://api.raspi-geek.com/v1/merchants", {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(regisDeviceAgent),
      });
      // const res = await response.json();
      success();
      history.push("/dashboard");
    } catch (err) {
      // console.log("error", err.message);
    }
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
      <Steps current={current} className="steps">
        <Step
          key={0}
          title={<span className="stepper-title">Data Usaha</span>}
        />
        <Step
          key={1}
          title={<span className="stepper-title">Alamat Usaha</span>}
        />
        <Step
          key={2}
          title={<span className="stepper-title">Kategori Usaha</span>}
        />
        <Step key={3} title={<span className="stepper-title">Selesai</span>} />
      </Steps>
      <div className="container-edit">
        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={{
            merchant_id: "",
            owner: "",
            nik: "",
            email: "",
            nama_usaha: "",
            kelurahan: "",
            alamat: "",
            kategori: "",
            data_source: "",
          }}
        >
          {current === 0 && (
            <div style={{ width: "90%" }}>
              <Form.Item
                style={{ margin: "40px" }}
                name="merchant_id"
                label="Device ID / Agent ID"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(
                      /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/
                    ),
                    message: "Hanya A - Z, 0 - 9, dan spesial karakter",
                  },
                ]}
              >
                <Input
                  name="merchant_id"
                  value={regisDeviceAgent.merchant_id}
                  onChange={handleChange}
                  placeholder="IMEI atau id dari POS APP"
                  className="merchant_id"
                />
              </Form.Item>
              <Form.Item
                style={{ margin: "40px" }}
                name="owner"
                label="Owner"
                rules={[
                  {
                    required: true,
                    message: "Nama owner dari usaha",
                  },
                ]}
              >
                <Input
                  name="owner"
                  value={regisDeviceAgent.owner}
                  onChange={handleChange}
                  placeholder="Nama Owner dari usaha"
                  className="owner"
                />
              </Form.Item>
              <Form.Item
                style={{ margin: "40px" }}
                name="nik"
                label="NIK / NPWP"
                rules={[
                  {
                    required: true,
                    message: "Nomor Induk Kependudukan",
                  },
                ]}
              >
                <Input
                  name="nik"
                  value={regisDeviceAgent.nik}
                  onChange={handleChange}
                  placeholder="Nomor Induk Kependudukan"
                  className="nik"
                />
              </Form.Item>
              <Form.Item
                style={{ margin: "40px" }}
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "Masukkan E-mail!",
                  },
                  {
                    required: true,
                    message: "someone@someplace.com",
                  },
                ]}
              >
                <Input
                  name="email"
                  value={regisDeviceAgent.email}
                  onChange={handleChange}
                  placeholder="someone@someplace.com"
                  className="email"
                />
              </Form.Item>
              <Form.Item
                style={{ margin: "40px" }}
                name="nama_usaha"
                label="Nama Usaha"
                rules={[
                  {
                    required: true,
                    message: "Brand dari usaha",
                  },
                ]}
              >
                <Input
                  name="nama_usaha"
                  value={regisDeviceAgent.nama_usaha}
                  onChange={handleChange}
                  placeholder="Brand dari usaha"
                  className="badan_usaha"
                />
              </Form.Item>
            </div>
          )}
          {current === 1 && (
            <div style={{ width: "90%", margin: "0 0 40px 0" }}>
              <DataProvinsi
                prov={prov}
                setProv={setProv}
                errorProv={errorProv}
                setErrorProv={setErrorProv}
                provinceId={provinceId}
                setProvinceId={setProvinceId}
              />
              {prov && (
                <DataKabupaten
                  kab={kab}
                  setKab={setKab}
                  errorKab={errorKab}
                  setErrorKab={setErrorKab}
                  provinceId={provinceId}
                  kabKotaId={kabKotaId}
                  setKabKotaId={setKabKotaId}
                />
              )}
              {kab && (
                <DataKecamatan
                  kel={kel}
                  setKel={setKel}
                  errorKec={errorKec}
                  setErrorKec={setErrorKec}
                  errorKel={errorKel}
                  setErrorKel={setErrorKel}
                  kecId={kecId}
                  setKecId={setKecId}
                  kelId={kelId}
                  setKelId={setKelId}
                  kec={kec}
                  setKec={setKec}
                  kabKotaId={kabKotaId}
                />
              )}
              {kel && (
                <div style={{ margin: "40px 0 40px 0" }}>
                  <h4
                    style={{
                      margin: "40px 0 20px 0",
                      color: "#53586D",
                      textAlign: "left",
                    }}
                  >
                    Alamat Detail
                  </h4>
                  <Input
                    name="alamat"
                    value={alamatDetil}
                    required
                    onChange={handleAlamat}
                    placeholder="Jalan, RT RW"
                    style={{ width: "100%" }}
                  />
                  {errorAlamat && (
                    <div
                      style={{
                        color: "red",
                        fontFamily: "NoirPro, sans-serif",
                      }}
                    >
                      {errorAlamat}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {current === 2 && (
            <div style={{ width: "90%" }}>
              <div style={{ margin: "40px 0" }}>
                <h4
                  style={{
                    margin: "0px 0 20px 0",
                    color: "#53586D",
                    textAlign: "left",
                  }}
                >
                  Type Pajak
                </h4>
                <Select
                  // defaultValue="lucy"
                  style={{ width: "100%" }}
                  name="category"
                  value={category}
                  onChange={handleChangeTypePajak}
                  rules={[
                    {
                      type: "array",
                      required: true,
                      message: "Pilih Type Pajak",
                    },
                  ]}
                >
                  <Option value="Hotel">Hotel</Option>
                  <Option value="Restoran">Restoran</Option>
                  <Option value="Parkir">Parkir</Option>
                </Select>
                {errorTypePajak && (
                  <div style={{ color: "red" }}>{errorTypePajak}</div>
                )}
              </div>
              <div style={{ margin: "40px 0" }}>
                <h4
                  style={{
                    margin: "0px 0 20px 0",
                    color: "#53586D",
                    textAlign: "left",
                  }}
                >
                  Sumber Data
                </h4>
                <Select
                  // defaultValue="lucy"
                  style={{ width: "100%" }}
                  name="dataSumber"
                  value={dataSumber}
                  onChange={handleChangeSelect}
                >
                  <Option value="Agent">Agent</Option>
                  <Option value="POS App">POS App</Option>
                  <Option value="PDC">PDC</Option>
                  <Option value="BDC">BDC</Option>
                  <Option value="SDC">SDC</Option>
                </Select>
                {errorSumberData && (
                  <div style={{ color: "red" }}>{errorSumberData}</div>
                )}
              </div>
              <div style={{ margin: "40px 0", textAlign: "left" }}>
                <h4
                  style={{
                    margin: "0px 0 20px 0",
                    color: "#53586D",
                    textAlign: "left",
                  }}
                >
                  Active
                </h4>
                <Switch
                  name="isactive"
                  defaultChecked={true}
                  checked={selectActive}
                  onChange={handleIsActive}
                />
              </div>
            </div>
          )}
          {current === 3 && (
            <div style={{ width: "90%" }}>
              <div style={{ margin: "40px 0" }}>
                <h3
                  style={{
                    margin: " 0 auto",
                    padding: "0",
                    textAlign: "center",
                    color: "#53586D",
                  }}
                >
                  Apakah Anda Yakin Data Sudah Benar?
                </h3>
              </div>
            </div>
          )}

          {current < 3 && (
            <div style={{ textAlign: "center" }}>
              <Button type="primary" onClick={handleClickNext}>
                Next step
              </Button>
            </div>
          )}
          {current === 3 && (
            <div style={{ textAlign: "center" }}>
              <Button type="primary" onClick={() => form.submit()}>
                Submit
              </Button>
            </div>
          )}
          {current < 4 && (
            <div style={{ textAlign: "center" }}>
              <Button onClick={handleClickPrev}>Previous step</Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
export { MyStepForm };
