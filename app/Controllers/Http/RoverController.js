'use strict';

const Rover = use('App/Models/Rover');

class RoverController {
  async explore({ request, response }) {
    try {
      const { upperRightCoordinates, rovers } = request.post();
      const [plateauWidth, plateauHeight] = upperRightCoordinates;

      let finalPositions = {};

      for (const roverData of rovers) {
        try {
          const rover = new Rover();
          rover.fill(roverData);

          const requiredFields = ['x', 'y', 'direction', 'instructions'];
          for (const field of requiredFields) {
            if (!(field in roverData) || roverData[field] === '') {
              throw new Error(`Campo obrigatório ausente: ${field}`);
            }
          }
    
         
          await rover.explore({ width: plateauWidth, height: plateauHeight });
     
          await rover.save();
        
       
          const initialPosition = roverData.initialPosition || rover.initialPosition;
          
          finalPositions = {
            initialPosition: initialPosition,
            finalPosition: rover.finalPosition,
            instructions: roverData.instructions,
          };
        } catch (error) {
          console.error('Erro ao processar o rover:', error.message);
          console.error(error.stack);

          return response.status(400).json({ error: error.message });
        }
      }

      return response.status(201).json(finalPositions);
    } catch (error) {
      console.error('Erro geral ao explorar rovers:', error.message);
      console.error(error.stack);

      return response.status(500).json({ error: 'Erro geral ao explorar rovers.' });
    }
  }
}

module.exports = RoverController;
