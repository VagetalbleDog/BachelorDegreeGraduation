import Wrapper from "@/component/wrapper";
import { CategoryTextMap } from "@/consts/enum";
import { AppControlContext } from "@/hooks/useAppControl";
import { enumToOptions } from "@/utils";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Steps,
  StepProps,
  Typography,
  Col,
  Row,
  Modal,
  message,
  Upload,
  Select,
} from "antd";
import { RcFile } from "antd/es/upload";
import { isEmpty, isNil } from "lodash";
import React, { useContext, useState } from "react";
import { useCallback } from "react";
import { FC } from "react";
import SelectAvatar from "./avatar";
import styles from "./index.module.less";

interface Iprops {}

const Register: FC<Iprops> = React.memo(() => {
  const { AppAction, formInitValue, appFormAssest } =
    useContext(AppControlContext);
  const { formFieldsName, formInstances, formsName } = appFormAssest;
  const { Item } = Form;
  const { onRegisterFinish } = AppAction;
  // 页面state
  const [current, setCurrent] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(true);
  const items: StepProps[] = [
    {
      title: "账户信息",
      description: (
        <span className={styles.stepDesc}>
          创建您的账户信息,这是您登录社区的凭证
        </span>
      ),
    },
    {
      title: "社区身份",
      description: (
        <span className={styles.stepDesc}>
          创建您的社区形象,包括头像、昵称、自我介绍
        </span>
      ),
    },
    {
      title: "工作兴趣",
      description: (
        <span className={styles.stepDesc}>
          了解您的职业经历、技术兴趣、工作规划
        </span>
      ),
    },
  ];
  console.log(
    formInstances.regsiter.getFieldsValue([
      formFieldsName.username,
      formFieldsName.password,
      formFieldsName.repeatPassword,
      formFieldsName.avatar,
      formFieldsName.nickname,
      formFieldsName.selfDesc,
      formFieldsName.work,
      formFieldsName.interestsJson,
      formFieldsName.skillJson,
    ])
  );
  // 页面简单逻辑
  /**
   * 每一个步骤的校验表单
   */
  const checkNowStepForm = useCallback(() => {
    const currentNameMap: any = {
      [0]: [
        formFieldsName.username,
        formFieldsName.password,
        formFieldsName.repeatPassword,
      ],
      [1]: [
        formFieldsName.avatar,
        formFieldsName.nickname,
        formFieldsName.selfDesc,
      ],
      [2]: [formFieldsName.work, formFieldsName.interestsJson],
    };
    const nowStepFormValue = formInstances.regsiter.getFieldsValue(
      currentNameMap[current]
    );
    for (const key in nowStepFormValue) {
      if (isNil(nowStepFormValue[key])) {
        message.error("当前步骤缺少必填项~");
        return false;
      }
    }
    if (error) {
      message.error("当前步骤填写有误，请检查一下哦~");
      return false;
    }
    return true;
  }, [error, current]);
  // 小组件
  const { Title } = Typography;
  return (
    <Wrapper>
      <div className={styles.container}>
        <Steps current={current} items={items}></Steps>
        <div className={styles.formItemCtn}>
          {current === 0 && (
            <>
              <Title level={3} className={styles.title}>
                账户信息
              </Title>
              <Form
                wrapperCol={{ span: 8 }}
                labelCol={{ span: 8 }}
                form={appFormAssest.formInstances.regsiter}
                name={formsName.regsiter}
                validateMessages={{
                  required: "该字段是必填项",
                }}
              >
                <Item
                  name={formFieldsName.username}
                  label="用户名"
                  rules={[
                    { required: true },
                    {
                      validator(rule, value) {
                        if (!/^[A-Za-z0-9]{9,16}$/.test(value)) {
                          setError(true);
                          throw new Error();
                        } else {
                          setError(false);
                        }
                      },
                      message: "用户名应为9-16位字母与数字组合",
                    },
                  ]}
                >
                  <Input placeholder="这将是你用于登录的用户名,9-16位字母与数字组合" />
                </Item>
                <Item
                  name={formFieldsName.password}
                  label="密码"
                  rules={[
                    { required: true },
                    {
                      validator(rule, value) {
                        if (!/^[A-Za-z0-9]{9,16}$/.test(value)) {
                          setError(true);
                          throw new Error();
                        } else {
                          setError(false);
                        }
                      },
                      message: "密码应为9-16位数字与字符组合",
                    },
                  ]}
                >
                  <Input
                    type="password"
                    placeholder="请输入您的密码,要求9-16位字符"
                  />
                </Item>
                <Item
                  name={formFieldsName.repeatPassword}
                  label="重复密码"
                  rules={[
                    { required: true },
                    {
                      validator(rule, value) {
                        const password =
                          formInstances.regsiter.getFieldValue("password");
                        if (password !== value) {
                          setError(true);
                          throw new Error();
                        } else {
                          setError(false);
                        }
                      },
                      message: "重复密码应与密码保持一致",
                    },
                  ]}
                >
                  <Input type="password" placeholder="请再次输入您的密码" />
                </Item>
              </Form>
            </>
          )}
          {current === 1 && (
            <>
              <Title level={3} className={styles.title}>
                社区形象
              </Title>
              <Form
                wrapperCol={{ span: 8 }}
                labelCol={{ span: 8 }}
                form={appFormAssest.formInstances.regsiter}
                name={formsName.regsiter}
                validateMessages={{
                  required: "该字段是必填项",
                }}
              >
                <Item
                  name={formFieldsName.avatar}
                  label="头像"
                  rules={[
                    {
                      validator(rule, value) {
                        if (!value) {
                          setError(true);
                          throw new Error();
                        } else {
                          setError(false);
                        }
                      },
                      message: "头像是必选项哦~",
                    },
                  ]}
                >
                  <SelectAvatar />
                </Item>
                <Item
                  name={formFieldsName.nickname}
                  label="昵称"
                  required
                  rules={[
                    {
                      validator(_, value) {
                        if (isNil(value) || isEmpty(value)) {
                          setError(true);
                          throw new Error();
                        } else {
                          setError(false);
                        }
                      },
                      message: "昵称是必填项哦~",
                    },
                  ]}
                >
                  <Input placeholder="取一个彰显自己个性和特点的昵称吧~" />
                </Item>
                <Item
                  name={formFieldsName.selfDesc}
                  label="自我介绍"
                  required
                  rules={[
                    {
                      validator(_, value) {
                        if (isNil(value) || isEmpty(value)) {
                          setError(true);
                          throw new Error();
                        } else {
                          setError(false);
                        }
                      },
                      message: "自我介绍是必填项哦~",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={5}
                    placeholder="有趣的自我介绍可以吸引更多的开发者follow你哦~"
                  />
                </Item>
              </Form>
            </>
          )}
          {current === 2 && (
            <>
              <Title level={3} className={styles.title}>
                技能兴趣
              </Title>
              <Form
                wrapperCol={{ span: 8 }}
                labelCol={{ span: 8 }}
                form={appFormAssest.formInstances.regsiter}
                name={formsName.regsiter}
                validateMessages={{
                  required: "该字段是必填项",
                }}
              >
                <Item
                  name={formFieldsName.work}
                  label="职业"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={enumToOptions(CategoryTextMap)
                      .slice(1)
                      .map((i) => ({
                        label: i.label + "工程师",
                        value: i.value,
                      }))}
                  />
                </Item>
                <Item
                  name={formFieldsName.interestsJson}
                  label="技术兴趣"
                  rules={[
                    { required: true },
                    {
                      validator(_, value) {},
                    },
                  ]}
                >
                  <Select
                    allowClear
                    mode="multiple"
                    options={enumToOptions(CategoryTextMap).slice(1)}
                  />
                </Item>
                <Modal
                  title="确认提交"
                  open={showConfirm}
                  onCancel={() => setShowConfirm(false)}
                  okText="可以提交"
                  cancelText="再检查检查"
                  onOk={() => {
                    onRegisterFinish(
                      formInstances.regsiter.getFieldsValue([
                        formFieldsName.username,
                        formFieldsName.password,
                        formFieldsName.repeatPassword,
                        formFieldsName.avatar,
                        formFieldsName.nickname,
                        formFieldsName.selfDesc,
                        formFieldsName.work,
                        formFieldsName.interestsJson,
                        formFieldsName.skillJson,
                      ])
                    );
                  }}
                >
                  请检查信息无误后提交哦~
                </Modal>
              </Form>
            </>
          )}
        </div>
        {/* 用于控制 */}
        <div className={styles.buttonGroup}>
          {current !== 0 && (
            <Button
              onClick={() => setCurrent(current - 1)}
              style={{ marginRight: 8 }}
            >
              上一步
            </Button>
          )}
          {current !== 2 && (
            <Button
              type="primary"
              onClick={() => {
                checkNowStepForm() && setCurrent(current + 1);
              }}
              style={{ marginRight: 8 }}
            >
              下一步
            </Button>
          )}
          {current === 2 && (
            <Button
              type="primary"
              onClick={() => checkNowStepForm() && setShowConfirm(true)}
            >
              提交
            </Button>
          )}
        </div>
      </div>
    </Wrapper>
  );
});
export default Register;
