json.success true
json.message nil
json.data @products.each do |product|
  json.merge! product.attributes
  json.image_url url_for(product.image)
end