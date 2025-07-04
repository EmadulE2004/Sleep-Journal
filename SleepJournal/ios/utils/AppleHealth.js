import AppleHealthKit from 'react-native-health';

const permission = {
    permission: {
        read: [AppleHealthKit.Constants.Permissions.SleepAnalysis]
    }
};

export const initHealthKit = () => {
    return new Promise((resolve, reject) => {
        AppleHealthKit.initHealthKit(permission, (err) => {
            if(err) {
                return reject (err);
            }
            resolve();
        });
    });
}

