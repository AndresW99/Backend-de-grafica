const BandList = require('./band-list');


class Sockets {

    constructor( io ) {

        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');
        
            // Emitir al cliente conectado, todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands() );

            // votar por la banda
            socket.on('votar-band', ( id ) => {
                this.bandList.increaseVotes( id );
                this.io.emit('current-bands', this.bandList.getBands() );
            });

            // borrar banda
            socket.on('borrar-band', ( id ) => {
                this.bandList.removeBand( id );
                this.io.emit('current-bands', this.bandList.getBands() );
            });

            // cambiar nombre de la banda 
            socket.on('cambiar-nombre-banda', ({ id, nombre }) => {
                this.bandList.changeName( id, nombre );
                this.io.emit('current-bands', this.bandList.getBands() );
            });

            // agregar nueva banda 
            socket.on('crear-banda', ({ nombre }) => {
                this.bandList.addband( nombre );
                this.io.emit('current-bands', this.bandList.getBands() );
            });
        });
    }
}


module.exports = Sockets;