
import Mailer from 'react-native-mail';
import RNFetchBlob from 'react-native-fetch-blob';

export const sendMail = (options, onError=null)=>{
  
    Mailer.mail(options, (error, event) => {

        if(error){
            onError(error);
        }
    });
}