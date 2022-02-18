import PushNotification from 'react-native-push-notification';

export const notification = (time, name) => {

    var date = new Date();

    let a = time.split(':')

    let tempdate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), a[0], a[1], 0, 0)


    if (tempdate < date) {
        tempdate = new Date(tempdate.setDate(tempdate.getDate() + 1))
    }

    let namaztime = tempdate.getTime() - date.getTime();

    PushNotification.localNotificationSchedule({
        channelId: "Azan-Notification-Channel",
        title: `${name} Time is near`,
        message: 'Dua for Azan',
        bigText: "Subhanaka Allahumma wabi hamdika wata- bara kasmuka wata'ala jad-duka wala ilaha ghyruka",
        date: new Date(Date.now() + namaztime),
        allowWhileIdle: true,
        repeatTime: 1,
        repeatType: 'day',
        vibrate: true,
        vibration: 1500
    });
}