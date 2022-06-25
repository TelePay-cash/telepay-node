import { WebhookEvents } from '../enums';

export interface Webhook {
    id: number,
    url: string,
    secret: string,
    events: WebhookEvents[],
    active: boolean
}
