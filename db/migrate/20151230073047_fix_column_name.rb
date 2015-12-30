class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :interests, :user, :user_id
  end
end
