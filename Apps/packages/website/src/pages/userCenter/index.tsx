import Wrapper from "@/component/wrapper";
import { AppControlContext } from "@/hooks/useAppControl";
import { avatarIdMap } from "@/utils/avatarList";
import { TagColor } from "@/utils/tagColor";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, message, Tabs, TabsProps, Tag, Typography } from "antd";
import { FC, memo, useContext, useEffect, useMemo, useState } from "react";
import { history, useParams } from "umi";
import Articles from "./components/articles";
import InfoPane from "./components/infoPane";
import styles from "./index.module.less";
interface Iprops {}
const enum FollowState {
  // 自己
  self = 1,
  // 是自己的粉丝
  fans = 2,
  // 未关注
  unFollowed = 3,
  // 已关注
  followed = 4,
}
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
  const { followUser, unfollowUser } = AppAction;
  const localUserInfo = AppAction.computedState.userInfo();
  const { Title, Paragraph } = Typography;
  const [followState, setFollowState] = useState<FollowState>(FollowState.fans);
  useEffect(() => {
    if (!userInfo || !localUserInfo) {
      return;
    }
    if (userInfo.id === localUserInfo.id) {
      console.log(1);
      setFollowState(FollowState.self);
      return;
    }
    if (localUserInfo.fans?.some((i: API.UserEntity) => i.id === userInfo.id)) {
      setFollowState(FollowState.fans);
      return;
    }
    if (
      localUserInfo.follows?.some((i: API.UserEntity) => i.id === userInfo.id)
    ) {
      setFollowState(FollowState.followed);
      return;
    } else {
      setFollowState(FollowState.unFollowed);
      return;
    }
  }, [userInfo, localUserInfo]);
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
          {followState === FollowState.self && <></>}
          {followState === FollowState.fans && <Tag>已经成为你的粉丝</Tag>}
          {followState === FollowState.followed && (
            <Button
              type="primary"
              onClick={() => {
                unfollowUser(localUserInfo.id, userInfo.id);
                setFollowState(FollowState.unFollowed);
              }}
              danger
              icon={<UserAddOutlined />}
            >
              UnFollow
            </Button>
          )}
          {followState === FollowState.unFollowed && (
            <Button
              onClick={() => {
                followUser(localUserInfo.id, userInfo.id);
                setFollowState(FollowState.followed);
              }}
              type="primary"
              icon={<UserAddOutlined />}
            >
              Follow
            </Button>
          )}
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
