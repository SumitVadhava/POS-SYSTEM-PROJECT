import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from './../utils/Fresh Mart logo.png';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import "./../Styles/DefaultLayout.css";

const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const Nevigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems } = useSelector((state) => state.rootReducer);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>

      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logocontent">
          <div className={collapsed ? 'collapsedLogo' : 'logo'}>
            <img src={logo} alt="freshmartlogo" onClick={() => Nevigate('/home')} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div>
          <h1 className="text-center text-light font-weight-bold" id="postext">POS</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />} onClick={() => Nevigate('/home')}>
            {!collapsed && <Link to="/home">Home</Link>}
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />} onClick={() => Nevigate('/bills')}>
            {!collapsed && <Link to="/bills">Bills</Link>}
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />} onClick={() => Nevigate('/items')}>
            {!collapsed && <Link to="/items">Items</Link>}
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />} onClick={() => Nevigate('/customers')}>
            {!collapsed && <Link to="/customers">Customers</Link>}
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={() => Nevigate('/')}>
            {!collapsed && "Logout"}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <h1 style={{ fontFamily: "Montserrat", marginLeft: collapsed ? "570px" : "480px", fontSize: "30px", fontWeight: "bold" }}>
              Products
            </h1>
            <div
              className="cart-item d-flex jusitfy-content-space-between flex-row"
              style={{ marginLeft: collapsed ? "500px" : "470px" }}>
              <div>
                <p style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>{cartItems.length}</p>
              </div>
              <ShoppingCartOutlined onClick={() => Nevigate('/cart')} />
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;