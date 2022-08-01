import { consumer } from "./consumer"
let subscription = null
export const CreateSubscription = (callback)=>  subscription = subscription || (consumer.subscriptions.create("BookingChannel" , {
    received(data) {
       callback(data)
    }}))
