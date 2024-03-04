import { Schema, Model, model, Document } from 'mongoose'

export interface IWebhookEvent extends Document {
    event: string;
    webhookUrl: string;
}

const WebhookEventSchema: Schema = new Schema({
    event: { type: String, required: true },
    webhookUrl: { type: String, required: true },
})

export const WebhookEvent: Model<IWebhookEvent> = model<IWebhookEvent>('WebhookEvent', WebhookEventSchema);