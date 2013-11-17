require 'rubygems'
require 'sinatra'

get '/form' do
	erb :form
end

post '/form' do
	r="#{params[:message]}"
	file = File.new( "test.c", "w" )
	file.write(r)
	file.close
	var = %x[gcc test.c -o salida]
	var = %x[./salida]
end
