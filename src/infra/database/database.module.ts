import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { NotificationsRepository } from "@application/repositories/notification-repository";
import { PrismaNotificationsRepository } from "./prisma/respositories/prisma-notifications-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: NotificationsRepository,
            useClass: PrismaNotificationsRepository,
        }
    ],
    exports: [NotificationsRepository]
})

export class DatabaseModule {}