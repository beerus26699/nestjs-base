export interface AuthInfo {
    userId: number;
    role: string;
}

export interface JwtAccessTokenClaims {
    userId: number;
    role: string;
}
