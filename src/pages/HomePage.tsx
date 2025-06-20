import {
  Alert,
  Button,
  Carousel,
  ConfigProvider,
  Image,
  Input,
  Menu,
  Space,
  type MenuProps,
} from "antd";
import React, { useState } from "react";
import "./HomePage.css";
import * as AntdIcons from "@ant-design/icons";
import module from "../../public/json/home_module.json";
import label from "../../public/json/article_label.json";

const SoundOutlined = AntdIcons.SoundOutlined;
const SearchOutlined = AntdIcons.SearchOutlined;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "热门",
    key: "hot",
  },
  {
    label: "最新",
    key: "last",
  },
];

const HomePage: React.FC = () => {
  // 当前选中菜单项
  const [current, setCurrent] = useState("hot");
  // 菜单项点击事件
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              dotOffset: 25,
            },
            Alert: {
              colorSuccessBg: "#F6F9FB",
              colorSuccessBorder: "#F6F9FB",
              defaultPadding: "8px 0",
            },
            Button: {
              defaultBorderColor: "#fff",
              colorBgContainerDisabled: "#746CFB",
              colorTextDisabled: "white",
            },
            Menu: {
              activeBarHeight: 4,
              itemSelectedColor: "#1677ff",
              groupTitleFontSize: 18,
            },
          },
        }}
      >
        <div id="homePage">
          {/* 轮播图 */}
          <div className="top">
            <div className="left" style={{ width: "800px", height: "350px" }}>
              <Carousel
                autoplay={{ dotDuration: true }}
                autoplaySpeed={5000}
                effect="fade"
              >
                <div>
                  <div>
                    <Image
                      preview={false}
                      width={800}
                      height={350}
                      src="\images\image1.png"
                      style={{
                        display: "block",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <Image
                      preview={false}
                      width={800}
                      height={350}
                      src="\images\image2.png"
                      style={{
                        display: "block",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <Image
                      preview={false}
                      width={800}
                      height={350}
                      src="\images\image3.png"
                      style={{
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              </Carousel>
            </div>
            <div className="right">
              <div>
                <Image
                  preview={false}
                  src="\images\image1.png"
                  height={110}
                  style={{
                    display: "block",
                  }}
                />
              </div>
              <div>
                <Image
                  preview={false}
                  src="\images\image2.png"
                  height={110}
                  style={{
                    display: "block",
                  }}
                />
              </div>
              <div>
                <Image
                  preview={false}
                  src="\images\image3.png"
                  height={110}
                  style={{
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
          {/* 底部内容 */}
          <div className="bottom">
            {/* 小贴士 */}
            <div className="tips">
              <Alert
                message={
                  <>
                    <Space>
                      <Button
                        shape="round"
                        size="small"
                        color="purple"
                        variant="solid"
                        disabled
                      >
                        <SoundOutlined />
                        News
                      </Button>
                      <p>
                        开发者社区首页、文章模块改版啦！~欢迎您移步至「建议与反馈」专区提供宝贵建议~
                      </p>
                    </Space>
                  </>
                }
                type="success"
                closable
              />
            </div>
            {/* 文章与排行榜 */}
            <div className="content">
              <div className="left">
                {/* 标签栏 */}
                <div className="module">
                  {module.map((item) => {
                    // 动态获取图标组件
                    // @ts-expect-error: TypeScript 不允许使用字符串字面量（item.icon）直接索引 AntdIcons 对象，因为类型定义中没有声明字符串索引签名。
                    const IconComponent = AntdIcons[item.icon];

                    return (
                      <Button className="item" key={item.id}>
                        <IconComponent />
                        <p>{item.name}</p>
                      </Button>
                    );
                  })}
                </div>
                {/* 文章列表 */}
                <div className="article">
                  {/* 文章导航栏与搜索框 */}
                  <div className="articleNav">
                    <Menu
                      onClick={onClick}
                      selectedKeys={[current]}
                      mode="horizontal"
                      items={items}
                      style={{ fontSize: "18px" }}
                    />
                    <div className="searchBar">
                      <Input
                        className="input"
                        placeholder="搜索"
                        prefix={
                          <SearchOutlined
                            style={{
                              color: "#C7CBCF",
                              fontSize: "18px",
                              marginRight: "8px",
                            }}
                          />
                        }
                      />
                    </div>
                  </div>
                  {/* 文章标签 */}
                  <div className="articleLabel">
                    <Space wrap size={4}>
                      {label.map((item) => {
                        return (
                          <Button
                            key={item.id}
                            className="item"
                            color="primary"
                            variant="filled"
                            size="small"
                          >
                            {item.label}
                          </Button>
                        );
                      })}
                    </Space>
                  </div>
                </div>
              </div>
              {/* 排行榜 */}
              <div className="right"></div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default HomePage;
