import React, { useState, useEffect } from "react";
import SetUser from "./setUser";
import { Table, Button, Divider, Popover, Space, Input } from "antd";
import { remove } from "lodash";
import { filter, includes } from "lodash";
import "./index.css";

const { Search } = Input;

const List = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>("add");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowId, setNowId] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const onEdit = (id) => {
    setType("edit");
    setVisible(true);
    setNowId(id);
  };
  const onDel = (id) => {
    const data = JSON.parse(JSON.stringify(dataSource));
    remove(data, (val) => val.id === id);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDataSource(data);
      localStorage.setItem("mockData", JSON.stringify(data));
      setOpen(false);
    }, 600);
  };
  const columns = [
    {
      title: "姓名",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "性别",
      key: "gender",
      dataIndex: "gender",
      render: (value) => (value === "man" ? "男" : "女"),
    },
    {
      title: "年龄",
      key: "age",
      dataIndex: "age",
    },
    {
      title: "手机号",
      key: "phone",
      dataIndex: "phone",
      render: (value) => value || "--",
    },
    {
      title: "邮箱",
      key: "email",
      dataIndex: "email",
      render: (value) => value || "--",
    },
    {
      title: "操作",
      dataIndex: "id",
      render: (value) => {
        return (
          <>
            <Button type="link" onClick={() => onEdit(value)}>
              编辑
            </Button>
            <Divider type="vertical" />
            <Popover
              title="确认删除该条数据吗？"
              trigger="click"
              open={open}
              content={
                <Space>
                  <Button onClick={() => setOpen(false)}>取消</Button>
                  <Button type="primary" onClick={() => onDel(value)}>
                    确认
                  </Button>
                </Space>
              }
            >
              <Button type="link" onClick={() => setOpen(true)}>
                删除
              </Button>
            </Popover>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (!visible) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const mockData = localStorage.getItem("mockData")
          ? JSON.parse(localStorage.getItem("mockData"))
          : [];
        setDataSource(mockData);
      }, 600);
    }
  }, [visible]);

  const onSearch = (value) => {
    if (value) {
      const searchArr = filter(dataSource, (item) =>
        includes(item.name, value)
      );
      setDataSource(searchArr);
    } else {
      const mockData = localStorage.getItem("mockData")
        ? JSON.parse(localStorage.getItem("mockData"))
        : [];
      setDataSource(mockData);
    }
  };

  return (
    <>
      <SetUser
        visible={visible}
        type={type}
        setVisible={setVisible}
        nowId={nowId}
      />
      <Space className="UserTable">
        <Button
          type="primary"
          onClick={() => {
            setType("add");
            setVisible(true);
          }}
        >
          新增用户
        </Button>
        <Search
          placeholder="输入关键字进行检索"
          enterButton
          onSearch={onSearch}
        />
      </Space>

      <Table columns={columns} dataSource={dataSource} loading={loading} />
    </>
  );
};

export default List;
