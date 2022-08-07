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
      conflict, slot_id, day = BookSlotService.new(book_params).call

      if conflict
        return render json: { error: 'conflict' }, status: :unprocessable_entity
      end

      render json: { id: slot_id, day: day }
    end

    private

    def list_params
      params.permit([:day, :duration_hours, :duration_minutes])
    end

    def book_params
      params.permit([:day, :duration, :slot])
    end
  end
end
