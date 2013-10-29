require './app.rb'
if ENV['RACK_ENV'] == 'production'
  require 'rack-livereload'
  use Rack::LiveReload
end
run Sinatra::Application
