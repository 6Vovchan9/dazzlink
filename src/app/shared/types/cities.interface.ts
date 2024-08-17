import { IImageInfo } from "./image.interface";

export interface ICity {
    title: string,
    code: string,
    count: number,
    imageList?: Array<IImageInfo>
}