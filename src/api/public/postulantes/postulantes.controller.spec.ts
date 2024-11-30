import { Test, TestingModule } from '@nestjs/testing';
import { PostulantesController } from './postulantes.controller';

describe('PostulantesController', () => {
  let controller: PostulantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostulantesController],
    }).compile();

    controller = module.get<PostulantesController>(PostulantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
