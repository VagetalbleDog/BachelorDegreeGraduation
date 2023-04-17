import Wrapper from "@/component/wrapper";
import { AppControlContext } from "@/hooks/useAppControl";
import { avatarIdMap } from "@/utils/avatarList";
import { TagColor } from "@/utils/tagColor";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, message, Tabs, TabsProps, Typography } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { FC, memo, useContext, useState } from "react";
import { history, useParams } from "umi";
import Articles from "./components/articles";
import InfoPane from "./components/infoPane";
import styles from "./index.module.less";
interface Iprops {}

const UserCenter: FC<Iprops> = () => {
  const { userId } = useParams();
  const { AppAction, formInitValue, appFormAssest } =
    useContext(AppControlContext);
  // 是否登录？
  if (!localStorage.getItem("userKey")) {
    message.info("请您登录后访问");
    history.push("/login");
    return <></>;
  }
  const userInfo = AppAction.computedState.userInfoById(userId as string);
  const localUserInfo = AppAction.computedState.userInfo();
  const { Title, Paragraph } = Typography;
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.avatar}>
            <img
              src={avatarIdMap.find((item) => item.id == userInfo.avatar)?.img}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className={styles.nickName}>{userInfo.nickname}</div>
          <div>
            <TagColor work category={userInfo.work} />
          </div>
          {!(userInfo.id === localUserInfo.id) &&
            (localUserInfo.follows?.some(
              (i: API.UserEntity) => i.id === userInfo.id
            ) ? (
              <Button type="primary" danger icon={<UserAddOutlined />}>
                取消关注
              </Button>
            ) : (
              <Button type="primary" icon={<UserAddOutlined />}>
                follow
              </Button>
            ))}
          <div className={styles.desc}>
            <Title level={3}>自我介绍</Title>
            <Paragraph>{userInfo.selfDesc}</Paragraph>
          </div>
        </div>
        <div className={styles.right}>
          <Tabs centered size="large" defaultActiveKey="info">
            <Tabs.TabPane tab="个人信息" key="info">
              <InfoPane userInfo={userInfo} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="我的文章" key="my">
              <Articles type="my" articles={userInfo.articles} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="我点赞的" key="loved">
              <Articles type="liked" articles={userInfo.likedArticles} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="我收藏的" key="collect">
              <Articles type="collect" articles={userInfo.collectArticles} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </Wrapper>
  );
};

export default memo(UserCenter);
