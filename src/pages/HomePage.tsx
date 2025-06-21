import {
  Alert,
  Avatar,
  Button,
  Card,
  Carousel,
  ConfigProvider,
  Divider,
  Image,
  Input,
  Menu,
  Space,
  Tabs,
  Typography,
  type MenuProps,
  type TabsProps,
} from "antd";
import React, { useState } from "react";
import "./HomePage.css";
import * as AntdIcons from "@ant-design/icons";
import carousel from "../../public/json/carousel.json";
import module from "../../public/json/home_module.json";
import label from "../../public/json/article_label.json";
import hot from "../../public/json/hot_article.json";
import last from "../../public/json/last_article.json";
import user1 from "../../public/json/ranking_list1.json";
import user2 from "../../public/json/ranking_list2.json";
import user3 from "../../public/json/ranking_list3.json";
import user4 from "../../public/json/ranking_list4.json";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

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

const rankList1Items: TabsProps["items"] = [
  {
    key: "1",
    label: "博主榜",
  },
  {
    key: "2",
    label: "答主榜",
  },
  {
    key: "3",
    label: "讲师榜",
  },
  {
    key: "4",
    label: "全能榜",
  },
];

const rankList2Items: TabsProps["items"] = [
  {
    key: "1",
    label: "本月",
  },
  {
    key: "2",
    label: "季度",
  },
  {
    key: "3",
    label: "年度",
  },
  {
    key: "4",
    label: "总榜",
  },
];

// 文章数据源映射
const ArticleDataMap = {
  hot: hot,
  last: last,
};

// 用户数据源映射
const UserDataMap = {
  "1": user1,
  "2": user2,
  "3": user3,
  "4": user4,
};

const HomePage: React.FC = () => {
  // 文章导航栏当前选中菜单项
  const [current, setCurrent] = useState("hot");

  // 菜单项文章数据
  const currentArticlrData =
    ArticleDataMap[current as keyof typeof ArticleDataMap];

  // 文章导航栏菜单项点击事件
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const navigate = useNavigate();

  // 文章卡片点击事件
  const handleClick = (articleId: number) => {
    navigate(`/article/${articleId}`); // 带参数跳转
  };

  // 排行榜标签栏当前选中项
  const [activeTabKey, setActiveTabKey] = useState("1");

  // 标签项用户数据
  const user = UserDataMap[activeTabKey as keyof typeof UserDataMap];

  const onChange = (key: string) => {
    setActiveTabKey(key);
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
            Card: {
              bodyPadding: 0,
            },
            Tabs: {
              lineWidth: 0,
              margin: 0,
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
                {carousel.map((item) => {
                  return (
                    <div key={item.id} className="carouselItem">
                      <div>
                        <Image
                          preview={false}
                          width={800}
                          height={350}
                          src={item.img}
                          style={{
                            display: "block",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="right">
              {carousel.map((item) => {
                return (
                  <div key={item.id}>
                    <Image
                      preview={false}
                      src={item.img}
                      height={110}
                      style={{
                        display: "block",
                      }}
                    />
                  </div>
                );
              })}
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
                  {/* 文章 */}
                  {currentArticlrData.map((item) => {
                    return (
                      <Card
                        key={item.id}
                        className="articleCard"
                        style={{ padding: "16px", borderRadius: 0 }}
                        onClick={() => handleClick(item.articleId)}
                      >
                        <Space align="start" size="large">
                          <Image width={150} src={item.img} preview={false} />
                          <div className="articleMessage">
                            <Text
                              className="title"
                              style={{
                                width: 200,
                                fontSize: "22px",
                                fontWeight: "bold",
                              }}
                              ellipsis={{ tooltip: item.title }}
                            >
                              {item.title}
                            </Text>
                            {/* <h1>1</h1> */}
                            <p>{item.desciption}</p>
                            <div className="articleFooter">
                              <Space
                                split={
                                  <Divider
                                    type="vertical"
                                    style={{ borderColor: "#000" }}
                                  />
                                }
                              >
                                <span className="author">{item.author}</span>
                                <span className="date">{item.date}</span>
                              </Space>
                            </div>
                          </div>
                        </Space>
                      </Card>
                    );
                  })}
                </div>
              </div>
              {/* 排行榜 */}
              <div className="right">
                <div className="rankingList">
                  {/* 父级榜单 */}
                  <div className="rankingListNav1">
                    <Tabs
                      defaultActiveKey="1"
                      items={rankList1Items}
                      indicator={{ size: 0 }}
                      size="large"
                      onChange={onChange}
                    />
                  </div>
                  {/* 子级榜单 */}
                  <div className="rankingListNav2">
                    <Tabs
                      defaultActiveKey="1"
                      items={rankList2Items}
                      indicator={{ size: 0 }}
                      size="small"
                    />
                  </div>
                  {/* 榜单内容 */}
                  <div className="rankingListContent">
                    {user.map((item) => {
                      return (
                        <Card
                          key={item.id}
                          className="userCard"
                          style={{
                            padding: "8px 16px",
                            border: 0,
                            borderRadius: 0,
                          }}
                        >
                          <div className="userMessage">
                            <div className="userId">
                              {item.isTop ? (
                                <Image
                                  width={20}
                                  src={`../../images/rankTop/top${item.id}.png`}
                                  preview={false}
                                />
                              ) : (
                                <p>{item.id}</p>
                              )}
                            </div>

                            <Avatar src={<img src={item.img} alt="avatar" />} />
                            <p className="userName">{item.userName}</p>
                            <p className="count">+ {item.count}</p>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default HomePage;
