import Cookies from "js-cookie";
import { getAccount } from "@/api/account";

const user = {
  state: {
    accountInfo: "",
    userId: "",
    username: "",
    nickname: "",
    photo: "",
    mobile: "",
    email: "",
    team: "",
    teamName: "",
    teamImg: "",
    userTeam: "",
    token: Cookies.get("authenticationToken")
  },

  mutations: {
    SET_ACCOUNT_INFO: (state, accountInfo) => {
      state.accountInfo = accountInfo;
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname;
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo;
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_TEAM: (state, team) => {
      state.team = team;
    },
    SET_TEAM_NAME: (state, teamName) => {
      state.teamName = teamName;
    },
    SET_TEAM_IMG: (state, teamImg) => {
      state.teamImg = teamImg;
    },
    SET_USER_TEAM: (state, userTeam) => {
      state.userTeam = userTeam;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },

  actions: {
    /**
     * 获取用户信息
     */
    getUserInfo({ commit }) {
      getAccount().then(res => {
        let user = res.data.content;
        commit("SET_ACCOUNT_INFO", user);
        commit("SET_USER_ID", user.id);
        commit("SET_USERNAME", user.username);
        commit("SET_NICKNAME", user.nickname);
        commit("SET_PHOTO", user.photo);
        commit("SET_MOBILE", user.mobile);
        commit("SET_EMAIL", user.email);
        if (user.team) {
          commit("SET_TEAM", user.team);
          commit("SET_TEAM_NAME", user.team.name);
          commit("SET_TEAM_IMG", user.team.img);
        }
        commit("SET_USER_TEAM", user.userTeam);
      }).catch(error => {
      });
    }
  }
};

export default user;
