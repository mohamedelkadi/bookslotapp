b_of_today = Time.now.beginning_of_day
duration = 1.hour

$mem_storage = { "#{Date.today.to_s}": [12, 15, 22].map do |h|
  { start: (b_of_today + h.hour).to_s,
    end: (b_of_today + h.hour + duration).to_s,
    id: SecureRandom.uuid
  }
end }.with_indifferent_access

