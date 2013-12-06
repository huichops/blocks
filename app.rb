require 'sinatra'

helpers do
    def compila(r)
        file = File.new( "test.c", "w" )
        file.write("#include <stdio.h>̣\n")
        file.write(r)
        file.close
        var = %x[gcc test.c -o salida]
        var = %x[./salida]
    end
end

configure do
    set :styles_folder, '.'
    set :public_foler, './public'
    set :views, './views'
end

get '/' do
    erb :index
end

get '/ejercicio1' do
    @action = '/ejercicio1'
    erb :ejercicio1, :layout => :ejercicio
end

post '/ejercicio1/:code' do
    compila params[:code] 
end

get '/ejercicio2' do
    @action = '/ejercicio2'
    erb :ejercicio2, :layout => :ejercicio
end

post '/ejercicio2/:code' do
    compila params[:code] 
end

get '/ejercicio3' do
    @action = '/ejercicio3'
    erb :ejercicio3, :layout => :ejercicio
end

post '/ejercicio3/:code' do
    compila params[:code] 
end

get '/ejercicio4' do
    @action = '/ejercicio4'
    erb :ejercicio4, :layout => :ejercicio
end

post '/ejercicio4/:code' do
    compila params[:code] 
end

