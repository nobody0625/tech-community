import React from "react";
import "./BasicLayout.css";
import { Layout } from "antd";
import GlobalHeader from "../../components/GlobalHeader";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  backgroundColor: "#000",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
};

const contentStyle: React.CSSProperties = {
  marginTop: 60,
  backgroundColor: "#000",
};

const BasicLayout: React.FC = () => {
  return (
    <>
      <div id="basicLayout">
        <Layout>
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
