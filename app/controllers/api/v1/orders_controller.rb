class Api::V1::OrdersController < ApplicationController
  before_action :set_user, only: :create

  def create
    order = @user.orders.create(order_params)
    if order.present?
      return_success_formatted_json(nil, order)
    else
      return_error_formatted_json('Something is wrong', order.errors)
    end
  end

  private

  def set_user
    @user = User.find_by(id: params[:user_id])
    puts "users are #{@user.as_json}"
    return_error_formatted_json('Not found User', nil) unless @user.present?
  end

  def order_params
    params.require(:order).permit(order_items_attributes: [:product_id])
  end
end
