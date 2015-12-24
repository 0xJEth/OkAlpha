class ImageUrlDefault < ActiveRecord::Migration
  def change
    change_column :users, :image_url, :string, :default => 'http://www.gl-assessment.ie/sites/gl/files/images/1414510022_user-128.png'
  end
end
