import React, { useState } from "react";
import {
  Input,
  Col,
  Row,
  Form,
  Typography,
  Steps,
  StepProps,
  Button,
} from "antd";
import Wrapper from "@/component/wrapper";
import styles from "./index.module.less";
import { markdown } from "@/utils/markdown";
const { TextArea } = Input;
const { Title } = Typography;
const Write: React.FC = () => {
  const [markdownText, setMarkdown] = useState("");

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };
  const { html } = markdown(markdownText);
  const [current, setCurrent] = useState(0);
  const items: StepProps[] = [
    {
      title: "文章概要",
      description: (
        <span className={styles.stepDesc}>填写标题、分类、描述等概要信息</span>
      ),
    },
    {
      title: "具体内容",
      description: (
        <span className={styles.stepDesc}>
          使用markdown语法填写具体文章内容
        </span>
      ),
    },
  ];
  return (
    <Wrapper>
      <div className={styles.container}>
        <Steps
          style={{ width: "60%" }}
          onChange={setCurrent}
          current={current}
          items={items}
        ></Steps>
        <Title level={2} className={styles.articleContentTitle}>
          文章内容
        </Title>
        <div className={styles.writeCtn}>
          <div className={styles.left}>
            <Title level={3} style={{ marginTop: 0 }}>
              输入区
            </Title>
            <TextArea
              className={styles.write}
              autoSize={{ minRows: 25 }}
              value={markdownText}
              onChange={handleMarkdownChange}
              placeholder="请使用markdown语法，您输入的内容会在右侧实时渲染"
            />
          </div>
          <div className={styles.divideLine} />
          <div className={styles.right}>
            <Title level={3} style={{ marginTop: 0 }}>
              预览区
            </Title>
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
        <Button type="primary">提交</Button>
      </div>
    </Wrapper>
  );
};

export default Write;
