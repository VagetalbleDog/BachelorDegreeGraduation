import { Card, List } from "antd";
import { FC } from "react";
import styles from "../index.module.less";
import { avatarIdMap } from "@/utils/avatarList";
import { TagColor } from "@/utils/tagColor";
import { InterestJsonToArray } from "@/utils";
interface Iprops {
  userlist: API.UserEntity[];
}
const UserList: FC<Iprops> = ({ userlist }) => {
  console.log(userlist);
  return (
    <div className={styles.userListCtn}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={userlist}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <a href={`/userCenter/${item.id}`}>
              <Card title={item.username} className={styles.card}>
                <div className={styles.cardCtn}>
                  <div className={styles.cardLine1}>
                    <span className={styles.authorItem}>
                      <img
                        src={avatarIdMap.find((i) => i.id == item.avatar)?.img}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </span>
                    <span>{item.nickname}</span>
                    <TagColor category={item.work} work />
                  </div>
                  <div className={styles.descCtn}>
                    <span className={styles.cardTag}>介绍：</span>
                    <span className={styles.desc}>{item.selfDesc}</span>
                  </div>
                  <div>
                    <span className={styles.cardTag}>兴趣标签：</span>
                    {InterestJsonToArray(item.interestsJson)
                      ?.slice(0, 3)
                      .map((i) => (
                        <TagColor key={i.category} category={i.category} />
                      ))}
                  </div>
                </div>
              </Card>
            </a>
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserList;
