class Api::Like < ActiveRecord::Base
  belongs_to :user
  belongs_to :fans,
  primary_key: :id,
  foreign_key: :liked_id,
  class_name: "User"
end
