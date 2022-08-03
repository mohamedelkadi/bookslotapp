class DurationService
  def self.call
    (15.minutes .. 6.hours).step(15.minutes).map do |duration|
      hours , minutes_percentage = duration.in_hours.to_s.split('.')
      {'hours': hours.to_i , minutes: (minutes_percentage.to_i * (60.0/100)) }
    end
  end
end