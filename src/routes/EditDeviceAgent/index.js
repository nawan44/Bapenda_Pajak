import React, { useState, useEffect } from "react";
import { Form, Input, Card, Steps, Button, Select, message } from "antd";
import { useHistory } from "react-router-dom";
// import { StepPanel } from "./stepPanel";
// import { options } from "less";
import DataProvinsi from "../RegisterDeviceAgent/dataProvinsi"
import DataKabupaten from "../RegisterDeviceAgent/dataKabupaten";
import DataKecamatan from "../RegisterDeviceAgent/dataKecamatan";
import "../../assets/styles/forRegistrasi.css"
import { Switch } from 'antd';
import jwtDecode from "jwt-decode";


const { Option } = Select;

const { Step } = Steps;


function EditDeviceAgent(props) {
    const history = useHistory();
    const { selectedRecord, setSelectedRecord, listData, setListData, aksiList, itemList } = props
    const [selectActive, setSelectActive] = useState(itemList.isactive === "true")
    const [dataSumber, setDataSumber] = useState(itemList.data_source)
    const [category, setCategory] = useState(itemList.type_pajak)
    const [form] = Form.useForm();
    const [provinceId, setProvinceId] = useState(null)
    const [prov, setProv] = useState("")
    const [statis, setStatis] = useState({
        provinsi: "provinsi",
        kabKota: "Kabupaten"
    })
    const [errorProv, setErrorProv] = useState(false);
    const [errorKab, setErrorKab] = useState(false);
    const [errorKec, setErrorKec] = useState(false);
    const [errorKel, setErrorKel] = useState(false);
    const [errorAlamat, setErrorAlamat] = useState(false);
    const [errorSumberData, setErrorSumberData] = useState(false);
    const [errorTypePajak, setErrorTypePajak] = useState(false);
    // const [active, setActive] = useState(false);

    const [current, setCurrent] = useState(0);

    const [kabKotaId, setKabKotaId] = useState(null)
    const [kab, setKab] = useState("")

    const [kec, setKec] = useState("")
    const [kecId, setKecId] = useState(null)

    const [kel, setKel] = useState("")
    const [kelId, setKelId] = useState(null)

    // console.log("selectedRecord EDIT >>>>", itemList)
    console.log("selectActive >>>>", selectActive)

    const [alamatDetil, setAlamatDetil] = useState("")
    const [alamatLengkap, setAlamatLengkap] = useState("")

    const [regisDeviceAgent, setRegisDeviceAgent] = useState(
        {
            // merchant_id: itemList ? itemList.device_id : null,
            owner: itemList ? itemList.owner : "",
            nik: itemList ? itemList.nik : "",
            email: itemList ? itemList.email : "",
            nama_usaha: itemList ? itemList.nama_usaha : "",
            alamat: itemList ? itemList.alamat : "",
            kategori: category,
            data_source: dataSumber,
            tax_type: "PPH",
            isactive: selectActive,
        }
    );
    //"jalan 001 Huta Pungkut Julu Kotanopan Kabupaten Mandailing Natal Sumatera Utara"
    console.log("regisDeviceAgent", regisDeviceAgent)
    useEffect(
        () => {
            setRegisDeviceAgent({
                ...regisDeviceAgent,
                alamat: alamatDetil + "Kelurahan" + kel + " Kecamatan " + kec + " Kabupaten " + kab + " Provinsi " + prov
            });
        },
        [alamatDetil], [prov]
    );
    useEffect(
        () => {
            setRegisDeviceAgent({
                ...regisDeviceAgent,
                isactive: selectActive
            });
        },
        [selectActive]
    );
    useEffect(
        () => {
            setRegisDeviceAgent({
                ...regisDeviceAgent,
                kategori: category
            });
        },
        [category]
    );
    useEffect(
        () => {
            setRegisDeviceAgent({
                ...regisDeviceAgent,
                data_source: dataSumber
            });
        },
        [dataSumber]
    );

    useEffect(
        () => {
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
        },
        [provinceId, kabKotaId, kecId, kelId]
    );
    useEffect(
        () => {
            if (alamatDetil) {
                setErrorAlamat("");
            }
        },
        [alamatDetil]);
    useEffect(
        () => {
            if (dataSumber) {
                setErrorSumberData("");
            }
            if (category) {
                setErrorTypePajak("");
            }

        },
        [dataSumber, category]);
    const success = () => {
        message.success('Pendaftaran Berhasil');
    };

    const handleIsActive = (checked, e) => {
        // setRegisDeviceAgent({ ...regisDeviceAgent, isactive: checked })
        setSelectActive(checked);
        // setRegisDeviceAgent({ ...regisDeviceAgent, isactive : e.target.checked})
        // console.log(`switch to ${checked}`);
    }
    const handleClickNext = () => {
        if (current === 0) {
            form.validateFields()
                .then(() => {
                    setCurrent(current + 1);
                })

                .catch((err) => console.log(err));
        }
        else if (current === 1 && prov && kab && kec && kel && alamatDetil) {
            form
                .validateFields()
                .then(() => {
                    setCurrent(current + 1);
                })
                .catch((err) => console.log(err));
        }
        else if (current === 2 && category && dataSumber) {
            form
                .validateFields()
                .then(() => {
                    setCurrent(current + 1);
                })
                .catch((err) => console.log(err));
        }

        if (current === 1 && provinceId === undefined) {
            setErrorProv(
                "   ❌ Pilih Provinsi terlebih dulu"
            );
        } else if (current === 1 && kabKotaId === undefined) {
            setErrorKab(
                "   ❌ Pilih Kabupaten terlebih dulu"
            );
        }
        else if (current === 1 && kecId === undefined) {
            setErrorKec(
                "   ❌ Pilih Kecamatan terlebih dulu"
            );
        } else if (current === 1 && kelId === undefined) {
            setErrorKel(
                "   ❌ Pilih Kelurahan terlebih dulu"
            );
        }
        else if (current === 1 && !alamatDetil) {
            setErrorAlamat(
                "   ❌ Isi alamat detil terlebih dulu"
            );
        }
        if (current === 2 && dataSumber === undefined) {
            setErrorSumberData(
                "   ❌ Pilih Sumber Data terlebih dulu"
            );
        }
        if (current === 2 && category === undefined) {
            setErrorTypePajak(
                "   ❌ Pilih Type Pajak terlebih dulu"
            );
        } else {
            console.log("");
        }
    };
    const cancel = () => {
        history.push("/list-device-agent")
    };
    const handleChange = (e) => {
        setRegisDeviceAgent({ ...regisDeviceAgent, [e.target.name]: e.target.value });
    };
    const handleAlamat = (event) => {
        setAlamatDetil(event.target.value)
    }
    const handleChangeSelect = (value) => {
        setDataSumber(value);
    };
    const handleChangeTypePajak = (value) => {
        setCategory(value);
    };
    const handleFinish = async (values) => {
        try {
            const decoded = jwtDecode(localStorage.token)
            const apiKey = decoded["api-key"]
            const response = await fetch(
                `https://api.raspi-geek.com/v1/merchants/${itemList.device_id}`,
                {
                    method: "PATCH",
                    headers: {
                        'x-api-key': `${apiKey}`,
                        'content-type': 'application/json',
                        // 'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(regisDeviceAgent),
                }
            );
            // const res = await response.json();
            success();
            history.push("/dashboard")
        } catch (err) {
            // console.log("error", err.message);
        }
    };


    return (
        <div style={{ width: "100%", margin: "40px auto" }}>

            <div style={{ margin: "100px 10px" }}>
                <Form
                    form={form}
                    onFinish={handleFinish}
                    initialValues={{
                        merchant_id: "", owner: "", nik: "", email: "", nama_usaha: "",
                        kelurahan: "", alamat: "", kategori: "", data_source: ""
                    }}
                >
                    {/* <div style={{ width: "90%" }} > */}
                    <h4 style={{ margin: "20px 0 10px 0", color: "#53586D" }}>IMEI atau id dari POS APP</h4>
                    <Input
                        name="merchant_id"
                        style={{ width: "100%" }}
                        disabled
                        value={itemList?.merchant_id || regisDeviceAgent.merchant_id}
                        onChange={handleChange}
                        placeholder="IMEI atau id dari POS APP" />
                    <h4 style={{ margin: "20px 0 10px 0", color: "#53586D" }}>Nama Owner dari usaha</h4>
                    <Input
                        name="owner"
                        style={{ width: "100%" }}
                        value={regisDeviceAgent.owner}
                        onChange={handleChange}
                        placeholder="Nama Owner dari usaha" />
                    <h4 style={{ margin: "30px 0 10px 0", color: "#53586D" }}>Nomor Induk Kepegawaian</h4>
                    <Input
                        name="nik"
                        style={{ width: "100%" }}
                        value={regisDeviceAgent.nik}
                        onChange={handleChange}
                        placeholder="Nomor Induk Kepegawaian" />
                    <h4 style={{ margin: "30px 0 10px 0", color: "#53586D" }}>Email</h4>
                    <Input
                        name="email"
                        style={{ width: "100%" }}
                        value={regisDeviceAgent.email}
                        onChange={handleChange}
                        placeholder="someone@someplace.com" />
                    <h4 style={{ margin: "30px 0 10px 0", color: "#53586D" }}>Brand dari usaha</h4>
                    <Input
                        name="nama_usaha"
                        style={{ width: "100%" }}
                        value={regisDeviceAgent.nama_usaha}
                        onChange={handleChange}
                        placeholder="Brand dari usaha" />
                    {/* </div> */}
                    <h4 style={{ margin: "30px 0 10px 0", color: "#53586D" }}>Alamat</h4>
                    <Input
                        name="alamat"
                        style={{ width: "100%" }}
                        value={regisDeviceAgent.alamat}
                        onChange={handleChange}
                        placeholder="Brand dari usaha" />
                    {/* <div style={{ width: "90%" }} > */}
                    <h4 style={{ margin: "30px 0 10px 0", color: "#53586D" }}>Type Pajak</h4>
                    <Select
                        // defaultValue="lucy" 
                        style={{ margin: "40px 0 0 0" }}
                        name="category"
                        value={category}
                        onChange={handleChangeTypePajak}
                        rules={[
                            { type: 'array', required: true, message: 'Pilih Type Pajak' },
                        ]}
                        style={{ width: "100%" }} >
                        <Option value="Hotel">Hotel</Option>
                        <Option value="Restoran">Restoran</Option>
                        <Option value="Parkir">Parkir</Option>

                    </Select>
                    {errorTypePajak && (
                        <div style={{ color: "red" }}>{errorTypePajak}</div>
                    )}
                    {/* </div> */}
                    <div style={{ margin: "40px 0" }} >
                        <h4 style={{ margin: "30px 0 10px 0", color: "#53586D" }}>Sumber Data</h4>
                        <Select
                            // defaultValue="lucy" 
                            style={{ margin: "40px 0 0 0" }}
                            name="dataSumber"
                            value={dataSumber}
                            onChange={handleChangeSelect}
                            style={{ width: "100%" }} >
                            <Option value="Agent">Agent</Option>
                            <Option value="POS App">POS App</Option>
                            <Option value="PDC">PDC</Option>
                            <Option value="BDC">BDC</Option>
                            <Option value="SDC">SDC</Option>

                        </Select>
                        {errorSumberData && (
                            <div style={{ color: "red" }}>{errorSumberData}</div>
                        )}
                        <h4 style={{ margin: "30px 0 10px 0", color: "#53586D" }}>Active</h4>
                        <Switch
                            name="isactive"
                            // defaultChecked={true}

                            checked={selectActive}
                            onChange={handleIsActive}
                        // defaultChecked={e}
                        // onChange={handleIsActive} 

                        />
                    </div>



                    <div style={{ textAlign: "center" }}>
                        <Button type="primary"
                            onClick={() => form.submit()}
                        >Submit</Button>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <Button onClick={cancel}>Cancel</Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}
export default EditDeviceAgent;