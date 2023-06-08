class StaticPagesController < ActionController::Base
  def frontend_index
    # debugger
    render file: Rails.root.join('public', 'index.html')
  end
end