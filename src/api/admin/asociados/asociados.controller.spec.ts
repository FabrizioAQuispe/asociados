import { Test, TestingModule } from '@nestjs/testing';
import { AsociadosController } from './asociados.controller';

describe('AsociadosController', () => {
  let controller: AsociadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsociadosController],
    }).compile();

    controller = module.get<AsociadosController>(AsociadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
