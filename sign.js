// 使用axios进行HTTP请求
const axios = require('axios');

/**
 * 掘金自动签到函数
 * @param {Object} param0 账号信息
 * @param {string} param0.username 掘金账号
 * @param {string} param0.password 掘金密码
 * @returns {Promise<Object>} 签到结果
 */
async function signJuejin({ username, password }) {
    try {
        // 1. 模拟登录获取token (需要根据掘金实际API调整)
        const loginResponse = await axios.post('https://juejin.cn/login', {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        // 2. 从响应中提取token (示例代码，需根据实际API调整)
        const authToken = loginResponse.data?.token || '';
        
        if (!authToken) {
            throw new Error('登录失败，无法获取token');
        }
        
        // 3. 使用token进行签到
        const signResponse = await axios.post('https://juejin.cn/user/center/signin', {}, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        return {
            success: true,
            data: signResponse.data,
            message: '签到成功'
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
            error: error.response?.data || error.stack
        };
    }
}

// 导出函数供GitHub Actions使用
module.exports = { signJuejin };
