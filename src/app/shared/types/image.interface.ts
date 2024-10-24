export enum TImageState {
    Load = 'load',
    Error = 'error',
    Success = 'success'
}

export interface IImageInfo {
    type: string,
    href: string,
    metadata: { imageBase64: string } // for preview
}