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
    date = data['date']&.to_date
    date&.day < 15 ? broadcast_to(self , %w[8:00 9:00]) : broadcast_to(self , %w[11:00 12:00])
  end
end
