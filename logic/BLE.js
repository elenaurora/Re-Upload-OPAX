import { NativeEventEmitter, Platform } from 'react-native'
import Kontakt, { KontaktModule } from 'react-native-kontaktio';
import Proximity from './Proximity'


const LOGTAG = "BLE";

const kontaktEmitter = new NativeEventEmitter(KontaktModule);

const isAndroid = Platform.OS === 'android';

const startScanning = (options) => {

    console.log(LOGTAG + " startScanning, options=" + JSON.stringify(options) + ", isAndroid=" + isAndroid);
    
    if(isAndroid) { // Android platform
        console.log(LOGTAG + " connect");
        Kontakt.connect(null, [Kontakt.IBEACON]).
            then(() => { 
                console.log(LOGTAG + " configure");
                Kontakt.configure({
                    scanMode:Kontakt.scanMode.LOW_LATENCY,
                
                    scanPeriod: Kontakt.scanPeriod.RANGING,
                    //scanPeriod: scanPeriod.create({activePeriod: 8000, passivePeriod: 2000}),

                    //deviceUpdateCallbackInterval: Kontakt.deviceUpdateCallbackInterval. 2000,
                    
                    //activityCheckConfiguration: activityCheckConfiguration.DISABLED,
                    activityCheckConfiguration: Kontakt.activityCheckConfiguration.create({ 
                        inactivityTimeout: options.inactivityTimeout * 1000, 
                        checkPeriod: 1000 
                    }),
                
                    forceScanConfiguration: Kontakt.forceScanConfiguration.MINIMAL,
                    //forceScanConfiguration: forceScanConfiguration.create({ forceScanActivePeriod: 10000, forceScanPassivePeriod: 0}),

                    monitoringEnabled: Kontakt.monitoringEnabled.FALSE
                });
            }).
            then(() => {
                console.log(LOGTAG + " setBeaconRegion");
                Kontakt.setBeaconRegion({
                        uuid: options.uuid
                });
            }).
            then(() => {
                console.log(LOGTAG + " startScanning");
                Kontakt.startScanning();
            }).
            then(() => {
                console.log(LOGTAG + " register listeners");
                kontaktEmitter.addListener('beaconDidAppear',
                    ({ beacon, region }) => {
                        // console.log(LOGTAG + " beaconDidAppear beacon=" + JSON.stringify(beacon) + ' region=' + 
                        //     JSON.stringify(region));
                        const now = Date.now();
                        const newBeacon = new Proximity.Beacon(now, beacon.address, beacon.uuid, beacon.major, beacon.minor, beacon.rssi);
                        options.appearCallback(newBeacon);
                    }
                );
                kontaktEmitter.addListener('beaconDidDisappear',
                    ({ beacon, region }) => {
                        // console.log(LOGTAG + " beaconDidDisappear beacon=" + JSON.stringify(beacon) + ' region=' + 
                        //     JSON.stringify(region));
                        const now = Date.now();
                        const disBeacon = new Proximity.Beacon(now, beacon.address, beacon.uuid, beacon.major, beacon.minor, beacon.rssi);
                        options.disappearCallback(disBeacon);
                    }
                );
                kontaktEmitter.addListener('beaconsDidUpdate',
                    ({ beacons, region }) => {
                        // console.log(LOGTAG + " beaconsDidUpdate beacons=" + JSON.stringify(beacons) + ' region=' + 
                        //     JSON.stringify(region));
                        const now = Date.now();
                        const updatedBeacons = beacons.map(beacon => 
                            new Proximity.Beacon(now, beacon.address, beacon.uuid, beacon.major, beacon.minor, beacon.rssi));
                        options.updateCallback(updatedBeacons);                        
                    }
                );
            }).
            catch(error => console.error(LOGTAG + ' error ', error));
    }
    else { // iOS platform
        Kontakt.init().
            // then(() => {
            //     console.log(LOGTAG + " configure");
            //     Kontakt.configure({});
            // }).
            then(() => {
                console.log(LOGTAG + " startRanging");
                Kontakt.startRangingBeaconsInRegion({
                    uuid: options.uuid
                });
            }).            
            then(() => {
                console.log(LOGTAG + " register listeners");
                kontaktEmitter.addListener('didRangeBeacons', ({ beacons, region }) => {
                    console.log(LOGTAG + " beaconsDidRange beacons=" + JSON.stringify(beacons) + ' region=' + 
                        JSON.stringify(region));
                    const now = Date.now();
                    const rangedBeacons = beacons.map(beacon => 
                        new Proximity.Beacon(now, beacon.address, beacon.uuid, beacon.major, beacon.minor, beacon.rssi));
                    options.updateCallback(rangedBeacons);
                });
            }).
            catch(error => console.error(LOGTAG + ' error ', error));
    }
}

const stopScanning = (options) => {
    console.log(LOGTAG + " stopScanning, options=" + JSON.stringify(options) + ", isAndroid=" + isAndroid);

    if(isAndroid) { // Android platform
        console.log(LOGTAG + " unregister listeners");
        kontaktEmitter.removeAllListeners('beaconDidAppear');
        kontaktEmitter.removeAllListeners('beaconDidDisappear');
        kontaktEmitter.removeAllListeners('beaconsDidUpdate');

        console.log(LOGTAG + " disconnect");
        Kontakt.disconnect().
            then(() => {
                console.log(LOGTAG + " disconnected");
            }).
            catch(error => console.error(LOGTAG + ' error ', error));
    }
    else { // iOS platform
        console.log(LOGTAG + " unregister listeners");
        kontaktEmitter.removeAllListeners('didRangeBeacons');

        console.log(LOGTAG + " stop ranging");
        Kontakt.stopRangingBeaconsInRegion({
                uuid: options.uuid
            }).
            then(() => {
                console.log(LOGTAG + " stopped ranging");
            }).
            catch(error => console.error(LOGTAG + ' error ', error));
    }
}

export default { 
    startScanning,
    stopScanning
}