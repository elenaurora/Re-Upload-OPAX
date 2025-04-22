import RNFS from 'react-native-fs';
import { unzip } from 'react-native-zip-archive'
import { networkConfig } from '../config';
import NetInfo from "@react-native-community/netinfo";

const LOGTAG = "DataFetchSupport";

const DataFetchError = class DataFetchErrorClass {

  static TYPE_GENERIC_ERROR = 0;
  static TYPE_CONNECTION_ERROR = 1;
  static TYPE_DOWNLOAD_ERROR = 2;
  static TYPE_PARSE_ERROR = 3;
  
  constructor(type, message) {
      this.type= type;
      this.message = message;
  }
}

const MUSEUMS_FILE_NAME = 'museums.json';

const checkMuseumsFile = async (documentsFolder) => {

  // Build target path for download
  const targetPath = documentsFolder + "/" + MUSEUMS_FILE_NAME;
  if(targetPath == "/" + MUSEUMS_FILE_NAME) {
    throw new DataFetchError(DataFetchError.TYPE_GENERIC_ERROR, "Invalid document folder");
  }

  // Check if museums file already exists
  console.log(LOGTAG + " checkMuseumsFile: Checking museums file at " + targetPath);

  // Exist status
  const museumsFileExists = await RNFS.exists(targetPath);
  console.log(LOGTAG + " checkMuseumsFile: Museums file " + (museumsFileExists ? "" : "not ") + "found");

  return museumsFileExists;

}

const deleteMuseumsFile = async (documentsFolder) => {

  // Build target path for museums file
  const targetPath = documentsFolder + "/" + MUSEUMS_FILE_NAME;
  console.log(LOGTAG + " deleteMuseumsFile: Deleting museums file at " + targetPath);

  // Delete museums file
  await RNFS.unlink(targetPath); 
  console.log(LOGTAG + " deleteMuseumsFile: Museums file deleted");
}

const fetchMuseumsFile = async (documentsFolder) => {

  try {

    // Build target path for download
    const targetPath = documentsFolder + "/" + MUSEUMS_FILE_NAME;

    if(!await checkMuseumsFile(documentsFolder)) { // Museums file is not available

      // Build museums file URL
      const museumsFileUrl = networkConfig.serverUrl + MUSEUMS_FILE_NAME;
      console.log(LOGTAG + " fetchMuseumsFile: Downloading museums file from " + museumsFileUrl);

      // Check network state
      const networkState = await NetInfo.fetch();
      console.log(LOGTAG + " fetchMuseumsFile: Connection status " + networkState.isConnected);
      if(!networkState.isConnected) {
        throw new DataFetchError(DataFetchError.TYPE_CONNECTION_ERROR, "Internet connection unavailable");
      }

      // Download museums file
      await RNFS.downloadFile({
        fromUrl: museumsFileUrl,
        toFile: targetPath
      }).promise.
      then(response => {

        // Check download status code
        console.log(LOGTAG + " fetchMuseumsFile: Response code " + response.statusCode);
        if(response.statusCode !== 200) {
          throw new DataFetchError(DataFetchError.TYPE_DOWNLOAD_ERROR, 
            "Error downloading museums file " + response.statusCode);
        }
      }).
      catch(error => {
        throw new DataFetchError(DataFetchError.TYPE_DOWNLOAD_ERROR, 
          "Error downloading museums file " + error);
      });

      // Museums file was successfully downloaded
      console.log(LOGTAG + " fetchMuseumsFile: Museums file downloaded");
    }

    // Read museums file into memory
    console.log(LOGTAG + " fetchMuseumsFile: Reading museums file");
    const response = await RNFS.readFile(targetPath, 'utf8');

    try {

      // Parse museums file
      museumsJson = JSON.parse(response);
      console.log(LOGTAG + " fetchMuseumsFile: " + JSON.stringify(museumsJson));

      // Check if version and musuems keys are defined
      if(museumsJson.version === undefined || museumsJson.museums === undefined) {
        throw new Error();
      }

      return museumsJson.museums;

    } catch(err) { // Parse error

      console.log(LOGTAG + " fetchMuseumsFile: Parse error");

      // Delete museums file
      await RNFS.unlink(targetPath); 
      console.log(LOGTAG + " fetchMuseumsFile: Museums file deleted");

      throw new DataFetchError(DataFetchError.TYPE_PARSE_ERROR, "Error parsing JSON file"); 
    }
  } catch(err) {
    if(err instanceof DataFetchError) { // DataFetchError was thrown
      // Rethrow error
      throw err;
    }
    
    // Some other error was thrown: Throw generic DataFetchError
    console.log(LOGTAG + " fetchMuseumsFile: error " + JSON.stringify(err));
    throw new DataFetchError(DataFetchError.TYPE_GENERIC_ERROR, "Error fetching museums file");
  }
}


