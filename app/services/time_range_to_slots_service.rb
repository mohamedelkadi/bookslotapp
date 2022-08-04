class TimeRangeToSlotsService
  def initialize(range, step: 15.minutes)
    @range = range
  end

  def call
    slots = []
    time = range_start
    while time <= range_end do
      slots << time.strftime('%H:%M')
      time += 15.minutes
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

  attr_reader :range

end