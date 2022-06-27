import { WebhookEvents } from '../enums';

/**
 * required:
 *  url: string,
 *  secret: string,
 *  events: WebhookEvents[]
 *
 * optional:
 *  active: boolean
 */
export interface WebhookBody {
    url: string,
    secret: string,
    events: WebhookEvents[],
    active?: boolean
}
