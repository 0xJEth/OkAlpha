class CreateApiLikes < ActiveRecord::Migration
  def change
    create_table :api_likes do |t|
      t.integer :user_id, null: false
      t.integer :liked_id, null: false
      t.timestamps null: false
    end
  end
end
