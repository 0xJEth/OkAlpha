class CreateInterests < ActiveRecord::Migration
  def change
    create_table :interests do |t|
      t.string :interest, null: false
      t.integer :user, null: false
      t.timestamps null: false
    end
    add_index :interests, [:interest, :user]
  end
end
