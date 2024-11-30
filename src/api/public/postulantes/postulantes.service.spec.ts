import { Test, TestingModule } from '@nestjs/testing';
import { PostulantesService } from './postulantes.service';

describe('PostulantesService', () => {
  let service: PostulantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostulantesService],
    }).compile();

    service = module.get<PostulantesService>(PostulantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
