# helper methods
def create_day_slot(time_start, time_end)
  { "id": SecureRandom.uuid,
    "start": "#{day}T#{time_start}:00.000Z",
    "end": "#{day}T#{time_end}:00.000Z" }
end

def create_time(day, hours_minutes, seconds= '00')
  "#{day}T#{hours_minutes}:#{seconds}.000Z".to_time
end
