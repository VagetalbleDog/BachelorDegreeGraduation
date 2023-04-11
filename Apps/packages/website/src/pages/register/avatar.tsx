import { avatarIdMap } from "@/utils/avatarList";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CheckSquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import { FC, useState } from "react";
import styles from "./index.module.less";
interface Iprops {
  value?: string;
  onChange?: any;
}
const SelectAvatar: FC<Iprops> = ({ value, onChange }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleConfirm = () => {
    message.success("头像选择成功");
    setOpen(false);
  };
  const handleCancel = () => {
    onChange?.(undefined);
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="请选择您的头像"
        width={788}
        open={open}
        onCancel={handleCancel}
        okText={"确定"}
        cancelText={"取消"}
        onOk={handleConfirm}
      >
        <div className={styles.avatarListCtn}>
          {avatarIdMap.map(({ id, img }) => (
            <div
              key={id}
              onClick={() => onChange?.(id)}
              className={styles.avatarItem}
            >
              <img
                src={img}
                className={
                  value === id
                    ? styles.avatarItemIconChecked
                    : styles.avatarItemIcon
                }
              />
            </div>
          ))}
        </div>
      </Modal>
      <div className={styles.avatarCtn}>
        {value ? (
          <img
            src={avatarIdMap[Number(value) - 1]?.img}
            className={styles.selectAvatar}
            onClick={() => setOpen(true)}
          />
        ) : (
          <div className={styles.selectAvatar} onClick={() => setOpen(true)}>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>请选择您的头像</div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectAvatar;
