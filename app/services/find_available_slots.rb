class FindAvailableSlots
  def initialize(day:, duration:)
    @day = day
    @duration = duration
  end

  def call
    available_time_ranges.map do |range|
      TimeRangeToSlotsService.new(range ).call
    end.flatten
  end

  private

  def available_time_ranges
    FindAvailableTimeService.new(booked_slots: $mem_storage[day], duration: duration).call
  end

  attr_reader :day, :duration
end