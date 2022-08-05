class FindAvailableSlots
  def initialize(day:, duration:)
    @day = day
    @duration = duration
  end

  def call
    return all_day_slots if no_booked_slots?

    available_time_ranges.map do |range|
      TimeRangeToSlotsService.new(range).call
    end.flatten
  end

  private

  def available_time_ranges
    FindAvailableTimeService.new(booked_slots: $mem_storage[day], duration: duration).call
  end

  def no_booked_slots?
    $mem_storage[day].nil?
  end

  def all_day_slots
    TimeRangeToSlotsService.new(all_day_range).call
  end

  def all_day_range
    [beginning_of_day, end_of_day]
  end

  def beginning_of_day
    @beginning_of_day ||= day.to_time.beginning_of_day
  end

  def end_of_day
    @end_of_day ||= day.to_time.end_of_day
  end

  attr_reader :day, :duration
end