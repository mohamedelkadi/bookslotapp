class TimeRangeToSlotsService
  def initialize(range, step: 15.minutes)
    @range = range
    @step = step
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
    @range_end ||= range.last
  end

  def too_short_range?
    (range_end - range_start) < step
  end

  attr_reader :range, :step

end