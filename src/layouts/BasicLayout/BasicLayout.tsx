import React from "react";
import "./BasicLayout.css";
import { Layout } from "antd";
import GlobalHeader from "../../compenents/GlobalHeader";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#000",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
};

const contentStyle: React.CSSProperties = {
  marginTop: 60,
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#000",
};

const layoutStyle = {
  minHeight: "100vh",
};

const BasicLayout: React.FC = () => {
  return (
    <>
      <div id="basicLayout">
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <GlobalHeader />
          </Header>
          <Content style={contentStyle}>
            {/* 子路由组件将在这里渲染 */}
            <Outlet />
          </Content>
        </Layout>
      </div>
    </>
  );
};

export default BasicLayout;
