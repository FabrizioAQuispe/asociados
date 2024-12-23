import { Test, TestingModule } from '@nestjs/testing';
import { PedidosComboService } from './pedidos_combo.service';

describe('PedidosComboService', () => {
  let service: PedidosComboService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosComboService],
    }).compile();

    service = module.get<PedidosComboService>(PedidosComboService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
