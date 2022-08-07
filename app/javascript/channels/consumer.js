// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `bin/rails generate channel` command.

import { createConsumer } from "@rails/actioncable"
const apiUrl = process.env.NODE_ENV === 'production' ? 'https://slot-booking-2022.herokuapp.com/' : 'http://localhost:3000/'

export const consumer = createConsumer(`${apiUrl}/cable`)


