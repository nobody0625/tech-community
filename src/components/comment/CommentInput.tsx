import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

interface CommentInputProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState("");
  const handleSubmit = () => {
    if (content.trim()) onSubmit(content);
    setContent("");
  };
  return (
    <>
      <div>
        <Space>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onPressEnter={handleSubmit}
            placeholder="输入评论..."
            rows={3}
            style={{ width: "400px" }}
          />
          {onCancel && <Button onClick={onCancel}>关闭</Button>}
        </Space>
      </div>
    </>
  );
};

export default CommentInput;
