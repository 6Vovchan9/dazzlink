export interface AdminData {
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface FbAuthResponse {
    idToken: string;
    expiresIn: string;
}

export type AuthorData = {
    name?: string,
    photo?: string,
    profession?: string,
    linkTo?: string,
}

export interface Post {
    id?: string;
    title: string;
    html?: string;
    author?: AuthorData | string;
    published: Date;
    viewCount?: number;
    likeCount?: number;
    dislikeCount?: number;
    imageUrl?: string;
}

export interface VisitsAmount {
    amount: number;
}

export interface FbCreateResponse {
    name: string;
}