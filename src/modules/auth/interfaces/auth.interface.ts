export interface AuthInfo {
    userId: number;
    role: string;
}

export interface JwtAccessTokenClaims {
    userId: string;
    role: string;
}
