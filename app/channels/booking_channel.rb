class BookingChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'global'
     puts "hey , subscribed booking channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end