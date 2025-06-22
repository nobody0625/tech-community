import React, { useState } from "react";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

interface CommentType {
  id: number;
  author: string;
  avatar?: string; 
  content: string;
  time: string; // 时间戳
  replies: CommentType[]; // 嵌套回复
}

const CommentComponent: React.FC = () => {
  const initialComments = [
    {
      id: 1,
      author: "用户A",
      content: "第一条评论",
      time: "2023-08-01T10:00:00Z",
      replies: [
        {
          id: 2,
          author: "用户B",
          content: "回复A",
          time: "2023-08-01T10:05:00Z",
          replies: [],
        }
      ],
    },
  ];

  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const addComment = (content: string, parentId?: number) => {
    const newComment = {
      id: Date.now(),
      author: "nobody0607", // 可从全局状态获取
      content,
      time: new Date().toISOString(),
      replies: [],
    };
    if (!parentId) {
      setComments([...comments, newComment]); // 添加新评论
    } else {
      // 递归查找父评论并添加回复
      const updateComments = (list: CommentType[]): CommentType[] =>
        list.map((item) => {
          if (item.id === parentId) {
            return { ...item, replies: [...(item.replies || []), newComment] };
          } else if (item.replies) {
            return { ...item, replies: updateComments(item.replies) };
          }
          return item;
        });
      setComments((prev) => updateComments(prev));
    }
  };
  return (
    <>
      <div>
        <CommentInput onSubmit={(content) => addComment(content)} />
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={addComment}
            activeReplyId={activeReplyId}
            setActiveReplyId={setActiveReplyId}
          />
        ))}
      </div>
    </>
  );
};

export default CommentComponent;
