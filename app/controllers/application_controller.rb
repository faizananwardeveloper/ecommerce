class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token


  protected

  def return_success_formatted_json(message, data)
    render json: {success: true, message: message, data: data} and true
  end

  def return_error_formatted_json(message, data)
    render json: {success: false, message: message, data: data} and false
  end
end
