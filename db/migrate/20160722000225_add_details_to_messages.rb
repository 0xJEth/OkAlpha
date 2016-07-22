class AddDetailsToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :sender_delete, :boolean, null: false, default: false
    add_column :messages, :receiver_delete, :boolean, null: false, default: false
  end
end
