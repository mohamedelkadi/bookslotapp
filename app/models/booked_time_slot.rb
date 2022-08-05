class BookedTimeSlot


  attr_reader :id, :end_time, :start_time

  def time_gap_to(next_slot)
    end_time - next_slot.start_time
  end

  def gap_from_beginning_of_day
    start_time.beginning_of_day - start_time
  end
end