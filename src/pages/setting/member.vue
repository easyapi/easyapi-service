<template>
  <div>
    <div class="staff">
      <span class="staff_member">
        <img :src="defaultMemberImg" alt style="
            width: 40px;
            height: 40px;
            border-radius: 25px;
            margin-left: 10px;
            margin-top: 18px;
          "/>
        <ul style="width: 85px; height: 100%; padding-top: 15px">
          <li style="color: #1bc1d6; font-size: 16px">
            {{ defaultMemberNickname }}
          </li>
          <li>{{ defaultMemberType }}</li>
        </ul>
      </span>
      <span
        class="staff_member fq"
        v-for="(staff, staffIndex) in member"
        :key="staffIndex"
        style="position: relative"
      >
        <span class="lpha" @click="deleteMember(staff.userServiceId, staff.user.nickname)">X</span>
        <img :src="staff.user.photo" alt style="
            width: 40px;
            height: 40px;
            border-radius: 25px;
            margin-left: 10px;
            margin-top: 18px;
          "/>
        <ul style="width: 85px; height: 100%; padding-top: 15px">
          <li style="color: #1bc1d6; font-size: 16px">
            {{ staff.user.nickname }}
          </li>
          <li>{{ staff.type }}</li>
        </ul>
        <Modal v-model="deleteModel" @on-ok="prompt" width="360" title="提示">
          <p style="text-align: center; color: #333; font-size: 16px">
            确定删除成员{{ nickname }}吗?
          </p>
        </Modal>
      </span>
      <span class="addTO" @click="displayAdd">
        <Icon type="ios-add-circle-outline" style="color: #1bc0d6; font-size: 40px; line-height: 70px"/>
        <span style="
            color: #333333;
            font-size: 16px;
            line-height: 70px;
            margin-left: 10px;
          ">添加成员</span>
      </span>
    </div>
    <div class="addMembers" style="margin-top: 15px" v-if="show">
      <h3 style="padding-left: 28px">添加其他成员</h3>
      <div style="overflow: hidden">
        <span
          class="staff_member"
          @click="projectile(people.nickname, people.id)"
          v-for="(people, peopleIndex) in notAdded"
          :key="peopleIndex"
          style="position: relative; margin-top: 0px"
        >
          <span v-if="notAdded.code !== 0" class="staff_member">
            <img :src="people.photo" alt style="
                width: 40px;
                height: 40px;
                border-radius: 25px;
                margin-left: 10px;
                margin-top: 18px;
              "/>
            <ul style="width: 85px; height: 100%; padding-top: 25px">
              <li style="color: #1bc1d6; font-size: 16px">
                {{ people.nickname }}
              </li>
            </ul>
            <Modal v-model="frame" title="提示" @on-ok="Sure" width="360" class="dialogue">
              <p style="text-align: center; color: #333; font-size: 16px">
                确定添加成员{{ nickname }}吗?
              </p>
            </Modal>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createUserService,
  getUnJoinUserList,
  getServiceUserList,
  deleteUserService,
} from "../../api/user-service";

export default {
  name: "SettingMember",
  props: ["serviceId", "teamServiceId", "dialog"],
  data() {
    return {
      show: false,
      frame: false,
      nickname: "",
      memberId: "",
      deleteModel: false,
      notAdded: [],
      member: [],
      defaultMemberImg: "",
      defaultMemberNickname: "",
      defaultMemberType: "",
    };
  },
  watch: {
    dialog(val) {
      if (val) {
        this.getMemberList();
        this.membersNotJoined();
      }
    },
  },
  methods: {
    //显示未添加成员
    displayAdd() {
      this.show = true;
    },
    //添加成员
    projectile(nickname, id) {
      this.frame = true;
      this.nickname = nickname;
      this.userId = id;
    },
    //添加成员
    Sure() {
      let data = {
        userId: this.userId,
        serviceId: this.serviceId,
        teamServiceId: this.teamServiceId,
      };
      createUserService(data)
        .then((res) => {
          this.$Message.success(res.data.message);
          this.getMemberList();
          this.membersNotJoined();
        })
        .catch((error) => {
          this.$Message.error(error.response.data.message);
        });
    },
    //删除成员
    deleteMember(id, name) {
      this.deleteModel = true;
      this.memberId = id;
      this.nickname = name;
    },
    prompt() {
      deleteUserService(this.memberId)
        .then((res) => {
          this.$Message.success(res.data.message);
          this.getMemberList();
          this.membersNotJoined();
        })
        .catch((error) => {
          this.$Message.error(error.response.data.message);
        });
    },
    /**
     * 获取服务的成员列表
     */
    getMemberList() {
      let params = {
        size: 100,
      };
      getServiceUserList(this.serviceId, params)
        .then((res) => {
          if (res.data.code === 1) {
            this.member = res.data.content.filter((item) => {
              return item.type !== "创建人";
            });
            this.defaultMemberImg = res.data.content[0].user.photo;
            this.defaultMemberNickname = res.data.content[0].user.nickname;
            this.defaultMemberType = res.data.content[0].type;
          }
        })
        .catch((error) => {
          this.$Message.error(error.response.data.message);
        });
    },
    //未加入服务的成员列表
    membersNotJoined() {
      getUnJoinUserList(this.serviceId)
        .then((res) => {
          this.notAdded = res.data.content;
          this.code = res.data.code;
        })
        .catch((error) => {
          this.$Message.error(error.response.data.message);
        });
    },
  },
  created() {
    this.getMemberList();
    this.membersNotJoined();
  },
};
</script>
<style lang="stylus">
.staff {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.staff_member {
  width: 156px;
  height: 74px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  float: left;
  margin-top: 20px;
  margin-left: 17px;
  cursor: pointer;
  margin-bottom: 5px;
}

.staff_member ul {
  width: 42px;
  height: 100%;
  margin-left: 10px;
  list-style: none;
  font-size: 14px;
  color: #333;
}

.fq:hover .lpha {
  display: block;
}

.fq:hover {
  width: 156px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.11);
  border-radius: 4px;
}

.addMembers .ivu-modal-body {
  height: 100px;
  margin: 0px;
  padding: 0px;
}

.addMembers {
  width: 100%;
  height: auto;
}

.lpha {
  color: #7e8e9f;
  font-size: 15px;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0px;
  top: 3px;
  display: none;
}

.addTO {
  width: 169px;
  height: 73px;
  background-color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 17px;
  display: inline-block;
}

.dialogue .ivu-modal-mask {
  /* background-color:transparent; */
  background-color: rgba(55, 55, 55, 0.1);
  /* background-color:#000; */
  /* opacity:0.1; */
}

.dialogue .ivu-modal-content {
  box-shadow: none;
}
</style>
