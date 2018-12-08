import RNFetchBlob from 'react-native-fetch-blob';
import {sendMail} from '../utils/email';
import {Alert} from 'react-native';
const dirs = RNFetchBlob.fs.dirs

export const generateMonthlyReportCSVAndSend = (outconesByMonth, cyrrencySymbol ='$')=>{

    const header =`Date,Category,Amount,Description,Payment Method,Number Of Payments\n`;
    let totalAmount = 0;
    const data = outconesByMonth.map(e=>{
      totalAmount+= parseFloat(e.Amount);
      return `${e.Date},${e.Category},${e.Amount},${e.Description},${e.PaymentMethod},${e.NumberOfPayments}\n`
    }).join('');
    const totalAmountStr =`Total: ${totalAmount} ${cyrrencySymbol}\n`
    const csvString = `${header}${data}${totalAmountStr}`;
    
    // write the current list of answers to a local csv file
    const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/Monthly Report.csv`;
    console.log('pathToWrite', pathToWrite);
    // pathToWrite /storage/emulated/0/Download/data.csv
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        console.log(`wrote file ${pathToWrite}`);
        sendMail({
          subject: 'Expenses Monthly Report',
          recipients: [''],
          body: '<b>Expenses montlhy report created by ExpensesLOG App.</b>',
          isHTML: true,
          attachment: {
            path: pathToWrite, 
            type: 'csv',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            name: 'Monthly Report',   
          }
        });
        // wrote file /storage/emulated/0/Download/data.csv
      })
      .catch(error => console.error(error));
  }

  export const saveMonthlyReportCSV = (outconesByMonth, cyrrencySymbol ='$')=>{

    const header =`Date,Category,Amount,Description,Payment Method,Number Of Payments\n`;
    let totalAmount = 0;
    const data = outconesByMonth.map(e=>{
      totalAmount+= parseFloat(e.Amount);
      return `${e.Date},${e.Category},${e.Amount},${e.Description},${e.PaymentMethod},${e.NumberOfPayments}\n`
    }).join('');
    const totalAmountStr =`Total: ${totalAmount} ${cyrrencySymbol}\n`
    const csvString = `${header}${data}${totalAmountStr}`;
    
    // write the current list of answers to a local csv file
    const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/Monthly Report.csv`;
    console.log('pathToWrite', pathToWrite);
    // pathToWrite /Downloads/Monthly Report.csv
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        Alert.alert('Notificatiom' ,`The report was saved to your downloads folder`,
    [
        {text:"OK", onPress:()=>false}
    ]);
        // wrote file /storage/emulated/0/Download/data.csv
      })
      .catch(error => console.error(error));
  }