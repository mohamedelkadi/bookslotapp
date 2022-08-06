module Api
  class SlotsController < ApplicationController
    def index
      day = list_params.fetch(:day)&.to_date.to_s
      duration = list_params['duration']['hours'].to_i * 60 + list_params['duration']['minutes'].to_i
      result = FindAvailableSlots.new(day: day,
                                      duration: duration).call

      render json: { slots: result, duration_in_minutes: duration }
    end

    def book
      
    end

    def list_params
      params.permit([:day, :duration])
    end
  end
end
