import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "./err/notification-not-found"
import { MakeNotification } from "@test/factories/notification-factory"
import { ReadNotification } from "./read-notification"


describe('Read Notification', () => {
    it('should be able to read a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotification = new ReadNotification(notificationsRepository)

        const notification = MakeNotification()

        await notificationsRepository.create(notification)

        await readNotification.execute({
            notificationId: notification.id,
        })

        
        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date))
    })

    it('should not be able to read a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotification = new ReadNotification(notificationsRepository)

        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})