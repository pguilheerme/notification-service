import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "./err/notification-not-found"
import { MakeNotification } from "@test/factories/notification-factory"
import { UnreadNotification } from "./unread-notifications"


describe('Unread Notification', () => {
    it('should be able to unread a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotification = new UnreadNotification(notificationsRepository)

        const notification = MakeNotification({
            readAt: new Date()
        })

        await notificationsRepository.create(notification)

        await unreadNotification.execute({
            notificationId: notification.id,
        })

        
        expect(notificationsRepository.notifications[0].readAt).toBeNull()
    })

    it('should not be able to read a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotification = new UnreadNotification(notificationsRepository)

        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})