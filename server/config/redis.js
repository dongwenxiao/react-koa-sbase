module.exports = {

    IP: '10.60.82.238',
    PORT: '27017',

	/*
    // 访问速率限制
    ratelimit: {
        // 在间隔时间内，最大访问量
        max: 2500,
        // 间隔时间
        // 毫秒
        duration: 1000,
        // 用ip区分请求，其他值
        // ip|cookie
        id: 'ip',
        // 设置描述header
        headers: {
        	// 剩余访问数量
            remaining: 'X-RateLimit-Remaining',
            // 重置后的时间戳
            reset: 'X-RateLimit-Reset',
            // 允许请求总数
            total: 'X-RateLimit-Limit'
        }
    }*/
}
