import { WebhookEvents } from '../enums';

export interface TelePayResponse {
    success: WebhookEvents,
    message: string
}
