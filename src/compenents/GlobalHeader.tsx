import { Col, ConfigProvider, Input, Row } from "antd";
import React, { useState } from "react";
import "./GlobalHeader.css";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "文章",
    key: "article",
  },
  {
    label: "问答",
    key: "q&a",
  },
  {
    label: "课堂",
    key: "course",
  },
  {
    label: "活动",
    key: "activity",
  },
  {
    label: "文档",
    key: "document",
  },
];

const GlobalHeader: React.FC = () => {
  const [current, setCurrent] = useState("article");

  // 顶部导航栏点击函数
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              activeBorderColor: "#1A1A1A",
              hoverBorderColor: "#1A1A1A",
              activeShadow: "none",
              inputFontSize: 16,
            },
          },
        }}
      >
        <div id="globalHeader">
          <Row wrap={false}>
            <Col flex="180px" className="logo">
              <a href="#" target="_blank">
                <img
                  src="src\assets\react.svg"
                  alt="logo"
                  style={{ height: "40px", width: "40px" }}
                />
                <h1>TECH-COMMUNITY</h1>
              </a>
            </Col>
            <Col flex="auto" className="navbar">
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0)",
                }}
              />
            </Col>
            <Col flex="200px" className="searchBar">
              <Input
                className="input"
                placeholder="搜索内容"
                prefix={
                  <SearchOutlined
                    style={{ color: "#C7CBCF", fontSize: "18px", marginRight: "8px" }}
                  />
                }
                style={{
                  height: "40px",
                  backgroundColor: "#1A1A1A",
                  borderColor: "#1A1A1A",
                  color: "#fff",
                }}
              />
            </Col>
            <Col flex="200px" className="button">
              buttun
            </Col>
            <Col flex="50px" className="user">
              user
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </>
  );
};

export default GlobalHeader;
