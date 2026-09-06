import { HTMLAttributes } from "react";
import { type DropzoneProps } from "react-dropzone"

export interface IAgentCard {
    id: number,
    created_at: number,
    updated_at: number,
    create_by: string,
    name: string,
    tag: number[] | null,
    likes_count: number,
    comment_count: number,
    download_count: number,
    is_like: boolean,
    username: string,
    version?: number,
    description?: string,
    user_photo: string,
    is402: boolean
}


export type CommentType1 = {
    id: number,
    created_at: number,
    updated_at: number,
    create_by: number,
    content: string,
    to_repositories: number,
    root_parent_id: number,
    parent_id: number,
    to_auther: number,
    likes_count: number,
    comment_count: number,
    is_like: boolean,
    username: string,
    user_photo: string,
    children?: CommentType1[]
};


export interface ITopList {
    recently_create: IAgentCard[];
    new_download: IAgentCard[];
    trending_7d: IAgentCard[]
}

export type UploadFile = {
    file: File;
    hash: string;
    progress: number;
    status: 'loading' | 'uploading' | 'done' | 'error';
};

export interface FileUploaderProps extends HTMLAttributes<HTMLDivElement> {

    value?: File[]

    checkReadStatus: (fileLength: number, fileName: string) => void

    onValueChange?: (files: File[]) => void

    onUpload?: (files: File[]) => Promise<void>

    progresses?: Record<string, number>

    accept?: DropzoneProps["accept"]

    maxSize?: DropzoneProps["maxSize"]

    maxFileCount?: DropzoneProps["maxFiles"]

    multiple?: boolean

    disabled?: boolean
}

export type ApiType = {
    create: string;
    list: string;
    like: string;
    unlike: string;
    detail: string;
}