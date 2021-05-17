
import axios from "../utils/request";


/**
 * 获取我的服务
 **
 * @see https://www.easyai.com
 */
export const getUserServiceList = (params) => axios.get(`${process.env.VUE_APP_SERVICE_API}/console/user/services`, { params: params });


/**
 * 获取未加入服务的团队成员列表
 **
 * @see https://www.easyai.com
 */
export const getUnJoinUserList = (serviceId) => axios.get(`${process.env.VUE_APP_SERVICE_API}/console/service/${serviceId}/unJoinUsers`, { params: serviceId });


/**
 * 获取当前团队服务所有的用户列表
 **
 * @see https://www.easyai.com
 */
export const getServiceUserList = (serviceId, params) => axios.get(`${process.env.VUE_APP_SERVICE_API}/console/service/${serviceId}/users`, { params: params });


/**
 * 添加服务成员
 **
 * @see https://www.easyai.com
 */
export const createUserService = (data) => axios.post(`${process.env.VUE_APP_SERVICE_API}/console/user-service`, data);


/**
 * 删除服务成员
 **
 * @see https://www.easyai.com
 */
export const deleteUserService = (id) => axios.delete(`${process.env.VUE_APP_SERVICE_API}/console/user-service/${id}`, { params: id });
