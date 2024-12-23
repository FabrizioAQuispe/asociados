import { Injectable } from '@nestjs/common';
import { EventosDTO, ResponseEvents } from 'src/api/models/EventosDTO';
import { PrismaService } from 'src/api/prisma-service.service';

@Injectable()
export class EventosService {
    constructor(
        private prisma: PrismaService
    ) { }


    async getParametros() {
        try {
            const response = await this.prisma.parametro.findMany({
                select:{
                    cd_parametro : true,
                    descripcion: true,
                    idparametro: true
                }
            });

            return response;
        } catch (error) {
        }
    }

    async getEventoCodigo(cd_event:string){

        try {
            const response = await this.prisma.v_eventos.findFirst({
                where:{
                    cd_event: cd_event.toString()
                },
                include:{
                    parametro: true
                }
            });
            

            return response
        } catch (error) {
            throw new Error('ERROR SERVICE EVENTO CODIGO');
        }
    }


    async getEventos() {
        try {
            const response = await this.prisma.v_eventos.findMany({
                include : {
                    parametro:true
                },

            });


            return response;


        } catch (error) {
            // Proporcionamos el mensaje del error original para facilitar la depuración
            throw new Error(`ERROR GET EVENTOS SERVICE: ${error.message}`);
        }
    }

    async createEventos(eventos: EventosDTO) {
        try {
            //Verificando la fecha de evento
            const hashTodayEvento = await this.prisma.v_eventos.findMany({
                where: {
                    cd_event: {
                        contains: eventos.cd_event
                    }
                }
            })

            let numeroEventos = 1;

            if (hashTodayEvento.length > 0) {
                const numeroEvento = hashTodayEvento[hashTodayEvento.length - 1].cd_event.slice(-1);
                numeroEventos = Number(numeroEvento) + 1;

                const dateIni = new Date();
                const dateFin = new Date();
                const [hoursIni, minutsIni] = eventos.f_event_ini;
                const [hoursFin, minutsFin] = eventos.f_event_fin;

                dateIni.setHours(Number(hoursIni), Number(minutsIni), 0, 0);
                dateFin.setHours(Number(hoursFin), Number(minutsFin), 0, 0);

                /*VERIFICACION DE HORAS*/

                const checkHoures = hashTodayEvento.some((item) => {
                    const eventIni = new Date();
                    const eventFin = new Date();
                    const [hoursEventIni, minutsEventIni] = item.f_event_ini;  // Cambiado a item
                    const [hoursEventFin, minutsEventFin] = item.f_event_fin;  // Cambiado a item

                    eventIni.setHours(Number(hoursEventIni), Number(minutsEventIni), 0, 0);
                    eventFin.setHours(Number(hoursEventFin), Number(minutsEventFin), 0, 0);


                    return (
                        (eventIni <= dateFin && eventFin >= dateIni)  // Si el evento nuevo se solapa
                    );
                });

                if(checkHoures){
                    throw new Error('El horario del evento se solapa con otro evento existente');
                }

                console.log(checkHoures)
            }

            eventos.cd_event = eventos.cd_event + numeroEventos;
            
            
            const response = await this.prisma.v_eventos.create({
                data: eventos,
            })

            if (!response) {
                throw new Error('ERROR CREATE EVENTOS SERVICE');
            }

            return response;
        } catch (error) {
            throw new Error('ERROR TO CREATE EVENT SERVICE' + error.message);
        }
    }

    async updateEventos(ideve: number, eventos: EventosDTO) {
        try {
            const response = await this.prisma.v_eventos.findFirst({
                where: {
                    ideve: Number(ideve)
                }
            })

            if (!response.ideve) {
                throw new Error('ERROR NOT FOUND ID EVENT');
            }

            const result = await this.prisma.v_eventos.update({
                where: {
                    ideve: Number(response.ideve)
                },
                data: eventos
            })

            return result;
        } catch (error) {

        }
    }

    async deleteEventos(idevent: number) {
        try {
            const response = await this.prisma.v_eventos.findFirst({
                where: {
                    ideve: Number(idevent)
                }
            })

            if (!response.ideve) {
                throw new Error('ERROR NOT FOUND ID EVENT');
            }

            const result = await this.prisma.v_eventos.delete({
                where: {
                    ideve: Number(response.ideve)
                }
            })

            return result;

        } catch (error) {
            throw new Error('ERROR DELETE SERVICE' + error.message);
        }
    }
}
