class Message < ActiveRecord::Base
  belongs_to :sent_messages,
  primary_key: :id,
  foreign_key: :sender_id,
  class_name: "User"

  belongs_to :received_messages,
  primary_key: :id,
  foreign_key: :receiver_id,
  class_name: "User"
end
