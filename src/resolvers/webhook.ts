import { Webhook } from "../model/webhooks";
import { WebhookEvent } from "../model/webhookEvent";

interface Args {
    id: string;
    url: string;
    events: string[];
}

export const WebhookResolver = {
    Mutation: {
        addWebhook: async (_: any, args: Args) => {
            try {
                const webhook = await Webhook.findOne({ url: args.url });
                if (webhook) throw new Error('Webhook already exists');
                const newWebhook = await Webhook.create({
                    url: args.url,
                    events: args.events
                })
                for (const event of args.events) {
                    await WebhookEvent.create({ event: event, webhookUrl: args.url });
                }
                return newWebhook;
            } catch (error) {
                throw error;
            }
        },
    }
}