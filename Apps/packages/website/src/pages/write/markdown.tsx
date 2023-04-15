/**
 * 自定义markdown组件
 */

import { markdown } from "@/utils/markdown";
import { Input, Typography } from "antd";
import { FC } from "react";
import styles from "./index.module.less";
interface Iprops {
  value?: any;
  onChange?: any;
}

const { TextArea } = Input;
const { Title } = Typography;
const MarkDown: FC<Iprops> = ({ value, onChange }) => {
  const { html } = markdown(value || "");
  return (
    <>
      <div className={styles.writeCtn}>
        <div className={styles.left}>
          <Title level={3} style={{ marginTop: 0 }}>
            输入区
          </Title>
          <TextArea
            className={styles.write}
            autoSize={{ minRows: 25 }}
            value={value}
            onChange={onChange}
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
    </>
  );
};

export default MarkDown;
