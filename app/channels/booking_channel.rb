class BookingChannel < ApplicationCable::Channel
  def subscribed
    stream_for self
     puts "hey , subscribed booking channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts "received: #{data} "

    msg_type = data['type']

    reply = case msg_type
            when 'request_slots'

            when 'book_slot'

            else

              nil
            end

    broadcast_to(self, reply)
  end
end