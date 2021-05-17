
import axios from "../utils/request";

/**
 * 获取我的白名单
 **
 * @see https://www.easyai.com
 */
export const getWhiteList = () => axios.get(`${process.env.VUE_APP_SERVICE_API}/console/whiteList/check`);

/**
 * 修改白名单设置
 **
 * @see https://www.easyai.com
 */
export const updateWhiteList = (data) => axios.put(`${process.env.VUE_APP_SERVICE_API}/console/whiteList`, data);
