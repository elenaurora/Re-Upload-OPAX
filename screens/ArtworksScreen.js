import { SafeAreaView, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import BLE from '../logic/BLE';
import Proximity from '../logic/Proximity'
import BTScanningView from '../components/BTScanningView';
import { appConfig, proximityConfig } from '../config';
import ArtworkTile from '../components/ArtworkTile';
import DeviceInfo from 'react-native-device-info';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import NotificationView from '../components/NotificationView';
import { HeaderView, TiredButton, VIS_Button, HeaderButton, BackButton_b} from '../components/HeaderView';
import LocalStorage from '../logic/LocalStorage';

const ArtworksScreen = ({ route, navigation }) => {

  const LOGTAG = "ArtworksScreen";

  const MIN_RSSI = -200;

  console.log(LOGTAG + ":proximityConfig=" + JSON.stringify(proximityConfig));

  const { documentsFolder, museumData } = route.params;

  const { t, i18n } = useTranslation();

  // Indexes of artworks to show
  const [artworkIndexes, setArtworkIndexes] = useState([]);
  const indexes = useRef([]);

  // console.log(LOGTAG + ":artworks=" + JSON.stringify(museumData.artworks));
  console.log(LOGTAG + ":indexes=" + JSON.stringify(artworkIndexes));

  // Proximity flag (indicates if proximity is to be used)
  const [proximityEnabled, setProximityEnabled] = useState(false);

  // Bluetooth flag (indicates if bluetooth is enabled)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

  // Location flag (indicates if location is enabled)
  const [locationEnabled, setLocationEnabled] = useState(false);

  // Current beacons
  const beacons = useRef([]);

  // Proximity timer
  const proximityTimer = useRef(undefined);

  // State update timer
  const stateUpdateTimer = useRef(undefined);

  // Function invoked in response to request to enable proximity calculations
  const enableProximity = () => {

    console.log(LOGTAG + " enableProximity()");

      // No artworks are available until we scan
      indexes.current = []
      setArtworkIndexes([])

      // Record that proximity is enabled
      LocalStorage.setObject("proximity", { "enabled": true }).then(value => {

          // Update proximity flag
          setProximityEnabled(true);

          if(stateUpdateTimer.current === undefined) {
            // State update timer is not running
    
            // Start state update timer
            stateUpdateTimer.current = setInterval(function() {
    
              // Timer fired: run state update
              const now = Date.now();
              console.log(LOGTAG + " State update timer fired at " + now);
              updateState();
        
            }, 4000);
          }
          updateState();
        }
      );
  }

  // Function invoked in response to request to disable proximity calculations
  const disableProximity = () => {

    console.log(LOGTAG + " disableProximity()");

    // Clear state update iterval
    clearInterval(stateUpdateTimer.current);
    stateUpdateTimer.current = undefined

    if(proximityTimer.current !== undefined) {
      // Proximity timer running
      
      // Stop bluetooth scanning
      stopScanning();
    }
    
    // Record that proximity is disabled
    LocalStorage.setObject("proximity", { "enabled": false }).then(value => {

        // Update indexes of artworks to show as all artworks
        const allArtworkIndexes = museumData.artworks.map((artwork, index) => index);
        setArtworkIndexes(allArtworkIndexes);

        // Update proximity flag
        setProximityEnabled(false);
      } 
    );

  }

  // Mapping from tag major to artwork index
  const major2ArtworkMapping = (() => {
      const mapping = {};
      museumData.artworks.forEach((artwork, index) => {
        mapping[artwork.major] = index;
      });
      console.log(LOGTAG + " major2ArtworkMapping=" + JSON.stringify(mapping));
      return mapping;
    })();

  // Function used to check tag validity
  const isValidTag = (tag) => {

      let valid = false;
      console.log(LOGTAG + " checking tag validity " + JSON.stringify(tag));
      
      // Check if the argument major and minor correspond to one of the registered artworks tags
      museumData.artworks.forEach(artwork => {
        if((artwork.major == tag.major) && artwork.minors.includes(tag.minor)) {
          valid = true;
        }
      });

      if(!valid) {
        console.log(LOGTAG + " invalid tag " + JSON.stringify(tag));
      }

      return valid;
  };

  // Function called periodically to update location and bluetooth state
  const updateState = async () => {
    
    // Get current location state
    const locationState = await DeviceInfo.isLocationEnabled();
    console.log(LOGTAG + " updateState: locationState=" + locationState);

    // Get current bluetooth state
    const bluetoothStateString = await BluetoothStateManager.getState() 
    let bluetoothState = undefined;
    // console.log(LOGTAG + " bluetooth state " + bluetoothStateString);
    switch (bluetoothStateString) {
        case 'PoweredOn':
          bluetoothState = true;
          break;
        default:          
          bluetoothState = false;
          break;
    }
    console.log(LOGTAG + " updateState: bluetoothState=" + bluetoothState);

    // Update location and bluetooth state
    setLocationEnabled(locationState);
    setBluetoothEnabled(bluetoothState);

    if(locationState && bluetoothState && proximityTimer.current === undefined) {
      // New state allows scanning but we are currently not scanning
      console.log(LOGTAG + " updateState: start scanning");

      // Start scanning
      startScanning();
    }
    else if((!locationState || !bluetoothState) && proximityTimer.current !== undefined) {
      // New state does not allows scanning but we are currently scanning
      console.log(LOGTAG + " updateState: stop scanning");

      // Stop scanning
      stopScanning();
    }
  }

  // Listen to navigation updates to start/stop upateState procedure
  useEffect(() => {

    // Subscribe to Focus event
    console.log(LOGTAG + " Subscribe to Focus event");
    const unsubscribeFocus = navigation.addListener('focus', () => {

      console.log(LOGTAG + " Focus event");

      // Retrieve proximity status from local storage
      LocalStorage.getObject("proximity").then(value => {

          // Use true as default if proximity is not available in storage
          const proximityStatus = value != null ? value.enabled : true;

          // Set proximity flag
          setProximityEnabled(proximityStatus);
          console.log(LOGTAG + " proximityEnabled=" + proximityStatus);

          if(proximityStatus) { // Proximity is enabled
    
            if(stateUpdateTimer.current === undefined) {
              // State update timer is not running
    
              // Start state update timer
              console.log(LOGTAG + " Starting stateUpdate timer");
              stateUpdateTimer.current = setInterval(function() {
      
                // Timer fired: run state update
                const now = Date.now();
                console.log(LOGTAG + " State update timer fired at " + now);
                updateState();
          
              }, 4000);
            }
      
            // Run state update function
            updateState();
          }
          else { // Proximity is not enabled

            // Update indexes of artworks to show as all artworks
            const allArtworkIndexes = museumData.artworks.map((artwork, index) => index);
            setArtworkIndexes(allArtworkIndexes);
          }
        }
      );  
    });

    // Subscribe to Blur event
    console.log(LOGTAG + " Subscribe to Blur event");
    const unsubscribeBlur = navigation.addListener('blur', () => {

      console.log(LOGTAG + " Blur event");

      if(stateUpdateTimer.current !== undefined) { // State update timer is running

        // Clear state update timer
        console.log(LOGTAG + " Clearing stateUpdate timer");
        clearInterval(stateUpdateTimer.current);
        stateUpdateTimer.current = undefined;
      }

      if(proximityTimer.current !== undefined) { // Proximity timer is running

        // Stop bluetooth scanning
        stopScanning();
      }          

    });

    return (() => {
      // Screen was removed from stack
      console.log(LOGTAG + " Screen was removed from stack");

      // Unsubscribe from Focus and Blur events
      console.log(LOGTAG + " Unsubscribe from Focus event");
      unsubscribeFocus();
      console.log(LOGTAG + " Unsubscribe from Blur event");
      unsubscribeBlur();

      if(stateUpdateTimer.current !== undefined) { // State update timer is running

        // Clear state update timer
        clearInterval(stateUpdateTimer.current);
        stateUpdateTimer.current = undefined;
      }

      if(proximityTimer.current !== undefined) { // Proximity timer is running

        // Stop bluetooth scanning
        stopScanning();
      }
    });
  }, [navigation]);

  // Procedure to start Bluetooth scanning
  const startScanning = () => {

    // Start scanning for beacons having the museum uuid
    console.log(LOGTAG + " Starting scan");
    BLE.startScanning({
      inactivityTimeout: 5,
      uuid: museumData.uuid,

      // New beacon callback
      appearCallback: (newBeacon) => {
        console.log(LOGTAG + " Beacon added: " + JSON.stringify(newBeacon));
        if(newBeacon.rssi >= 0) {
          newBeacon.rssi = MIN_RSSI;
        }
        beacons.current = beacons.current.concat([newBeacon]);
        // console.log(LOGTAG + " Updated beacons: " + JSON.stringify(beacons.current));
      },

      // Disappeared beacon callback
      disappearCallback: (disappearedBeacon) => {
        console.log(LOGTAG + " Beacon removed: " + JSON.stringify(disappearedBeacon));
        beacons.current = beacons.current.filter(beacon => 
              beacon.major != disappearedBeacon.major || beacon.minor != disappearedBeacon.minor);
        // console.log(LOGTAG + " Updated beacons: " + JSON.stringify(beacons.current));
      },

      // Update beacons callback
      updateCallback: (updatedBeacons) => {
        console.log(LOGTAG + " Beacons updated: " + JSON.stringify(updatedBeacons));
        beacons.current = beacons.current.concat(
            updatedBeacons.map(beacon => {
              if(beacon.rssi >= 0) {
                beacon.rssi = MIN_RSSI;
              }
              return beacon;
            })
        );
        // console.log(LOGTAG + " Updated beacons: " + JSON.stringify(beacons.current));
      }
    });

    // Start timer to run proximity algorithm
    proximityTimer.current = setInterval(function() {

      // Proximity timer fired: run proximity algorithm
      const now = Date.now();
      console.log(LOGTAG + " Proximity timer fired at " + now);
      processProximityData();

    }, proximityConfig.interval);
  }

  // Procedure to stop Bluetooth scanning
  const stopScanning = () => {

    // Stop BLE scanning
    console.log(LOGTAG + " Stopping scan");
    BLE.stopScanning({
      uuid: museumData.uuid
    });

    // Clear timer to run proximity algorithm
    clearInterval(proximityTimer.current);
    proximityTimer.current = undefined;

    // Reset current beacons
    beacons.current = [];
  
  }

  const processProximityData = () => {

    console.log(LOGTAG + " processProximityData");

    // Get current timestamp in ms
    const now = Date.now();

    // Discard old beacons
    console.log(LOGTAG + " beacon count before dropping old data: " + beacons.current.length);
    beacons.current = beacons.current.filter(beacon => now - beacon.timestamp <= proximityConfig.interval);
    console.log(LOGTAG + " beacon count after dropping old data: " + beacons.current.length);

    // Get tags ordered by proximity algorithm
    tags = Proximity.getProximity(beacons.current);

    console.log(LOGTAG + " tags=" + JSON.stringify(tags));  

    // New artwork indexes
    const newArtworkIndexes = tags.

      // Check if tag is valid
      filter(tag => isValidTag(tag)).

      // Map tags to major
      map(tag => tag.major).

      // Filter duplicates majors
      filter((major, index, a) => a.indexOf(major) === index).

      map(major => {
        console.log(LOGTAG + " major " + major);
        return major;
      }).

      // Get first proximityConfig.sekectionCount elements
      slice(0, proximityConfig.selectionCount).

      // Map major to artwork
      map(major => major2ArtworkMapping [major]);

    console.log(LOGTAG + " new artworkIndexes=" + JSON.stringify(newArtworkIndexes));  

    // indexes.current = newArtworkIndexes;
    if(JSON.stringify(indexes.current) === JSON.stringify(newArtworkIndexes)) {
      console.log(LOGTAG + " artworkIndexes did not change");  
    }
    else {
      console.log(LOGTAG + " artworkIndexes did change " + JSON.stringify(indexes.current) + " - "
        + JSON.stringify(newArtworkIndexes));  
      indexes.current = newArtworkIndexes;
      setArtworkIndexes(newArtworkIndexes);
    }
  }

  // Tile height (use 300 as the default value)
  const [tileHeight, setTileHeight] = useState(300);
  const [tileWidth, setTileWidth] = useState(300);

  const renderView = () => {

    if(proximityEnabled) { // Using proximity
      
      if(!locationEnabled) { // Location is not enabled

        // Request user to activate location
        return (
          <NotificationView 
            image={require('../assets/images/location_icon.png')} 
            messageKey='ArtworksScreen.locationOffMessage' 
            buttonKey='ArtworksScreen.disableProximityButton'
            buttonCallback={disableProximity}/>
        );
      }
      if(!bluetoothEnabled) { // Bluetooth is not enabled

        // Request user to activate bluetooth
        return (
          <NotificationView 
            image={require('../assets/images/bluetooth_icon.png')} 
            messageKey='ArtworksScreen.bluetoothOffMessage' 
            buttonKey='ArtworksScreen.disableProximityButton'
            buttonCallback={disableProximity}/>
        );
      }
    } 

    // Proximity is disabled or proximity is enabled and both location and bluetooth are enabled

    if(artworkIndexes.length == 0) {
      // No artworks: show scanning view
      return (
        <BTScanningView disableProximityCallback={disableProximity}/>
      );
    }
    else {
      // Some artworks can be shown

      // Build button to enable/disable proximity 
      const proximityButton = proximityEnabled 
        ? 
        <HeaderButton    
          label={t('HeaderView.disableProximityButtonLabel')}
          callback={disableProximity}
          image={<Image source={require('../assets/images/proximity_icon.png')} />}
        />
        :
        <HeaderButton 
          label={t('HeaderView.disableProximityButtonLabel')}
          callback={enableProximity}
          image={<Image source={require('../assets/images/proximity_disabled_icon.png')} />}
        />

      

      return (
        <SafeAreaView 
          style={styles.container}
        >

          <HeaderView
            color={appConfig.backgroundColor_3}
            left={<BackButton_b/>}
            right={<VIS_Button/>}
            right2={<TiredButton/>}
            right3={proximityButton}
          />

          <FlatList
            data={artworkIndexes}
            onLayout={
              (event) => {
                const { width, height } = event.nativeEvent.layout;
                const newTileHeight = height / proximityConfig.selectionCount;
                setTileHeight(newTileHeight);
                setTileWidth(width);
                console.log(LOGTAG + " onLayout event: (" + width + ", " + height + "), tileHeight=" + newTileHeight);
              }            
            }
            renderItem={({item,index}) => 
              <ArtworkTile 
                museumData={museumData} 
                index={item} 
                documentsFolder={documentsFolder} 
                tileHeight={tileHeight}
                tileWidth={tileWidth} />
            }
          />
        </SafeAreaView>
      );
    }
  }

  console.log(LOGTAG + " Repainting: proximimtyEnabled=" + proximityEnabled);
  return renderView();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConfig.backgroundColor_1
  },

  ProximityButton: {
    padding: 5,
    width: 0,
    height: 8,
    marginLeft: 0,
    marginTop: 20,
},

});

export default ArtworksScreen