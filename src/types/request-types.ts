export interface IRequestCard {
    id: number;
    created_at: number;
    updated_at: number;
    create_by: string;
    title: string;
    likes_count: number;
    comment_count: number;
    resolve_count: number;
    is_like: boolean;
    username: string;
    user_photo: string;
    is_mobile: boolean
}

export interface IRquestDetail extends IRequestCard {
    content: string
}


export interface IResolveCard {
    id: number;
    created_at: number;
    updated_at: number;
    create_by: string;
    repositories: number;
    request: number;
    likes_count: number;
    is_like: boolean;
    repo_name: string;
    repo_username: string;
    repo_user_photo: string
}

export interface ITopList {
    recently_create: IRequestCard[];
    new_replies: IRequestCard[];
    trending_7d: IRequestCard[]
}