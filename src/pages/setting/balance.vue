<template>
  <div>
    <div class="secret_balance">
      <div class="balance_remind">
        <p v-if="judgmentUnit === 2">
          <span>当前剩余次数：&nbsp;&nbsp;&nbsp;&nbsp;{{ balance }}次</span>
        </p>
        <p v-if="judgmentUnit === 3">
          <span>当前剩余时间：&nbsp;&nbsp;&nbsp;&nbsp;{{ remainDay }}天</span>
        </p>
        <p style="padding-left: 48px">
          <span>是否提醒：</span>
          <i-switch size="large" v-model="switch1" style="margin-left: 14px">
            <span slot="open" style="color: #fff">开启</span>
            <span slot="close" style="color: #fff">关闭</span>
          </i-switch>
        </p>
        <p v-if="type === 2 || type === 1 || type === 4">
          <span>剩余提醒次数：&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <InputNumber
            v-model="balanceWarnNo"
            :disabled="!switch1"
            :min="1"
          ></InputNumber>
          <span>&nbsp;&nbsp;次</span>
        </p>
        <p v-if="type === 3">
          <span>剩余提醒时间：&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <InputNumber
            v-model="balanceWarnNo"
            :disabled="!switch1"
            :min="1"
          ></InputNumber>
          <span>&nbsp;&nbsp;天</span>
        </p>
        <div style="padding-left: 48px; display: flex">
          <span style="line-height: 60px; color: #000; font-size: 14px"
          >通知人员：</span
          >
          <span style="margin-left: 20px; height: auto; width: 80%">
            <CheckboxGroup
              v-model="checkbox"
              style="width: 100%; height: auto; line-height: 60px; float: left"
            >
              <Checkbox
                :label="User.user.id"
                v-for="(User, userIndex) in tipsMember"
                :key="userIndex"
                style="
                  width: 150px;
                  height: 60px;
                  margin-right: 20px;
                  position: relative;
                "
              >
                <img
                  :src="User.user.photo"
                  alt
                  style="
                    width: 40px;
                    height: 40px;
                    border-radius: 25px;
                    margin-left: 5px;
                    position: absolute;
                    bottom: 10px;
                  "
                />
                <span
                  style="margin-left: 53px; color: #333333; font-size: 14px"
                >{{ User.user.nickname }}</span
                >
              </Checkbox>
            </CheckboxGroup>
          </span>
        </div>
      </div>
      <div class="balance_btn">
        <Button
          @click="renew"
          style="
            width: 100px;
            height: 40px;
            font-size: 14px;
            background-color: #18c1d6;
            color: #fff;
            margin-top: 40px;
          "
        >续费
        </Button>
      </div>
    </div>
    <div class="btn">
      <Button @click="updateBalanceRemind" style="
          width: 100px;
          height: 40px;
          font-size: 14px;
          background-color: #18c1d6;
          color: #fff;
          margin-left: 120px;
          margin-top: 10px;
        ">保存设置
      </Button>
    </div>
    <div class="ea-warnBox">
      <p>备注：</p>
      <p>1、单击"开启"或"关闭" 控件改变提醒状态</p>
      <p>2、单击 进入编辑模式，更改余额提醒上限</p>
      <p>3、单击添加提醒列表</p>
      <p>4、单击提醒列表中 按钮删除该联系人</p>
      <p>5、请注意： 提醒方式和提醒列表是账户共享设置</p>
    </div>
  </div>
</template>

<script>
import {
  updateBalanceRemind,
  getBalanceRemind,
  getBalanceRemindList,
} from "../../api/api";
import {getServiceUserList} from "../../api/user-service";

export default {
  name: "SettingBalance",
  props: [
    "judgmentUnit",
    "balance",
    "remainDay",
    "type",
    "serviceId",
    "name",
    "teamServiceId",
    "openRenewDialog",
    "dialog",
  ],
  data() {
    return {
      switch1: "", //提醒开关
      balanceWarnNo: 0,
      checkbox: [],
      tipsMember: [],
    };
  },
  watch: {
    dialog(val) {
      if (val) {
        this.getBalanceRemind();
        this.getBalanceRemindList();
        this.getServiceUserList();
      }
    },
  },
  methods: {
    //余额提醒上限
    getBalanceRemind() {
      getBalanceRemind(this.serviceId).then((res) => {
        if (res.data.code === 0) {
          this.switch1 = false;
        } else {
          this.switch1 = true;
          this.balanceWarnNo = res.data.content.count;
        }
      }).catch((error) => {
        this.$Message.warning(error.data.message);
      });
    },
    //修改余额提醒设置
    updateBalanceRemind() {
      let data = {
        remindUserIds: this.checkbox.join(","),
        ifRemind: this.switch1,
        serviceId: this.serviceId,
        count: this.balanceWarnNo,
      };
      updateBalanceRemind(data).then((res) => {
        this.$Message.success(res.data.message);
      }).catch((error) => {
        this.$Message.error(error.response.data.message);
      });
    },
    //提示人员
    getBalanceRemindList() {
      let params = {
        serviceId: this.serviceId,
      };
      getBalanceRemindList(params).then((res) => {
        this.selectedPersonnel = res.data.content;
        let code = res.data.code;
        if (code !== 0) {
          for (let i = 0; i < this.selectedPersonnel.length; i++) {
            this.checkbox[i] = this.selectedPersonnel[i].remindUser.id;
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    //余额提醒成员列表
    getServiceUserList() {
      let params = {
        size: 100,
        types: "创建人,管理员",
      };
      getServiceUserList(this.serviceId, params).then((res) => {
        this.tipsMember = res.data.content;
      }).catch((error) => {
        console.log(error);
      });
    },
    //续费跳转页面
    renew() {
      let num;
      if (this.type === 2) {
        num = this.balance;
      } else if (this.type === 3) {
        num = this.remainDay;
      }
      let url = `https://team.easyapi.com/renew/service?teamServiceId=${this.teamServiceId}`;
      let a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.click();
      this.openRenewDialog();
    },
  },
  created() {
    this.getBalanceRemind();
    this.getBalanceRemindList();
    this.getServiceUserList();
  },
};
</script>
<style lang="stylus">
.secret_balance {
  width: 100%;
  height: auto;
  display: flex;
}

.secret_balance .balance_remind {
  width: 80%;
  height: auto;
}

.secret_balance .balance_remind p {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}

.secret_balance .balance_remind p span {
  color: #000000;
  font-size: 14px;
}

.balance_btn {
  width: 20%;
  height: auto;
}

.btn {
  width: 100%;
  height: 60px;
}

.ea-warnBox {
  width: 100%;
  height: auto;
  padding-left: 130px;
}

.ea-warnBox p {
  color: #999999;
  font-size: 14px;
}
</style>
