import {
  AutoComplete,
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Input,
  Row,
  Space,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "./GlobalHeader.css";
import type { AutoCompleteProps, MenuProps } from "antd";
import { Menu } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dataBase from "../../public/json/search_database.json";
import debounce from "lodash.debounce";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "文章",
    key: "article",
  },
  {
    label: "问答",
    key: "qa",
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
  const [current, setCurrent] = useState("");
  const navigate = useNavigate(); // 获取跳转函数

  // 顶部导航栏点击函数
  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
    // 根据点击的菜单项跳转到对应的页面
    navigate(`/${e.key}`);
  };

  // 模糊搜索与防抖的代码实现依赖AI

  // 搜索框输入内容
  const [searchValue, setSearchValue] = useState("");

  // 模糊搜索选项
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

  // 模糊搜索函数
  const performSearch = (query: string) => {
    if (query) {
      // 简单的模糊匹配算法
      const filteredOptions = dataBase
        .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
        .map((item) => ({ value: item, label: item }));

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  // 使用 useCallback 包装，防止每次渲染创建新函数
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      performSearch(query);
    }, 500),
    [] // 空依赖数组保证函数稳定
  );

  // 清理防抖函数
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []); // 空依赖数组，只在组件挂载和卸载时执行

  // 处理输入变化
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  // 处理选择结果
  const handleSelect = (value: string) => {
    setSearchValue(value);
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
            Button: {
              defaultBg: "#000",
              defaultColor: "#fff",
              defaultHoverBg: "#000",
              defaultHoverColor: "#fff",
              defaultHoverBorderColor: "#fff",
              defaultActiveBg: "#000",
              defaultActiveBorderColor: "#fff",
              defaultActiveColor: "#fff",
            },
          },
        }}
      >
        <div id="globalHeader">
          <Row wrap={false}>
            {/* logo */}
            <Col flex="180px" className="logo">
              <a href="http://localhost:5173/">
                <img
                  src="src\assets\react.svg"
                  alt="logo"
                  style={{ height: "40px", width: "40px" }}
                />
                <h1>TECH-COMMUNITY</h1>
              </a>
            </Col>
            {/* 顶部导航栏 */}
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
            {/* 搜索 */}
            <Col flex="200px" className="searchBar">
              <AutoComplete
                value={searchValue}
                options={options}
                onSelect={handleSelect}
                onSearch={handleSearchChange}
                style={{ height: "40px" }}
              >
                <Input
                  className="input"
                  placeholder="搜索内容"
                  prefix={
                    <SearchOutlined
                      style={{
                        color: "#C7CBCF",
                        fontSize: "18px",
                        marginRight: "8px",
                      }}
                    />
                  }
                  style={{
                    height: "40px",
                    backgroundColor: "#1A1A1A",
                    borderColor: "#1A1A1A",
                    color: "#fff",
                    borderRadius: 0,
                  }}
                />
              </AutoComplete>
            </Col>
            {/* 按钮 */}
            <Col flex="200px" className="button">
              <Space size="middle">
                <Button
                  color="default"
                  variant="outlined"
                  size="large"
                  style={{ borderRadius: 0 }}
                >
                  发布
                </Button>
                <Button type="primary" size="large" style={{ borderRadius: 0 }}>
                  向 AI 提 问
                </Button>
              </Space>
            </Col>
            {/* 用户中心 */}
            <Col flex="50px" className="user">
              <Avatar size="large" icon={<UserOutlined />} />
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </>
  );
};

export default GlobalHeader;
