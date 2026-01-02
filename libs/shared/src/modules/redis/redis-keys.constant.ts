export const RedisKeys = {
    /**
     * User cache key: auth:user:id:{userId}
     */
    userById: (userId: number) => `user:id:${userId}`,
    userInfo: (userId: number) => `user:info:${userId}`,

    /**
     * User cache key: auth:user:email:{email}
     */
    userByEmail: (email: string) => `user:email:${email}`,

    /**
     * Refresh token cache: auth:token:{tokenHash}
     */
    refreshToken: (tokenHash: string) => `token-refresh-hash:${tokenHash}`,
    exchangeCode: (code: string) => `exchange-code:${code}`,
} as const;
