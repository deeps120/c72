import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput,
    Image,KeyboardAvoidingView,Alert,ToastAndroid} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as permissions from 'expo-permissions';
import * as firebase from 'firebase';
import db from '../config';

export default class BookTransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
            scannedBookId:'',
            scanStudentId:'',
            transactionMessage:''
        }
    }
    handleTransaction=async()=>{
var transactionMessage
db.collection('books').doc(this.state.scannedBookId).get()
.then((doc)=>{
    var book=doc.data()
    if(book.bookAvailibility){
        this.initiateBookIssue();
        transactionMessage='book issue'
        //Alert.alert(transactionMessage)
        ToastAndroid.show(transactionMessage,ToastAndroid.SHORT)
    }
    else{
        this.initiateBookReturn();
        transactionMessage='book return'
//Alert.alert(transactionMessage)
ToastAndroid.show(transactionMessage,ToastAndroid.SHORT)
    }
})
this.setState({
    transactionMessage:transactionMessage
})
    }
    initiateBookIssue=async()=>{
        db.collection('transaction').add({
            'studentId':this.state.scanStudentId,
            'bookId':this.state.scannedBookId,
            'date':firebase.firestore.Timestamp.now().toDate(),
        'transactionType':'issue'     
       })
       db.collection('books').doc(this.state.scannedBookId).update({
           'bookAvailibility':false
       })
       db.collection('students').doc(this.state.scannedStudentId).update({
           'numberOfBooksIssued':firebase.firestore.FieldValue.increment(1)
       })
       Alert.alert('bookIssue')
       this.setState({
           scannedBookId:'',
           scanStudentId:'',
       })
    }
    initiateBookReturn=async()=>{
        db.collection('transaction').add({
            'studentId':this.state.scanStudentId,
            'bookId':this.state.scannedBookId,
            'date':firebase.firestore.Timestamp.now().toDate(),
        'transactionType':'issue'     
       })
       db.collection('books').doc(this.state.scannedBookId).update({
           'bookAvailibility':true
       })
       db.collection('students').doc(this.state.scannedStudentId).update({
           'numberOfBooksIssued':firebase.firestore.FieldValue.increment(-1)
       })
       Alert.alert('bookReturn')
       this.setState({
           scannedBookId:'',
           scanStudentId:'',
       })
    }
    getCameraPermission=async(id)=>{
        const {status} = await Permission.askAsync (Permissions.CAMERA);
        this.setState({
            hasCameraPermission:status==='granted',
            buttonState:id,
            scanned:false
        })
    }
    handleBarCodeScanned=async({type,data})=>{
const {buttonState}= this.state
if(buttonState==='bookid'){
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    else if(buttonState==='studentid'){
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
}
    render(){
        const hasCameraPermission=this.state.hasCameraPermission;
const scanned=this.state.scanned;
const buttonState=this.state.buttonState;
if(buttonState==='clicked' && hasCameraPermission){
    return(
        <BarCodeScanner
        onBarCodeScanned={scanned  ? undefined:this.handleBarCodeScanned}
style={StyleSheet.absoluteFillObject}
        />
    )
}
else if(buttonState==='normal')
        return(
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled
            >

           
            <View>
                
                    <Image 
                    source={require('../assets/booklogo.jpg')}
                    style={{width:200,height:200}}
                    />
                    <Text style={{textAlign:'center',fontSize:40}}>wily</Text>
                    </View>
                    <View style={styles.inputView}>
                    <TextInput
                    style={styles.inputBox}
                    placeholder='bookid'
                    onChangeText={text=>this.setState({scannedBookId:text})}
                    value={this.state.scannedBookId}
                    >
                    </TextInput>
                <Text style={styles.ButtonText}>
                    hasCameraPermission===true? this.state.scannedData :'requestCameraPermission'
                </Text>
                <TouchableOpacity style={styles.scanButton}
                onPress={this.getCameraPermission('bookId')}
                
                >
                    <Text style={styles.ButtonText}>scan</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputBox}
                    placeholder='studentid'
                    onChangeText={text=>this.setState({scannedStudentId:text})}
                    value={this.state.scannedStudentId}
                     >
                    </TextInput>
                <Text style={styles.ButtonText}>
                    hasCameraPermission===true? this.state.scannedData :'requestCameraPermission'
                </Text>
                <TouchableOpacity style={styles.scanButton}
                onPress={this.getCameraPermission('studentId')}
                >
                    <Text style={styles.ButtonText}>scan</Text>
                </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.submitButton}
                onPress={async()=>{
                    var transactionMessage=this.handleTransaction();
                    this.setState({
                        scannedBookId:'',
                        scannedStudentId:'',
                    })
                }}
                >
                <Text style={styles.ButtonText}>submit</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        )
   }
}
const styles=StyleSheet.create({
    scanButton:{
backgroundColor:'black',
paddig:10,
margin:10
    },
    submitButton:{
backgroundColor:'blue',
width:100,
height:50
    },
    inputBox:{
width:200,
height:40,
borderWidth:1.5,
borderRightWidth:0,
fontSize:20
    },
ButtonText:{
    fontSize:15,
    color:'white',

},
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
inputView:{
    flexDirection:'row',
    margin:20

}
})