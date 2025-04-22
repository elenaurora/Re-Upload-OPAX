import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGTAG = "LocalStorage";

const LocalStorageError = class LocalStorageErrorClass {

    constructor(message) {
        this.message = message;
    }
}
  

const getString = async (propertyName) => {

    console.log(LOGTAG + " getString: " + propertyName);
    try {
        const value = await AsyncStorage.getItem(propertyName);
        console.log(LOGTAG + " getString(" + propertyName + ")=" + value);
        return value;
    } catch(e) {
        throw new LocalStorageError("Error getting string property");
    }
}


const setString = async (propertyName, propertyValue) => {

    console.log(LOGTAG + " setString(" + propertyName + "," + propertyValue + ")");
    try {
        await AsyncStorage.setItem(propertyName, propertyValue);
    } catch(e) {
        throw new LocalStorageError("Error setting string property");
    }
}

const getObject = async (propertyName) => {

    console.log(LOGTAG + " getObject: " + propertyName);
    try {
        const jsonValue = await AsyncStorage.getItem(propertyName)
        const value = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(LOGTAG + " getObject(" + propertyName + ")=" + jsonValue);
        return value;
    } catch(e) {
        throw new LocalStorageError("Error getting object property");
    }
}


const setObject = async (propertyName, propertyValue) => {

    console.log(LOGTAG + " setObject(" + propertyName + "," + propertyValue + ")");
    try {
        const jsonValue = JSON.stringify(propertyValue)
        await AsyncStorage.setItem(propertyName, jsonValue)
    } catch(e) {
        throw new LocalStorageError("Error setting object property");
    }
}

export default {
    LocalStorageError,
    getString,
    setString,
    getObject,
    setObject
}