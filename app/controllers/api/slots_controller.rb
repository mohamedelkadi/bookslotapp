module Api
  class SlotsController < ApplicationController
    skip_forgery_protection

    def index
      day = list_params.fetch(:day)&.to_date.to_s
      duration = list_params['duration']['hours'].to_i * 60 + list_params['duration']['minutes'].to_i
      result = FindAvailableSlots.new(day: day,
                                      duration: duration).call

      render json: { slots: result, duration_in_minutes: duration }
    end

    def book
      day = book_params['day']&.to_date.to_s
      duration = book_params['duration'].to_i.minutes
      slot = book_params['slot']

      slot_id = SecureRandom.uuid
      start_t = Time.parse "#{day} #{slot}"
      end_t = start_t + duration

      $mem_storage[day] ||= []
      $mem_storage[day] << { id: slot_id.to_s, start: start_t.to_s, end: end_t.to_s }

      puts "Memory dumb"
      puts $mem_storage[day]
      puts $mem_storage

      render json: { id: slot_id, day: day }
    end

    def list_params
      params.permit([:day, :duration])
    end

    def book_params
      params.permit([:day, :duration, :slot])
    end
  end
end
