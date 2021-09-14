
import axios from "../utils/request";


/**
 * 获取用户信息
 **
 * @see https://www.easyapi.com
 */
export const getAccount = () => axios.get(`${process.env.VUE_APP_ACCOUNT_API}/api/account`);

/**
 * 获取用户团队列表
 **
 * @see https://www.easyapi.com
 */
export const getUserTeamList = () => axios.get(`${process.env.VUE_APP_ACCOUNT_API}/api/user/teams`);

/**
 * 切换团队
 *
 * @see https://www.easyapi.com
 */
export const changeTeam = (teamId) => axios.put(`${process.env.VUE_APP_ACCOUNT_API}/api/team/${teamId}/change`);
