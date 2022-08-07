class BookSlotService
  def initialize(book_params)
    @book_params = book_params
  end

  def call
    return [true, nil, nil] if conflict?

    slot_id = SecureRandom.uuid

    $mem_storage[day] ||= []

    $mem_storage[day] << { id: slot_id.to_s, start: start_t.to_s, end: end_t.to_s }.with_indifferent_access

    [false, slot_id, day]
  end

  private

  def conflict?
    @conflict ||= $mem_storage[day].any? do |slot|
      new_ss, new_se = start_t.to_time, end_t.to_time
      ss, se = slot[:start].to_time, slot[:end].to_time

      inner_between?(new_se, ss, se) || inner_between?(new_ss, ss, se) || se == new_se || new_ss == ss
    end
  end

  attr_reader :book_params

  def slot
    @slot ||= book_params['slot']
  end

  def end_t
    start_t + duration
  end

  def start_t
    @start_at ||= Time.parse "#{day} #{slot}"
  end

  def end_at
    @end_at ||= start_t + duration
  end

  def duration
    @duration ||= book_params['duration'].to_i.minutes
  end

  def inner_between?(time, range_s, range_end)
    time.between?(range_s + 1.minute, range_end - 1.minute)
  end

  def day
    @day ||= book_params['day']&.to_date.to_s
  end
end