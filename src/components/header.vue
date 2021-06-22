<template>
  <div class="header ctx-w">
    <div class="h-left clearfix">
      <a href="https://www.easyapi.com">
        <div class="ea-header-item logo">
          <img src="https://qiniu.easyapi.com/icon.png" alt/>
        </div>
      </a>
      <a
        @click.stop="showTeamInfo = !showTeamInfo"
        v-if="team"
        class="ea-header-item"
      >
        {{ team.name }}
        <i v-if="showTeamInfo" class="team-icon icon-arrow-top iconfontt"></i>
        <i v-else class="team-icon icon-xiangxiajiantou iconfontt"></i>
      </a>
      <div ref="showTeamInfo">
        <EaTeam :class="{ active: showTeamInfo }"></EaTeam>
      </div>
      <a class="ea-header-item">
        <router-link to="/" class="txt">API服务中心</router-link>
        <i
          class="icon-dim-xiajiantou-small-copy iconfontt icon-down"
          @click.stop="showModal = !showModal"
        ></i>
      </a>
      <div ref="showModal">
        <div class="modal" :class="{ active: showModal }">
          <div class="modal-content">
            <div>
              <a href="https://doc.easyapi.com/" class="ea-link">
                <img src="https://static.easyapi.com/images/index/ic1.png" alt=""/>
                <p>API文档</p>
              </a>
            </div>
            <div>
              <a href="https://monitor.easyapi.com/" class="ea-link">
                <img src="https://static.easyapi.com/images/index/ic2.png" alt=""/>
                <p>API监控</p>
              </a>
            </div>
            <div>
              <a href="https://gateway.easyapi.com/" class="ea-link">
                <img src="https://static.easyapi.com/images/index/ic3.png" alt=""/>
                <p>API网关</p>
              </a>
            </div>
            <div class="last">
              <a href="https://service.easyapi.com/" class="ea-link">
                <img src="https://static.easyapi.com/images/index/ic4.png" alt=""/>
                <p>API服务</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-right clearfix">
      <div class="fr menu-box">
        <div class="user-avatar">
          <a>
            <img id="showPersonage" :src="photo" alt/>
          </a>
          <div :class="{ active: isActive }" class="ea-DropdownMenu">
            <a href="https://team.easyapi.com/notification" target="_blank"
            >我的通知</a
            >
            <a href="https://team.easyapi.com/user/edit" target="_blank"
            >个人设置</a
            >
            <a
              href="https://account.easyapi.com/logout?from=https://service.easyapi.com"
            >退出</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import EaTeam from "./ea-team/Eateam";

  export default {
    name: "Header",
    components: {
      EaTeam
    },
    data: function() {
      return {
        isActive: false,
        showTeamInfo: false,
        showModal: false,
        teamData: {
          photo: "--",
          name: "--"
        },
        userInfoData: {
          photo: "--",
          name: "--"
        },
        teamListData: ""
      };
    },
    beforeCreate() {
      this.$store.dispatch("getUserInfo");
    },
    mounted() {
      let that = this;
      document.addEventListener("click", function(e) {
        if (!!that.$refs.showTeamInfo.contains(e.target)) {
          that.showTeamInfo = true;
        } else {
          that.showTeamInfo = false;
        }
        if (!!that.$refs.showModal.contains(e.target)) {
          that.showModal = true;
        } else {
          that.showModal = false;
        }
      });
    },

    created: function() {
      let body = document.querySelector("body");
      body.addEventListener(
        "click",
        (e) => {
          if (e.target.id === "showPersonage") {
            this.isActive = !this.isActive;
          } else {
            this.isActive = false;
          }
        },
        false
      );
    },
    computed: {
      ...mapGetters(["photo", "team", "teamName", "teamImg"])
    },
    watch: {},

    methods: {}
  };
</script>

<style lang="stylus">
  .header {
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #1ac1d6;
    font-weight: bold;
    z-index: 888;

    .h-left {
      float: left;
      width: 70%;
    }

    .modal {
      position: absolute;
      top: 50px;
      left 205px;
      padding 30px;
      background: #fff;
      z-index: 1000;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0 0 0, 0.1);
      display none
      &.active {
        display: block;
      }
      .modal-content {
        display flex
        align-items center
        justify-content center
        div {
          line-height 0
          margin-right 30px
          text-align center
        }
        .last {
          margin-right 0
        }
        a {
          color #000;
          font-weight normal
          img {
            width 40px;
            height 40px;
            border-radius 50%
            vertical-align top
          }
          p {
            margin-top 15px
            font-size 12px
          }
        }
      }
    }
    .ea-header-item {
      position: relative;
      float: left;
      height: 50px;
      padding: 0 30px;
      color: #fff;
      border-right: 1px solid darken(#1ac1d6, 5%);
      font-size: 14px;

      .txt {
        font-size: 14px;
        color: #fff;
      }
      .icon-down {
        margin-left 5px;
        &:hover {
          background: #fff;
          color: #1ac1d6;
        }
      }
    }

    .logo {
      padding-left: 0;

      img {
        margin: 10px 0;
        height: 30px;
        width: 30px;
      }
    }

    .h-right {
      float: right;
    }

    .a-item {
      position: relative;
      display: inline-block;
      color: #fff;
      padding: 0 20px;
      line-height: 50px;
      text-decoration: none;

      &.ac {
        background: darken(#1ac1d6, 5%);
      }

      .sub-menu {
        position: absolute;
        display: none;
        top: 50px;
        left: -20px;
        width: 200px;
        background: #fff;
        color: #666;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        z-index: 999;
      }

      .sub-item {
        padding: 0 20px;

        &:hover {
          background: darken(#fff, 3%);
        }
      }

      &:hover {
        background: darken(#1ac1d6, 5%);

        .sub-menu {
          display: inline-block;
        }
      }
    }
  }

  .easyapi-logo {
    height: 50px;
  }

  .menu-box {
    display: inline-block;
    height: 50px;
    position: relative;

    .user-avatar {
      display: inline-block;
      vertical-align: top;

      & > a {
        padding: 0 20px;
        display: inline-block;
        height: 50px;
        padding-top: 9px;
        cursor: pointer;
        position: relative;

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
    }

    .ea-DropdownMenu {
      position: absolute;
      top: 50px;
      right: 0;
      z-index: 100;
      border: 1px solid #eee;
      border-top: none;
      box-shadow: 0px 1px 3px #ddd;
      background-color: #fff;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
      width: 100px;
      display: none;

      &.active {
        display: block;
      }

      a {
        display: block;
        line-height: 26px;
        height: inherit;
        padding-left: 15px;
        color: #777;
        font-weight: normal;

        &:hover {
          background-color: #1ac1d6;
          color: #fff;
        }
      }
    }

    .current-team-box {
      height: 50px;
      display: inline-block;
      position: relative;

      & > a {
        padding: (15px / 2px) 20px;
        height: 50px;
        display: inline-block;

        &.active {
          background-color: #19B7CB;
        }

        &:hover {
          background-color: #19B7CB;
        }

        .team-icon {
          display: inline-block;
          width: 35px;
          height: 35px;
          background: url('../assets/images/team-icon.png') no-repeat;
          background-size: cover;
        }
      }
    }
  }
</style>
