import Comment from "@ant-design/compatible/lib/comment";
import { Avatar, Tooltip } from "antd";
import React, { createElement, useState } from "react";
import CommentInput from "./CommentInput";
import moment from "moment";
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, UserOutlined } from "@ant-design/icons";

interface CommentType {
  id: number;
  author: string;
  avatar?: string; // 头像 URL
  content: string;
  time: string; // 时间戳
  replies: CommentType[]; // 嵌套回复
}

interface CommentItemProps {
  comment: {
    id: number;
    author: string;
    avatar?: string; // 头像 URL
    content: string;
    time: string; // 时间戳
    replies: CommentType[]; // 嵌套回复
  };
  depth?: number;
  onReply?: (content: string, commentId: number) => void;
  activeReplyId?: number | null;
  setActiveReplyId?: (id: number | null) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  depth = 0,
  onReply,
  activeReplyId,
  setActiveReplyId,
}) => {
  // 限制评论层数
  const canReply = depth < 4;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  return (
    <>
      <Comment
        author={<a>{comment.author}</a>}
        avatar={
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        }
        content={<p>{comment.content}</p>}
        datetime={
          <Tooltip title={moment(comment.time).format("YYYY-MM-DD HH:mm")}>
            <span>{moment(comment.time).fromNow()}</span>
          </Tooltip>
        }
        actions={[
          <span onClick={like}>
            {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
            <span className="comment-action">{likes}</span>
          </span>,
          <span onClick={dislike}>
            {React.createElement(
              action === "disliked" ? DislikeFilled : DislikeOutlined
            )}
            <span className="comment-action">{dislikes}</span>
          </span>,
          canReply && (
            <span key="reply" onClick={() => setActiveReplyId?.(comment.id)}>
              回复
            </span>
          ),
        ]}
      >
        {activeReplyId === comment.id && (
          <CommentInput
            onSubmit={(content) => onReply?.(content, comment.id)}
            onCancel={() => setActiveReplyId?.(null)}
          />
        )}
        {comment.replies?.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            depth={depth + 1}
            onReply={onReply}
            activeReplyId={activeReplyId}
            setActiveReplyId={setActiveReplyId}
          />
        ))}
      </Comment>
    </>
  );
};

export default CommentItem;
