import React from "react";
import "./BasicLayout.css";
import { Layout } from "antd";
import GlobalHeader from "../../compenents/GlobalHeader";

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#000",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
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
          <Content style={contentStyle}>Content</Content>
        </Layout>
      </div>
    </>
  );
};

export default BasicLayout;
