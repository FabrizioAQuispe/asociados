import { Test, TestingModule } from '@nestjs/testing';
import { PedidosComboController } from './pedidos_combo.controller';

describe('PedidosComboController', () => {
  let controller: PedidosComboController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosComboController],
    }).compile();

    controller = module.get<PedidosComboController>(PedidosComboController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
