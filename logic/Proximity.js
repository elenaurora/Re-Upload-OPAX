
const LOGTAG = "Proximity";

const beacon2TagId = (beacon) => beacon.major * 10000 + beacon.minor;
const tagId2Major = (tagId) => Math.floor(tagId / 10000);
const tagId2Minor = (tagId) => tagId % 10000;

const Beacon = class BeaconClass {

    constructor(timestamp, address, uuid, major, minor, rssi) {
        this.timestamp = timestamp;
        this.address = address;
        this.uuid = uuid;
        this.major = major;
        this.minor = minor;
        this.rssi = rssi;
    }
};

const getProximity = (beacons) => {

    // Log input beacons
    console.log(LOGTAG + " beacons=" + JSON.stringify(beacons));
    console.log(LOGTAG + " beaconCount=" + beacons.length);

    // Get list of unique tag ids
    const uniqueTagIds = [...new Set(beacons.map(beacon => beacon2TagId(beacon)))];
    console.log(LOGTAG + " uniqueTagIds=" + JSON.stringify(uniqueTagIds));

    // Array to store results
    let results = [];

    // For each unique tag id
    uniqueTagIds.forEach(tagId => {

        // Extract list of RSSI values from beacons with current tag id
        const rssiValues = beacons.
            filter(b => beacon2TagId(b) == tagId).
            map(b => b.rssi);

        // Sort RSSI values
        rssiValues.sort();

        // Claculate median RSSI value
        const middleIndex = Math.ceil(rssiValues.length / 2);
        const median = (rssiValues.length % 2 == 0) 
            ? (rssiValues[middleIndex] + rssiValues[middleIndex - 1]) / 2 
            : rssiValues[middleIndex - 1];

        // Save major/minor and median RSSI value            
        const result = { major: tagId2Major(tagId), minor: tagId2Minor(tagId), medianRssi: median };
        results.push(result);
        console.log(LOGTAG + " result: " + JSON.stringify(result));
    });

    // Sort with descending median RSSI values
    results.sort((a, b) => b.medianRssi - a.medianRssi);
    console.log(LOGTAG + " sorted results: " + JSON.stringify(results));

    return results;
};

export default {
    Beacon,
    getProximity
}