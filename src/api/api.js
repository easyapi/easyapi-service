
import axios from "../utils/request";

/**
 * 获取我的余额提醒
 **
 * @see https://www.easyai.com
 */
export const getBalanceRemind = (serviceId) => axios.get(`${process.env.VUE_APP_SERVICE_API}/console/balanceRemind/team/${serviceId}`);

/**
 * 获取余额提醒列表
 **
 * @see https://www.easyai.com
 */
export const getBalanceRemindList = (params) => axios.get(`${process.env.VUE_APP_SERVICE_API}/console/balanceRemind`, { params: params });


/**
 * 修改余额提醒设置
 **
 * @see https://www.easyai.com
 */
export const updateBalanceRemind = (data) => axios.put(`${process.env.VUE_APP_SERVICE_API}/console/balance-remind`, data);

/**
 * 获取每日统计
 **
 * @see https://www.easyai.com
 */
export const getServiceEveryday = (params) => axios.get(`${process.env.VUE_APP_SERVICE_API}/console/service-everydays`, { params: params });
