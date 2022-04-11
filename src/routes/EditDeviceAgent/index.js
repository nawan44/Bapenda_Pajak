import React, { useState, useEffect } from "react";
import { Form, Input, Card,  Button, Select, message, Typography, Divider } from "antd";
import { useHistory } from "react-router-dom";
import DataProvinsi from "../RegisterDeviceAgent/dataProvinsi"
import DataKabupaten from "../RegisterDeviceAgent/dataKabupaten";
import DataKecamatan from "../RegisterDeviceAgent/dataKecamatan";
import "../../assets/styles/forRegistrasi.css"
import { Switch } from 'antd';
import jwtDecode from "jwt-decode";


const { Option } = Select;

function EditDeviceAgent(props) {
    const history = useHistory();
    const {  listData, itemList } = props
    const alamatTrim = itemList.alamat
    const pieces = alamatTrim.split(",")
    const provTrim = pieces[pieces.length - 1]
    const kabTrim = pieces[pieces.length - 2]
    const kecTrim = pieces[pieces.length - 3]
    const kelTrim = pieces[pieces.length - 4]
    const alamatDetTrim = pieces[pieces.length - 5]

    const [selectActive, setSelectActive] = useState(itemList.isactive === "true")
    const [dataSumber, setDataSumber] = useState(itemList.data_source)
    const [category, setCategory] = useState(itemList.type_pajak)
    const [form] = Form.useForm();

    const [provinceId, setProvinceId] = useState(null)
    const [searchProvinceId, setSearchtProvinceId] = useState(null)

    const [prov, setProv] = useState(provTrim)
    const [errorOwner, setErrorOwner] = useState(false);
    const [errorNik, setErrorNik] = useState(false);

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorValidEmail, setErrorValidEmail] = useState(false);

    const [errorUsaha, setErrorUsaha] = useState(false);

    const [errorProv, setErrorProv] = useState(false);
    const [errorKab, setErrorKab] = useState(false);
    const [errorKec, setErrorKec] = useState(false);
    const [errorKel, setErrorKel] = useState(false);
    const [errorAlamat, setErrorAlamat] = useState(false);
    const [errorSumberData, setErrorSumberData] = useState(false);
    const [errorTypePajak, setErrorTypePajak] = useState(false);
    const [kabKotaId, setKabKotaId] = useState(null)
    const [kab, setKab] = useState(kabTrim)
    const [searchKabKotaId, setSearchKabKotaId] = useState(null)

    const [kec, setKec] = useState(kecTrim)
    const [kecId, setKecId] = useState(null)
    const [searchKecId, setSearchKecId] = useState(null)

    const [kel, setKel] = useState(kelTrim)
    const [kelId, setKelId] = useState(null)
    const [searchKelId, setSearchKelId] = useState(null)

    const [alamatDetil, setAlamatDetil] = useState(alamatDetTrim)
    const [gantiAlamat, setGantiAlamat] = useState(alamatDetil)
    const [regisDeviceAgent, setRegisDeviceAgent] = useState(
        {
            // merchant_id: itemList ? itemList.device_id : null,
            owner: itemList ? itemList.owner : "",
            nik: itemList ? itemList.nik : "",
            email: itemList ? itemList.email : "",
            nama_usaha: itemList ? itemList.nama_usaha : "",
            alamat: "",
            kategori: category,
            data_source: dataSumber,
            tax_type: "PPH",
            isactive: selectActive,
        }
    );

    useEffect(
        () => {
            setGantiAlamat(
                alamatDetil);
        },
        [alamatDetil]
    );
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
    
    //
    useEffect(
        () => {
            setRegisDeviceAgent({
                ...regisDeviceAgent,
                alamat: gantiAlamat + ", " + kel + ", " + kec + ", " + kab + ", " + prov
            });
        },
        [gantiAlamat, kel, kec, kab, prov]
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
            if (dataSumber) {
                setErrorSumberData("");
            }
            if (category) {
                setErrorTypePajak("");
            }

        },
        [dataSumber, category]);
    const success = () => {
        message.success('Edit Data Berhasil');
    }
    const handleIsActive = (checked, e) => {
        setSelectActive(checked);

    }

    const validate = () => {
        if (regisDeviceAgent.owner === "") {
            setErrorOwner(
                "   ❌ Nama Tidak Boleh Kosong"
            );
        }
        else if (regisDeviceAgent.nik === "") {
            setErrorNik(
                "   ❌ Nik Tidak Boleh Kosong"
            );
        }
        else if (regisDeviceAgent.email === "") {
            setErrorEmail(
                "   ❌ Email Tidak Boleh Kosong"
            );
        }
        else if (regisDeviceAgent.nama_usaha === "") {
            setErrorUsaha(
                "   ❌ Brand Usaha Tidak Boleh Kosong"
            );
        }
        else if (prov === ""){
            setErrorProv(
                "   ❌ Provinsi Tidak Boleh Kosong"
            )
        }
        else if (kab === ""){
            setErrorKab(
                "   ❌ Kabupaten Tidak Boleh Kosong"
            )
        }
        else if (kec === ""){
            setErrorKec(
                "   ❌ Kecamatan Tidak Boleh Kosong"
            )
        }
        else if (kel === ""){
            setErrorKel(
                "   ❌ Kelurahan Tidak Boleh Kosong"
            )
        }
        else if (alamatDetil === "") {
            setErrorAlamat(
                "   ❌ Alamat Tidak Boleh Kosong"
            );
        }
        else {
            return false
        }
    }
    useEffect(
        () => {

            if (regisDeviceAgent.owner !== "") {
                setErrorOwner();
            }
            else if (regisDeviceAgent.nik !== "") {
                setErrorNik();
            }
            else if (regisDeviceAgent.email !== "") {
                setErrorEmail();
            }
            // else if ( regisDeviceAgent.email === /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ ) {
            //     setErrorValidEmail();
            // }
            else if (regisDeviceAgent.nama_usaha !== "") {
                setErrorUsaha();
            }
        },
        [regisDeviceAgent.owner], [regisDeviceAgent.nik], [regisDeviceAgent.email], [regisDeviceAgent.nama_usaha]);

    const cancel = () => {
        history.push("/device-all")
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
        const aa = validate()
        if (aa == false) {
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
                        },
                        body: JSON.stringify(regisDeviceAgent),
                    }
                );
                success();
                history.push("/dashboard")
            } catch (err) {
                // console.log("error", err.message);
            }
        }
    };


    return (
        <Card className="gx-card" >

            <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
                <Typography style={{ fontSize: "20px", fontWeight: "400", lineHeight: "24px", color: "#000" }}>Edit Data Device</Typography>
                <div className="container-edit">
                    <Form
                        form={form}
                        onFinish={handleFinish}
                        className="form-input"
                        initialValues={{
                            merchant_id: "", owner: "", nik: "", email: "", nama_usaha: "",
                            kelurahan: "", alamat: "", kategori: "", data_source: ""
                        }}
                    >
                        {/* <div style={{ width: "90%" }} > */}
                        <h4 style={{ margin: "20px 0 10px 0", color: "#53586D", textAlign: "left" }}>IMEI atau id dari POS APP</h4>
                        <Input
                            name="merchant_id"

                            disabled
                            value={itemList?.device_id || ""}
                            onChange={handleChange}
                            placeholder="IMEI atau id dari POS APP"
                            className="edit_input" />
                        <h4 style={{ margin: "20px 0 10px 0", color: "#53586D", textAlign: "left" }}>Nama Owner dari usaha</h4>
                        <Input
                            name="owner"
                            value={regisDeviceAgent.owner}
                            onChange={handleChange}
                            placeholder="Nama Owner dari usaha"
                            className="edit_input" />
                        {errorOwner && (
                            <div style={{ color: "red", fontFamily: "NoirPro, sans-serif" }}>{errorOwner}</div>
                        )}
                        <h4 style={{ margin: "30px 0 10px 0", color: "#53586D", textAlign: "left" }}>NIK / NPWP</h4>
                        <Input
                            name="nik"
                            value={regisDeviceAgent.nik}
                            onChange={handleChange}
                            placeholder="Nomor Induk Kependudukan"
                            className="edit_input"
                        />
                        {errorNik && (
                            <div style={{ color: "red", fontFamily: "NoirPro, sans-serif" }}>{errorNik}</div>
                        )}
                        <h4 style={{ margin: "30px 0 10px 0", color: "#53586D", textAlign: "left" }}>Email</h4>
                        <Input
                            name="email"
                            value={regisDeviceAgent.email}
                            onChange={handleChange}
                            placeholder="someone@someplace.com"
                            className="edit_input" />
                        {errorEmail && (
                            <div style={{ color: "red", fontFamily: "NoirPro, sans-serif" }}>{errorEmail}</div>
                        )}
                        {errorValidEmail && (
                            <div style={{ color: "red", fontFamily: "NoirPro, sans-serif" }}>{errorValidEmail}</div>
                        )}
                        <h4 style={{ margin: "30px 0 10px 0", color: "#53586D", textAlign: "left" }}>Brand dari usaha</h4>
                        <Input
                            name="nama_usaha"
                            value={regisDeviceAgent.nama_usaha}
                            onChange={handleChange}
                            placeholder="Brand dari usaha"
                            className="edit_input" />

                        {errorUsaha && (
                            <div style={{ color: "red", fontFamily: "NoirPro, sans-serif" }}>{errorUsaha}</div>)}
                        <h4 style={{ margin: "30px 0 10px 0", color: "#53586D", textAlign: "left" }}>Alamat</h4>
                        <Divider/>
                        <DataProvinsi listData={listData} itemList={itemList} searchProvinceId={searchProvinceId} setSearchtProvinceId={setSearchtProvinceId} provTrim={provTrim} prov={prov} setProv={setProv} errorProv={errorProv} setErrorProv={setErrorProv} provinceId={provinceId} setProvinceId={setProvinceId} />
                        <DataKabupaten itemList={itemList} listData={listData} searchProvinceId={searchProvinceId} kab={kab} setKab={setKab} errorKab={errorKab} setErrorKab={setErrorKab} provinceId={provinceId} kabKotaId={kabKotaId} setKabKotaId={setKabKotaId} searchKabKotaId={searchKabKotaId} setSearchKabKotaId={setSearchKabKotaId} />
                        <DataKecamatan itemList={itemList} listData={listData} kel={kel} setKel={setKel} errorKec={errorKec} setErrorKec={setErrorKec} errorKel={errorKel} setErrorKel={setErrorKel} kecId={kecId} setKecId={setKecId} kelId={kelId} setKelId={setKelId} kec={kec} setKec={setKec} kabKotaId={kabKotaId} searchKabKotaId={searchKabKotaId} setSearchKabKotaId={setSearchKabKotaId} searchKecId={searchKecId} setSearchKecId={setSearchKecId} searchKelId={searchKelId} setSearchKelId={setSearchKelId} />

                        <h4 style={{ margin: "30px 0 10px 0", color: "#53586D", textAlign: "left" }}>Alamat Detil</h4>

                        <Input
                            name="alamat"
                            style={{ width: "100%" }}
                            value={alamatDetil}
                            onChange={handleAlamat}
                            placeholder="Jalan, RT RW" />
                        {errorAlamat && (
                            <div style={{ color: "red", fontFamily: "NoirPro, sans-serif" }}>{errorAlamat}</div>
                        )}
                        {/* <div style={{ width: "90%" }} > */}
                        <h4 style={{ margin: "30px 0 0 0", color: "#53586D", textAlign: "left" }}>Type Pajak</h4>
                        <Select
                            // defaultValue="lucy" 
                            style={{ margin: "10px 0 0 0",width: "100%"  }}
                            name="category"
                            value={category}
                            onChange={handleChangeTypePajak}
                            rules={[
                                { type: 'array', required: true, message: 'Pilih Type Pajak' },
                            ]}
                             >
                            <Option value="Hotel">Hotel</Option>
                            <Option value="Restoran">Restoran</Option>
                            <Option value="Parkir">Parkir</Option>

                        </Select>
                        {errorTypePajak && (
                            <div style={{ color: "red" }}>{errorTypePajak}</div>
                        )}
                        {/* </div> */}
                        <div style={{ margin: "40px 0" }} >
                            <h4 style={{ margin: "30px 0 0 0", color: "#53586D", textAlign: "left" }}>Sumber Data</h4>
                            <Select
                                // defaultValue="lucy" 
                                style={{ margin: "10px 0 0 0" ,width: "100%" }}
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
                            <div style={{ textAlign: "left" }}>
                                <h4 style={{ margin: "30px 0 10px 0", color: "#53586D", textAlign: "left" }}>Active</h4>
                                <Switch
                                    name="isactive"
                                    style={{ textAlign: "left" }}
                                    checked={selectActive}
                                    onChange={handleIsActive}
                                /></div>
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
        </Card>
    );
}
export default EditDeviceAgent;