class Api::V1::UsersController < ApplicationController
  before_action :check_user, only: :create

  def create
    email = encrypt_value(user_params[:email])
    password = encrypt_value(user_params[:password])
    user = User.new(email: email, password: password)
    if user.save
      return_success_formatted_json(nil, user)
    else
      return_error_formatted_json('Something is wrong', user.errors)
    end
  end

  def login
    email = encrypt_value(user_params[:email])
    password = encrypt_value(user_params[:password])
    puts "user_params[:email]____#{user_params[:password]}"
    user = User.find_by(email: email, password: password)
    if user.present?
      return_success_formatted_json(nil, user)
    else
      return_error_formatted_json('Do not match credentials.', nil)
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def check_user
    @user = User.find_by(email: encrypt_value(user_params[:email]))
    return_error_formatted_json('User is already exist', nil) if @user.present?
  end

  def encrypt_value(value)
    value.tr(ALPHABET, ENCODING)
  end

  def decrypt_value(value)
    value.tr(ENCODING, ALPHABET)
  end
end
