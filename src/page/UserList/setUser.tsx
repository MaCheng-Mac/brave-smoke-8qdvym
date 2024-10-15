import React, { useEffect } from "react";
import {
  Drawer,
  Form,
  Button,
  Row,
  Col,
  Input,
  Radio,
  InputNumber,
  Space,
} from "antd";
import { find, findIndex } from "lodash";

const RadioGroup = Radio.Group;

/* 新增和编辑通用一个模块 */
interface Iprops {
  type: string;
  visible: boolean;
  setVisible: () => void;
  setNeedRefresh: () => void;
  nowId: number;
}

const SetUser = (props: Iprops) => {
  const { type = "add", visible, setVisible, nowId } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && type === "edit") {
      // 此处模拟编辑前通过id查询单个数据（可能是复杂数据）
      const mockData = localStorage.getItem("mockData")
        ? JSON.parse(localStorage.getItem("mockData"))
        : [];
      const findItem = find(mockData, (value) => value.id === nowId);
      if (findItem) {
        form.setFieldsValue(findItem);
      }
    }
  }, [type, visible]);

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const onSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        // 正常情况此时表单校验通过需调用后端接口传递数据，这里使用localStorage暂存
        const mockData = localStorage.getItem("mockData")
          ? JSON.parse(localStorage.getItem("mockData"))
          : [];
        if (type === "add") {
          mockData.push({
            id: mockData?.length ? mockData[mockData?.length - 1].id + 1 : 1,
            ...value,
          });
        } else {
          const index = findIndex(mockData, (value) => value.id === nowId);
          mockData[index] = {
            id: mockData[index].id,
            ...value,
          };
        }
        localStorage.setItem("mockData", JSON.stringify(mockData));
        onCancel();
      })
      .catch((error) => console.log(error));
  };
  return (
    <Drawer
      open={visible}
      closeIcon={false}
      width={680}
      title={`${type === "add" ? "新增" : "编辑"}用户`}
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={onSubmit}>
            提交
          </Button>
        </Space>
      }
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        name="setUser"
        autoComplete="off"
        form={form}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="姓名"
              name="name"
              rules={[
                { required: true, message: "请输入姓名", whitespace: true },
              ]}
            >
              <Input trim />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="性别"
              name="gender"
              rules={[{ required: true, message: "请选择性别" }]}
              initialValue="man"
            >
              <RadioGroup>
                <Radio value="man">男</Radio>
                <Radio value="woman">女</Radio>
              </RadioGroup>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="年龄"
              name="age"
              rules={[{ required: true, message: "请输入年龄" }]}
            >
              <InputNumber min={0} max={300} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                {
                  pattern:
                    /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/,
                  message: "请输入正确的11位手机号",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ type: "email", message: "请输入正确的邮箱地址" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default SetUser;
