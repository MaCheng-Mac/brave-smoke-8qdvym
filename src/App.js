import "./styles.css";
import List from "./page/UserList/list";
import { Layout, Menu, Breadcrumb } from "antd";
import { map } from "lodash";

const { Header, Content } = Layout;

export default function App() {
  const items = [{ key: "userList", label: "用户列表" }];
  const BreadcrumbList = [
    { key: "homepage", label: "首页" },
    { key: "userList", label: "用户列表" },
  ];
  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["userList"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {map(BreadcrumbList || [], (item) => (
            <Breadcrumb.Item key={item?.key || ""}>
              {item?.label || ""}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <div
          style={{
            background: "#fff",
            minHeight: 200,
            padding: 24,
            marginBottom: 22,
            borderRadius: 4,
          }}
        >
          <List />
        </div>
      </Content>
    </Layout>
  );
}
