export interface IAlert {
    type: AlertType;
    text: string
}

export type AlertType = 'success' | 'warning' | 'danger';