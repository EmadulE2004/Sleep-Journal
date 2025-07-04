import AppleHealthKit from 'react-native-health';

const permission = {
    permission: {
        read: [AppleHealthKit.Constants.Permissions.SleepAnalysis]
    }
};

export const initHealthKit = () => {
    return new Promise((resolve, reject) => {
        AppleHealthKit.initHealthKit(permission, (error) => {
            if(error) {
                return reject (error);
            }
            resolve();
        });
    });
}

export const getSleepSamples = () => {
    return new Promise((resolve, reject) => {
        const now = new Date();
        const year = new Date();

        year.setFullYear(now.getFullYear() - 1);

        const option = {
            startDate: year.toISOString(),
            endDate: now.toISOString()
        }

        AppleHealthKit.getSleepSamples(option, (error, result) => {
            if(error) {
                return reject (error);
            }
            resolve(result);
        });
    });
}