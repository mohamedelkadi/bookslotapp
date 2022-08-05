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
              day = data['day']&.to_date.to_s
              duration = data['duration']['hours'].to_i * 60 + data['duration']['minutes'].to_i
              FindAvailableSlots.new(day: day,
                                     duration: duration).call # return arr eg  %w[8:00 9:00]
            else
              nil
            end

    broadcast_to(self, reply)
  end
end