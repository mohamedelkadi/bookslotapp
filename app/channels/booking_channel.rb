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
              day = data['day']&.to_date.to_s
              duration = data['duration'].to_i.minutes

              slot_id = SecureRandom.uuid
              start_t = Time.parse "#{day} 12:00"
              end_t = start_t + duration

              $mem_storage[day] ||= []
              $mem_storage[day] << { id: slot_id.to_s, start: start_t.to_s, end: end_t.to_s }
              puts "Memory dumb"
              puts $mem_storage[day]
              puts $mem_storage

              { type: 'book_slot_success', result: { id: slot_id, day: day } }
            else

              nil
            end

    broadcast_to(self, reply)
  end
end