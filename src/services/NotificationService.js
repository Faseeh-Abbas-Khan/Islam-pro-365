import PushNotification from 'react-native-push-notification';
import { notification } from './notification';
export const NotificationSchedule = async (NamazTimings) => {

    PushNotification.cancelAllLocalNotifications();

    var Timing = Object.values(NamazTimings);
    var Name = Object.keys(NamazTimings);

    notification(Timing[2], Name[2]);
    notification(Timing[3], Name[3]);
    notification(Timing[4], Name[4]);
    notification(Timing[6], Name[6]);
    notification(Timing[7], Name[7]);

}