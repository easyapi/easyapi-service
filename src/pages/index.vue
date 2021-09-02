<template>
  <div class="mainPage">
    <div class="mainPage-title">
      <span>{{ teamName }}</span>
    </div>
    <div class="row">
      <div
        style="
          width: 100%;
          height: 50px;
          line-height: 30px;
          margin-top: 30px;
          border-bottom: 1px solid#e2e2e2;
          margin-bottom: 20px;
        "
      >
        <span
          :class="{ colour: serviceCategory === '' }"
          @click="switchService('')"
          style="font-size: 18px; color: #999999; cursor: pointer"
          >全部</span
        >
        <span
          :class="{ colour: serviceCategory === 1 }"
          @click="switchService(1)"
          style="
            font-size: 18px;
            color: #999999;
            margin-left: 45px;
            cursor: pointer;
          "
          >接口服务</span
        >
        <span
          :class="{ colour: serviceCategory === 2 }"
          @click="switchService(2)"
          style="
            font-size: 18px;
            color: #999999;
            margin-left: 45px;
            cursor: pointer;
          "
          >场景服务</span
        >
        <span
          :class="{ colour: serviceCategory === 3 }"
          @click="switchService(3)"
          style="
            font-size: 18px;
            color: #999999;
            margin-left: 45px;
            cursor: pointer;
          "
          >数据服务</span
        >
      </div>
      <service-item :serviceCategory="serviceCategory"></service-item>
      <div class="configure">
        <p class="configure_p">
          <strong>配置</strong>
        </p>
        <div class="configure_box" @click="jumpPage">
          <span class="configure_box_icon">
            <img src="https://qiniu.easyapi.com/market/ip.png" alt />
          </span>
          <strong
            style="
              font-size: 16px;
              color: #333333;
              text-align: center;
              display: block;
              height: 40px;
            "
            >IP白名单</strong
          >
        </div>
      </div>
    </div>
    <Modal
      title="温馨提示"
      :closable="false"
      v-model="establish"
      :mask-closable="false"
      @on-ok="goto"
      ok-text="创建团队"
      cancel-text="取 消"
    >
      <p>暂无团队信息，请前往创建团队或加入团队。</p>
    </Modal>

    <Modal
      title="温馨提示"
      :closable="false"
      v-model="ifCreateSuccess"
      :mask-closable="false"
    >
      <p>是否成功创建团队？</p>
      <div slot="footer">
        <Button type="primary" @click="sure">已创建成功</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import ServiceItem from "./moudles/item";
import { mapGetters } from "vuex";

export default {
  components: { ServiceItem },
  data() {
    return {
      serviceCategory: "",
      establish: false,
      ifCreateSuccess: false,
    };
  },
  methods: {
    /**
     * 跳转到白名单页面
     */
    jumpPage() {
      this.$router.push({ path: "/white-list" });
    },

    /**
     * 切换服务列表
     */
    switchService(serviceCategory) {
      this.serviceCategory = serviceCategory;
    },

    /**
     * 跳转创建团队
     */
    goto() {
      window.open("https://team.easyapi.com/new", "_blank");
      this.ifCreateSuccess = true;
    },

    sure() {
      location.reload();
    },
  },
  mounted() {
    document.title = "服务中心 - EasyAPI";
  },
  watch: {
    "$store.getters.teamList"(val) {
      if (val.length == 0) {
        this.establish = true;
      }
    },
  },
  computed: {
    ...mapGetters(["photo", "team", "teamName", "teamImg", "teamList"]),
  },
};
</script>
<style>
.row .ivu-tabs-bar {
  height: 100px;
  margin: 0px;
}

.row .ivu-tabs-mini .ivu-tabs-nav-container {
  padding-top: 60px;
  height: 100px;
}

.row .ivu-tabs-tab {
  width: 100px;
  font-size: 16px;
  text-align: center;
}

.row .ivu-tabs-ink-bar {
  background-color: #fff;
}
</style>
<style scoped>
.mainPage {
  width: 100%;
  height: auto;
}

.mainPage .mainPage-title {
  width: 100%;
  height: 80px;
  background-color: #ecf1f5;
}

.mainPage .mainPage-title span {
  width: 1200px;
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
  font-size: 18px;
  display: block;
  color: #333333;
}

.row {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}

.configure {
  width: 100%;
  height: auto;
  margin-bottom: 50px;
}

.configure .configure_p {
  width: 100%;
  height: 50px;
  font-size: 18px;
  line-height: 50px;
  color: #333333;
  margin-top: 40px;
  border-bottom: 1px solid #e2e2e2;
}

.configure .configure_box {
  width: 275px;
  height: 235px;
  background-color: #ffffff;
  border: solid 1px #e4e4e4;
  cursor: pointer;
  margin-top: 40px;
}

.configure .configure_box:hover {
  box-shadow: 0px 2px 7px 0px rgba(1, 1, 1, 0.1);
}

.configure .configure_box .configure_box_icon {
  display: block;
  width: 100%;
  padding-top: 60px;
  height: 175px;
  text-align: center;
}

.colour {
  color: #1ac1d6 !important;
}
</style>
