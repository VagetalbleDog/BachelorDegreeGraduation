import {
  articleToEchartValue,
  barOption,
  InterestJsonToArray,
  InterestJsonToEchartValue,
  pieOptions,
} from "@/utils";
import { TagColor } from "@/utils/tagColor";
import { Descriptions, Typography } from "antd";
import Title from "antd/es/skeleton/Title";
import { FC, memo } from "react";
import styles from "../index.module.less";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

interface Iprops {
  userInfo: API.UserEntity;
}
const InfoPane: FC<Iprops> = ({ userInfo }) => {
  const { Title } = Typography;
  const likedValue = articleToEchartValue(userInfo.likedArticles);
  const collectedValue = articleToEchartValue(userInfo.collectArticles);
  const myValue = articleToEchartValue(userInfo.articles);
  const interestValue = InterestJsonToArray(userInfo.interestsJson);
  const barOptions = barOption(myValue, likedValue, collectedValue);
  const pieOption = pieOptions(interestValue as number[]);
  return (
    <div className={styles.infoPaneCtn}>
      <div>
        <Title level={4} style={{ marginTop: 0 }}>
          个人信息看板
        </Title>
        <Descriptions bordered>
          <Descriptions.Item label="用户名">
            {userInfo.username}
          </Descriptions.Item>
          <Descriptions.Item label="昵称">
            {userInfo.nickname}
          </Descriptions.Item>
          <Descriptions.Item label="职业">
            <TagColor work category={userInfo.work} />
          </Descriptions.Item>
          <Descriptions.Item label="创作文章数">
            {userInfo.articles?.length}
          </Descriptions.Item>
          <Descriptions.Item label="点赞文章数">
            {userInfo.likedArticles?.length}
          </Descriptions.Item>
          <Descriptions.Item label="收藏文章数">
            {userInfo.collectArticles?.length}
          </Descriptions.Item>
          <Descriptions.Item label="兴趣标签">
            {InterestJsonToArray(userInfo.interestsJson)
              ?.slice(0, 3)
              .map((i) => (
                <TagColor key={i.category} category={i.category} />
              ))}
          </Descriptions.Item>
          <Descriptions.Item label="关注数">
            {userInfo.follows?.length}
          </Descriptions.Item>
          <Descriptions.Item label="粉丝数">
            {userInfo.fans?.length}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div>
        <Title level={4}>兴趣可视化看板</Title>
        <div className={styles.echartsCtn}>
          <ReactEcharts
            style={{ width: 550, height: 450 }}
            echarts={echarts}
            option={barOptions}
          />
          <ReactEcharts
            style={{ width: 600, height: 450 }}
            echarts={echarts}
            option={pieOption}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(InfoPane);
