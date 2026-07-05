// In-memory rate limiter to prevent spam/abuse
const rateLimitMap = new Map();

export function rateLimit(ip, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  const requestHistory = rateLimitMap.get(ip) || [];
  const requestsInWindow = requestHistory.filter(time => time > windowStart);
  
  if (requestsInWindow.length >= limit) {
    return { success: false, limit, remaining: 0 };
  }
  
  requestsInWindow.push(now);
  rateLimitMap.set(ip, requestsInWindow);
  
  return { 
    success: true, 
    limit, 
    remaining: limit - requestsInWindow.length 
  };
}
