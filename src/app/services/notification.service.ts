import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {
    this.requestPermission();
  }

  /**
   * Demande la permission de l'utilisateur pour les notifications locales.
   */
  async requestPermission() {
    const result = await LocalNotifications.requestPermissions();
    if (result.display === 'granted') {
      console.log('Permission pour les notifications accordée');
    } else {
      console.error('Permission pour les notifications refusée');
    }
  }

  async scheduleNotification(
    title: string,
    body: string,
    delayInSeconds: number
  ) {
    const scheduledTime = new Date(Date.now() + delayInSeconds * 500);

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title,
          body,
          schedule: { at: scheduledTime },
        },
      ],
    });

    console.log(
      `Notification programmée avec succès : "${title}" dans ${delayInSeconds} secondes.`
    );
  }
}
