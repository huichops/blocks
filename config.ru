require './app.rb'
require 'rack-livereload'
use Rack::LiveReload
run Sinatra::Application
