module Api
  class SlotsController < ApplicationController
    skip_forgery_protection

    def index
      day = list_params.fetch(:day)&.to_date.to_s
      duration = list_params['duration_hours'].to_i * 60 + list_params['duration_minutes'].to_i
      result = FindAvailableSlots.new(day: day,
                                      duration: duration).call

      render json: { slots: result, durationInMinutes: duration }
    end

    def book
      day = book_params['day']&.to_date.to_s
      duration = book_params['duration'].to_i.minutes
      slot = book_params['slot']

      slot_id = SecureRandom.uuid
      start_t = Time.parse "#{day} #{slot}"
      end_t = start_t + duration

      $mem_storage[day] ||= []

      conflict = $mem_storage[day].any? do |slot|
        new_ss, new_se = start_t.to_time, end_t.to_time
        ss, se = slot[:start].to_time, slot[:end].to_time
        inner_between?(new_se ,ss, se) || inner_between?(new_ss ,ss, se) || se == new_se || new_ss == ss
      end

      if conflict
        return render json: { error: 'conflict' }, status: :unprocessable_entity
      end

      $mem_storage[day] << { id: slot_id.to_s, start: start_t.to_s, end: end_t.to_s }.with_indifferent_access

      puts "Memory dumb"
      puts $mem_storage[day]
      puts $mem_storage

      render json: { id: slot_id, day: day }
    end

    def inner_between?(time, range_s, range_end)
      time.between?(range_s + 1.minute, range_end - 1.minute)
    end

    def list_params
      params.permit([:day, :duration_hours, :duration_minutes])
    end

    def book_params
      params.permit([:day, :duration, :slot])
    end
  end
end
