import React, { useContext, useState } from "react";
import {
  Input,
  Col,
  Row,
  Form,
  Typography,
  Steps,
  StepProps,
  Button,
  Select,
  Modal,
  Spin,
} from "antd";
import Wrapper from "@/component/wrapper";
import styles from "./index.module.less";
import { AppControlContext } from "@/hooks/useAppControl";
import { useParams } from "umi";
import { isEmpty, isNil } from "lodash";
import { enumToOptions } from "@/utils";
import { CategoryTextMap } from "@/consts/enum";
import MarkDown from "./markdown";

const enum PageType {
  "new" = 1,
  "edit" = 2,
}
const { TextArea } = Input;
const { Title } = Typography;
const Write: React.FC = () => {
  const { id } = useParams();
  const type = isNil(id) ? PageType.new : PageType.edit;
  const { AppAction, appFormAssest } = useContext(AppControlContext);
  const initValue = AppAction.computedState.articleDetail(id as string);
  const { formFieldsName, formInstances, formsName } = appFormAssest;
  const [current, setCurrent] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const userInfo = AppAction.computedState.userInfo();
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
      <Modal
        title="确认发表"
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        okText="可以发表"
        cancelText="再检查检查"
        onOk={() => {
          const formValue = formInstances.article.getFieldsValue([
            formFieldsName.title,
            formFieldsName.category,
            formFieldsName.desc,
            formFieldsName.content,
          ]);
          if (type === PageType.new) {
            // 创建文章
            AppAction.createArticle(formValue, userInfo);
          } else {
            // 修改文章
            AppAction.editArticle(formValue, initValue);
          }
        }}
      >
        请检查信息无误后发表哦~
      </Modal>

      <div className={styles.container}>
        {Boolean(id && isEmpty(initValue)) ? (
          <Spin spinning={Boolean(id && isEmpty(initValue))} />
        ) : (
          <>
            <Steps
              style={{ width: "60%" }}
              onChange={setCurrent}
              current={current}
              items={items}
            ></Steps>
            {current === 0 ? (
              <>
                <Title level={2} className={styles.articleContentTitle}>
                  文章概要
                </Title>
                <Form
                  form={formInstances.article}
                  name={formsName.article}
                  className={styles.formItemCtn}
                  validateMessages={{ required: "该字段为必填项" }}
                >
                  <Form.Item
                    label="文章标题"
                    rules={[
                      {
                        required: true,
                        message: "文章标题为必填项",
                      },
                    ]}
                    initialValue={initValue.title}
                    name={formFieldsName.title}
                  >
                    <Input placeholder="请输入您的文章标题" />
                  </Form.Item>
                  <Form.Item
                    label="文章类型"
                    rules={[
                      {
                        required: true,
                        message: "文章类型为必选项",
                      },
                    ]}
                    initialValue={initValue.category}
                    name={formFieldsName.category}
                  >
                    <Select
                      style={{ width: 120 }}
                      options={enumToOptions(CategoryTextMap).slice(1)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="文章描述"
                    rules={[
                      {
                        required: true,
                        message: "文章描述为必填项",
                      },
                    ]}
                    initialValue={initValue.desc}
                    name={formFieldsName.desc}
                  >
                    <TextArea
                      autoSize={{ minRows: 10 }}
                      placeholder="用一段简短的话来介绍您的文章吧~"
                    />
                  </Form.Item>
                </Form>
              </>
            ) : (
              <>
                <Title level={2} className={styles.articleContentTitle}>
                  文章内容
                </Title>
                <Form
                  name={formsName.article}
                  form={formInstances.article}
                  style={{ width: "100%" }}
                >
                  <Form.Item
                    name={formFieldsName.content}
                    initialValue={initValue.content}
                  >
                    <MarkDown />
                  </Form.Item>
                </Form>
                <Button
                  type="primary"
                  onClick={() => {
                    setShowConfirm(true);
                  }}
                >
                  {type === PageType.edit ? "修改" : "发表"}
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Write;
