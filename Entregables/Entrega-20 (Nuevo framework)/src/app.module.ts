import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { ConfigsModule } from './configs/configs.module';

@Module({
  imports: [ProductsModule, UsersModule, CartsModule, ConfigsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
