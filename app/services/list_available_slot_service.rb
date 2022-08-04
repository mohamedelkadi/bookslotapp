class ListAvailableSlotService

  def initialize(booked_slots:, duration:)
    @booked_slots = booked_slots
    @duration = duration
  end

  def call
    res = []

    sorted_booked_slots.each_with_index do |slot, i|

     if i.zero?
       prev, current = beginning_of_day, slot[:start]

       if ((current - prev) / 60) >= duration
         res << [prev, current]
       end
     end

      if sorted_booked_slots[i + 1].nil?
        prev, current = slot[:end], end_of_day
      else
        prev, current = slot[:end], sorted_booked_slots[i + 1][:start]
      end

      if ((current - prev) / 60) >= duration
        res << [prev, current]
      end
    end

    res
  end

  private

  def beginning_of_day
    @beginning_of_day ||= sorted_booked_slots.first[:start].beginning_of_day
  end

  def end_of_day
    @end_of_day ||= sorted_booked_slots.first[:start].end_of_day
  end

  def sorted_booked_slots
    @sorted_booked_slots = booked_slots_datetime.sort_by { |slot| slot[:start] }
  end

  def booked_slots_datetime
    @booked_slots_datetime = booked_slots.map do |slot|
      { id: slot[:id],
        start: slot[:start].to_time,
        end: slot[:end].to_time
      }
    end
  end

  attr_reader :booked_slots, :duration
end