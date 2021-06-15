
import axios from "../utils/request";


/**
 * 获取团队与服务关系信息
 **
 * @see https://www.easyai.com
 */
export const getTeamService = (id) => axios.get(`${process.env.VUE_APP_SERVICE_API}/console/team-service/${id}`);

/**
 * 重置应用KEY和密钥
 **
 * @see https://www.easyai.com
 */
export const resetKey = (teamServiceId) => axios.put(`${process.env.VUE_APP_SERVICE_API}/console/team-service/${teamServiceId}/reset-key`);
