task add_product: :environment do
  computer = Product.create(name: "Computer", price: 1000, quantity: 10)
  computer.image.attach(io: File.open(Rails.root.join("app", "assets", "images", "product1.jpg")), filename: 'product1')

  ios_watch = Product.create(name: "iOS Watch", price: 5000.50, quantity: 10)
  ios_watch.image.attach(io: File.open(Rails.root.join("app", "assets", "images", "product2.jpg")), filename: 'product2')

  macbook_pro = Product.create(name: "Macbook Pro", price: 1500.99, quantity: 10)
  macbook_pro.image.attach(io: File.open(Rails.root.join("app", "assets", "images", "product3.jpg")), filename: 'product3')

  mobile = Product.create(name: "Mobile", price: 1000.50, quantity: 10)
  mobile.image.attach(io: File.open(Rails.root.join("app", "assets", "images", "product4.jpg")), filename: 'product4')

  television = Product.create(name: "Television", price: 5000, quantity: 10)
  television.image.attach(io: File.open(Rails.root.join("app", "assets", "images", "product5.jpg")), filename: 'product5')
end