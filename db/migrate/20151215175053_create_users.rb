class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :gender
      t.string :preferred_gender
      t.string :email
      t.string :image_url
      t.string :bio
      t.string :session_token, null: false
      t.string :password_digest, null: false

      t.timestamps null: false
    end
    add_index :users, [:username, :session_token], unique:true
  end
end
