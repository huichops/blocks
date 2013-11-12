require 'sinatra'

configure do
  set :public_folder, '.'
  set :styles_folder, '.'
end

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/test' do
  "Hola mundo"
end
