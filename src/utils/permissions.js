
import { PermissionsAndroid } from 'react-native';

export const requestStoragePermission=async(onGranted=()=>false, onDenied = ()=>false, onError=()=>false)=> {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        onGranted();
      } else {
        onDenied();
      }
    } catch (err) {
        onError();
    }
  }