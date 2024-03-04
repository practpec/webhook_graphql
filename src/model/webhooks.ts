import { Schema, Model, model, Document } from 'mongoose'

export interface IWebhook extends Document {
    url: string;
    events: string[];
}

const WebhookSchema: Schema = new Schema({
    url: { type: String, required: true },
    events: [{ type: String, required: true }],
})

export const Webhook: Model<IWebhook> = model<IWebhook>('Webhook', WebhookSchema);