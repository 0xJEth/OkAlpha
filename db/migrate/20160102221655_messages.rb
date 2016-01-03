class Messages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :sender_id, null: false
      t.integer :receiver_id, null: false
      t.boolean :read, null: false, default: false
      t.text :body

      t.timestamps null: false
    end
    add_index :messages, [:sender_id, :receiver_id]
  end
end
