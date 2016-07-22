class Api::MessagesController < ApplicationController

  def index
    @messages = Message.all
    render :index
  end

  def create
    @message = Message.create!(message_params)
    render :show
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy
    render :index
  end

  def update
    @message = Message.find(params[:id])
    @message.update_attributes(message_params)
    render :index
  end

  private

  def message_params
    params.require(:message).permit(:sender_id, :receiver_id, :body, :read, :sender_delete, :receiver_delete)
  end
end
