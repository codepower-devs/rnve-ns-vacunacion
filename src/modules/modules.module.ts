import { Module } from '@nestjs/common';
import { CatalogueModule } from './catalogue/catalogue.module';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [CatalogueModule, TablesModule],
})
export class ModulesModule {}
