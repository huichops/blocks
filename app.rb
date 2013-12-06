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
    set :public_folder, '.'
    set :styles_folder, '.'
end

get '/' do
    send_file File.join(settings.public_folder, 'index.html')
end

get '/test/:test' do
    compila params[:test] 
    #params[:test]
end