const fetchMuseumData = async (documentsFolder, museum, progressCallback) => {

  // Build target folder for download
  const targetFolder = documentsFolder + '/' + museum.id;

  // Build target path for zip download
  const zipPath = documentsFolder + '/' + museum.id + '.zip';
  
  try {

    // Check if museum folder exists
    console.log(LOGTAG + " fetchMuseumData: Checking museum folder at " + targetFolder);
    if(!await RNFS.exists(targetFolder)) {

      // Museum folder does not exist
      console.log(LOGTAG + " fetchMuseumData: Museum folder does not exist");

      // Build download URL
      const museumFileUrl = networkConfig.serverUrl + museum.id + '.zip';
      console.log(LOGTAG + " fetchMuseumData: Downloading museum data from " + museumFileUrl);

      // Check network state
      const networkState = await NetInfo.fetch();
      console.log(LOGTAG + " fetchMuseumData: Connection status " + networkState.isConnected);
      if(!networkState.isConnected) {
        throw new DataFetchError(DataFetchError.TYPE_CONNECTION_ERROR, "Internet connection unavailable");
      }

      // Download museum zip file
      const { jobId, promise } = RNFS.downloadFile({
        fromUrl: museumFileUrl,
        toFile: zipPath,
        readTimeout: 120 * 1000,
        progressDivider: 0,
        begin: (res) => {},
        progress: (res) => {
          console.log(LOGTAG + " fetchMuseumData: downloaded " + res.bytesWritten + "/" + res.contentLength);
          if(progressCallback !== undefined) {
            progressCallback(res.bytesWritten / res.contentLength);
          }
        }
      });
      await promise.
        then(response => {

          // Check download status code
          console.log(LOGTAG + " fetchMuseumData: Response code " + response.statusCode);
          if(response.statusCode !== 200) {
            throw new DataFetchError(DataFetchError.TYPE_DOWNLOAD_ERROR, 
              "Error downloading museum data " + response.statusCode);
          }
        }).
        catch(error => {
          RNFS.stopDownload(jobId);
          throw new DataFetchError(DataFetchError.TYPE_DOWNLOAD_ERROR, 
            "Error downloading museum data " + error);
        });

      // Museum zip correctly downloaded
      console.log(LOGTAG + " fetchMuseumData: Museum file downloaded");

      // Unzip museum data archive
      await unzip(zipPath, documentsFolder);
      console.log(LOGTAG + " fetchMuseumData: Unzip done");

      // Delete zip archive
      await RNFS.unlink(zipPath); 
      console.log(LOGTAG + " fetchMuseumData: Archive deleted");

    }

    // Read museum data into memory
    const jsonPath = targetFolder + "/museum.json";
    console.log(LOGTAG + " fetchMuseumData: Reading museum file " + jsonPath);
    const response = await RNFS.readFile(jsonPath, 'utf8');

    try {

      // Parse museum data 
      const museumData = JSON.parse(response);
      console.log(LOGTAG + " fetchMuseumData: Museum: " + JSON.stringify(museumData));

      // Check if "en" key is defined (note: if the "en" key is defined we assume the file format is correct;
      // we do not validate the file contents against a schema)
      if(museumData.en === undefined) {
        throw new Error();
      }

      // Check if we have the latest museum version
      if(museumData.en.version == museum.version) {
        // Latest version is available
        console.log(LOGTAG + " fetchMuseumData: Latest museum data is available");

        // Return latest version
        return museumData;
      }

      // Delete old museum folder
      console.log(LOGTAG + " fetchMuseumData: Museum data is old current=" + museumData.en.version + ", latest="
        + museum.version);
      await RNFS.unlink(targetFolder); 
      console.log(LOGTAG + " fetchMuseumData: Museum folder deleted");

      // Call this function recuirsively inorder to download latest version
      return fetchMuseumData(documentsFolder, museum);

    } catch(err) {

      // Parse error
      console.log(LOGTAG + " fetchMuseumData: Parse error");
      throw new DataFetchError(DataFetchError.TYPE_PARSE_ERROR, "Error parsing JSON file"); 
    }
  } catch(err) {

    // Delete zip archive
    if(await RNFS.exists(zipPath)) {

      await RNFS.unlink(zipPath); 
      console.log(LOGTAG + " fetchMuseumData: Archive deleted");
    }

    // Delete museum folder
    if(await RNFS.exists(targetFolder)) {
      await RNFS.unlink(targetFolder); 
      console.log(LOGTAG + " fetchMuseumData: Museum folder deleted");
    }

    if(err instanceof DataFetchError) { // DataFetchError was thrown
      // Rethrow error
      throw err;
    }

    // Some other error was thrown: Throw generic DataFetchError
    console.log(LOGTAG + " fetchMuseumData: error " + JSON.stringify(err));
    throw new DataFetchError(DataFetchError.TYPE_GENERIC_ERROR, "Error fetching museum data");
  }

}

export { 
  DataFetchError,
  checkMuseumsFile,
  deleteMuseumsFile,
  fetchMuseumsFile,
  fetchMuseumData
};