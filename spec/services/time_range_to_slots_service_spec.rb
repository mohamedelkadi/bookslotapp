require 'rails_helper'

describe TimeRangeToSlotsService do
  subject { described_class.new(range).call }
  let(:day) { '2022-02-01' }
  let(:range) { [] }

  context 'when no remainder time' do
    let(:range) { [create_time(day, '08:00'), create_time(day, '09:00')] }
    it { is_expected.to match_array(%w[08:00 08:15 08:30 08:45 09:00]) }
  end

  context 'when there a  remainder time' do
    let(:range) { [create_time(day, '08:00'), create_time(day, '08:50')] }
    it { is_expected.to match_array(%w[08:00 08:15 08:30 08:45 ]) }
  end


  context 'when range is shorter than the duration' do
    let(:range) { [create_time(day, '08:00'), create_time(day, '08:10')] }
    it { is_expected.to be_empty }
  end
end