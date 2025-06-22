import React from "react";
import "./ArticleDetail.css";
import { Image, Button, Avatar } from "antd"; // 添加 Button 导入
import hot from "../../public/json/hot_article.json";
import last from "../../public/json/last_article.json";
import { useParams, useNavigate } from "react-router-dom"; // 添加 useNavigate
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons"; // 添加返回图标
import Title from "antd/es/typography/Title";
import MarkDownViewer from "../components/MarkDownViewer";

const articleMap = {
  "1": hot[0],
  "2": hot[1],
  "3": last[0],
  "4": last[1],
};

const ArticleDetail: React.FC = () => {
  // 获取路由参数
  const { id } = useParams<{ id: string }>();

  // 根据 id 获取对应的文章数据
  const article = articleMap[id as keyof typeof articleMap];

  // 初始化导航函数
  const navigate = useNavigate();

  // 返回上一页函数
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div id="ArticleDetail">
        <div className="banner">
          <Image
            width={"100%"}
            height={350}
            src="/images/article/banner.png"
            preview={false}
          />
        </div>
        <div className="bottom">
          <div className="content">
            <div className="back">
              <Button
                type="link"
                onClick={handleGoBack}
                icon={<ArrowLeftOutlined />}
              >
                返回上一页
              </Button>
            </div>
            <div className="title">
              <Title>{article?.title}</Title>
            </div>
            <div className="message">
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <p className="userName">{article?.author}</p>
              <div className="attention">
                <Button color="primary" variant="outlined" size="small">
                  关注
                </Button>
              </div>
              <p className="time">{article?.date}</p>
            </div>
            <div className="md">
              <MarkDownViewer content={article?.content}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
