class TopicsController < ApplicationController
  before_action :set_topic, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /topics
  def index
    @topics = Topic.select("id").all

    render json: @topics.to_json
  end

  # GET /topics/1
  def show
    render json: @topic.to_json(include: :questions)
  end

  # POST /topics
  def create
    @topic = Topic.new(topic_params)

    if @topic.save
      render json: @topic.to_json(include: :questions), status: :created, location: @topic
    else
      render json: @topic.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /topics/1
  def update
    if @topic.update(topic_params)
      render json: @topic
    else
      render json: @topic.errors, status: :unprocessable_entity
    end
  end

  # DELETE /topics/1
  def destroy
    @topic.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_topic
      @topic = Topic.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def topic_params
      params.require(:topic).permit(:title, :description, :archived)
    end
end
