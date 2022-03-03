import React, { useState } from "react";
import { Form, Button, Steps, Card } from "antd";
import { MyStepForm } from "./myStepForm";

const StepPanel = (props) => {
  // const [form] = Form.useForm();

  // const {activeStep, setActiveStep ,stepForm, current, setCurrent} =props
  // const [form] = Form.useForm();

  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const handleClickNext = () => {
    const formData = form.getFieldsValue();

    form
      .validateFields()
      .then(() => {
        // Here make api call of something else
        setCurrent(current + 1);
      })
      .catch((err) => console.log(err));
  };
  const handleClickPrev = () => {
    form
      .validateFields()
      .then(() => {
        // Here make api call of something else
        setCurrent(current - 1);
      })
      .catch((err) => console.log(err));
  };
  const handleFinish = (values) => {
    const formData = form.getFieldsValue();
    // const formData = form.formData();

    // POST the data to backend and show Notification
    //     try {
    //         let form = { formData };
    //         const token = localStorage.getItem('token')
    //         const headers = {
    //           'x-api-key':'45N0Ujae7p9AWDs3ihDiU4ZDnvAMb9ZK4TXH0kCk',
    //           'content-type': 'application/json',

    //           'Authorization': `Bearer ${token}`
    //         }
    //         const response = fetch(
    //           "https://api.raspi-geek.com/v1/merchants",

    //           { method: "POST",headers },
    //         //   body: JSON.stringify(form),

    //        );
    //         const res =  response.json();
    //             history.push("/dashboard");
    //     alert("success", res.status);
    // } catch (err) {
    //   alert("error", err.message);
    // }
  };
  return (
    <>
      <MyStepForm form={form} onFinish={handleFinish} current={current} setCurrent={setCurrent} />

      {current < 3 && (
        <div style={{ textAlign: "center" }}>
          <Button type="primary" onClick={handleClickNext}>Next step</Button>
        </div>
      )}
      {current === 3 && (
        <div style={{ textAlign: "center" }}>
          <Button type="primary"
            //  htmlType="submit"
            onClick={() => form.submit()}
          //   type="submit"
          >Submit</Button>
        </div>
      )}
      {current < 3 && (
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleClickPrev}>Previous step</Button>
        </div>
      )}
    </>
  );
};

export { StepPanel };
