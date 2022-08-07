class TimeRangeToSlotsService
  def initialize(range, duration, step: 15.minutes)
    @range = range
    @step = step
    @duration = duration
  end

  def call
    slots = []
    return [] if too_short_range?
    time = range_start
    while time <= range_end do
      slots << time.strftime('%H:%M')
      time += step
    end

    slots
  end

  private

  def range_start
    @range_start ||= range.first
  end

  def range_end
    @range_end ||= range.last - duration.minutes
  end

  def too_short_range?
    (range_end - range_start).negative?
  end

  attr_reader :range, :step, :duration

end