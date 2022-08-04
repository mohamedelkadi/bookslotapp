require 'rails_helper'

describe 'ListAvailableSlotService' do
  subject { ListAvailableSlotService.new(booked_slots: day_slots, duration: duration).call }

  # helper methods
  def create_day_slot(time_start, time_end)
    { "id": SecureRandom.uuid,
      "start": "#{day}T#{time_start}:00.000Z",
      "end": "#{day}T#{time_end}:00.000Z" }
  end

  let(:duration) { 15 }
  let(:day) { '2022-02-01' }
  let(:day_slots) { [] }

  context 'when no available slots' do

    context 'when all slots are booked' do
      let(:day_slots) do
        [
          create_day_slot('00:00', '12:00'),
          create_day_slot('12:00', '23:59')]
      end

      it { is_expected.to be_empty }
    end

    context 'when requested duration is longer than any slot' do
      let(:day_slots) do
        [
          create_day_slot('00:00', '08:00'),
          create_day_slot('09:00', '15:00'),
          create_day_slot('16:00', '19:00'),
        ]

      end

      let(:duration) { 7.hours.in_minutes }

      it { is_expected.to be_empty }

    end
  end

  context 'when one available range' do
    let(:duration) { 1.hour.in_minutes }

    context 'available range in the middle' do
      let(:day_slots) do
        [
          create_day_slot('00:00', '08:00'),
          create_day_slot('09:30', '15:30'),
          create_day_slot('16:00', '23:00'),
        ]
      end

      it { is_expected.to match_array([["#{day}T08:00:00.000Z".to_time,
                                        "#{day}T09:30:00.000Z".to_time]]) }
    end

    context 'available range in the beginning' do
      let(:day_slots) do
        [
          create_day_slot('02:00', '09:00'),
          create_day_slot('09:30', '15:30'),
          create_day_slot('16:00', '23:30'),
        ]
      end

      it { is_expected.to match_array([["#{day}T00:00:00.000Z".to_time,
                                        "#{day}T02:00:00.000Z".to_time]]) }
    end

    context 'available range in the end' do
      let(:day_slots) do
        [
          create_day_slot('00:00', '09:00'),
          create_day_slot('09:30', '15:30'),
          create_day_slot('16:00', '22:00'),
        ]
      end

      it { is_expected.to match_array([["#{day}T22:00:00.000Z".to_time,
                                        "#{day}T23:59:59.999999999Z".to_time]]) }
    end
  end

  context 'when multiple ranges available' do
    let(:duration) { 45 }

    let(:day_slots) do
      [
        create_day_slot('01:00', '08:00'),
        create_day_slot('09:00', '14:30'),
        create_day_slot('16:00', '23:30'),
      ]
    end

    it { is_expected.to match_array([["#{day}T00:00:00.000Z".to_time,
                                      "#{day}T01:00:00.000Z".to_time],
                                     ["#{day}T08:00:00.000Z".to_time,
                                      "#{day}T09:00:00.000Z".to_time],
                                     ["#{day}T14:30:00.000Z".to_time,
                                      "#{day}T16:00:00.000Z".to_time]
                                    ]) }
  end

end

