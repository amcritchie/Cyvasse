class MessagesController < ApplicationController

  def index
    @messages = Message.where(receiver: current_user)
  end

  def create
    p '--=-==-='*20
    @messages = Message.new(
        receiver: params[:user_id],
        message: params[:message],
        match: params[:match_id],
        sender: current_user.id,
        read: false
    )
    p '--=-==-=3333'*20
    p @messages
    p '--=-==-=5555'*20

    if @messages.save
      # flash[:success] = "User Favorited"
    end
    # redirect_to root_path
    render nothing: true
  end

  def destroy
    @messages = Message.where(sender: current_user.id, receiver: params[:user_id])
    @messages.delete_all
    # flash[:error] = "Favorite Removed"
    render nothing: true
  end

end