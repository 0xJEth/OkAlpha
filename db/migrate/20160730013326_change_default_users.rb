class ChangeDefaultUsers < ActiveRecord::Migration
  def change
    change_column :users, :image_url, :string, :default => 'https://res.cloudinary.com/jolinar1013/image/upload/v1456866249/OkAlpha/jwfs0vwpxfohk7aciiv1.png'
  end
end
