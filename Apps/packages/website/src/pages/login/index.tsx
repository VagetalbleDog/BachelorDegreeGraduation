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
  Checkbox,
} from "antd";
import { RcFile } from "antd/es/upload";
import { isEmpty, isNil } from "lodash";
import React, { useContext, useState } from "react";
import { useCallback } from "react";
import { FC } from "react";
import styles from "./index.module.less";

interface Iprops {}

const Register: FC<Iprops> = React.memo(() => {
  const { AppAction, formInitValue, appFormAssest } =
    useContext(AppControlContext);
  const { onUserLogin } = AppAction;
  const { Title } = Typography;
  return (
    <Wrapper>
      <div className={styles.container}>
        <Title level={2} className={styles.title}>
          登录
        </Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          className={styles.loginForm}
          onFinish={onUserLogin}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入您的用户名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入您的密码" }]}
          >
            <Input.Password />
          </Form.Item>

          <div className={styles.loginButton}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
});
export default Register;
