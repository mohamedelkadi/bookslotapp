import { consumer } from "./consumer"
export const BookingChannel = consumer.subscriptions.create("BookingChannel", {receive: () => {}})
