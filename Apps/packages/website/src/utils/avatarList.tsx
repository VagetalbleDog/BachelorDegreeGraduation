import avatar1 from "@/assets/avatar/1.svg";
import avatar2 from "@/assets/avatar/2.svg";
import avatar3 from "@/assets/avatar/3.svg";
import avatar4 from "@/assets/avatar/4.svg";
import avatar5 from "@/assets/avatar/5.svg";
import avatar6 from "@/assets/avatar/6.svg";
import avatar7 from "@/assets/avatar/7.svg";
import avatar8 from "@/assets/avatar/8.svg";
import avatar9 from "@/assets/avatar/9.svg";
import avatar10 from "@/assets/avatar/10.svg";
import avatar11 from "@/assets/avatar/11.svg";
import avatar12 from "@/assets/avatar/12.svg";
import avatar13 from "@/assets/avatar/13.svg";
import avatar14 from "@/assets/avatar/14.svg";
import avatar15 from "@/assets/avatar/15.svg";
import avatar16 from "@/assets/avatar/16.svg";
import avatar17 from "@/assets/avatar/17.svg";
import avatar18 from "@/assets/avatar/18.svg";
import avatar19 from "@/assets/avatar/19.svg";
import avatar20 from "@/assets/avatar/20.svg";
import avatar21 from "@/assets/avatar/21.svg";
import avatar22 from "@/assets/avatar/22.svg";
import avatar23 from "@/assets/avatar/23.svg";
import avatar24 from "@/assets/avatar/24.svg";
import avatar25 from "@/assets/avatar/25.svg";
import avatar26 from "@/assets/avatar/26.svg";
import avatar34 from "@/assets/avatar/34.svg";
import avatar35 from "@/assets/avatar/35.svg";
import avatar36 from "@/assets/avatar/36.svg";
import avatar37 from "@/assets/avatar/37.svg";

const avatarlist = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
  avatar20,
  avatar21,
  avatar22,
  avatar23,
  avatar24,
  avatar25,
  avatar26,
  avatar34,
  avatar35,
  avatar36,
  avatar37,
];
const avatarIdMap: any[] = [];
for (let index in avatarlist) {
  avatarIdMap.push({ id: Number(index) + 1, img: avatarlist[index] });
}
export { avatarIdMap };
export const ImgList = avatarlist.map((avatar, index) => {
  return { id: index + 1, img: <img src={avatar} /> };
});
