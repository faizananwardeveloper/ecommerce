class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name
      t.float :price
      t.bigint :quantity

      t.timestamps
    end
  end
end
