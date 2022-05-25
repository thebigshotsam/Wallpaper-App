/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  NativeModules
} from "react-native"
 // 
 import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';


const Dev_Height = Dimensions.get('screen').height
const Dev_Width = Dimensions.get('screen').width

const ImageDisplay = (props) => {
  const [isloading,setIsLoading] = useState(false)
  const [Activity_Indicator,setActivityIndicator] = useState(true)
  const {item} = props.route.params
  

const setWallpaperListener = () => {
  ManageWallpaper.setWallpaper(
    {
      uri: item.urls.full,
    },
    res => {
      console.log('Response: ', res);
    },
    TYPE.HOME,
  );
}
  
    return(
      <View style={styles.container}>
	    <StatusBar translucent backgroundColor="transparent" />
      
      {!isloading ? ( 
        <ImageBackground 
         source={{uri:item.urls.full}} 
         style={{height:"100%",width:"100%"}}
         onLoadStart={()=>setActivityIndicator(true)}
         onLoadEnd={()=>setActivityIndicator(false)}
         >
         <ActivityIndicator 
          color="#FFF" 
          size="large"  
          style={{position:"absolute",top:Dev_Height-(0.5*Dev_Height),right:Dev_Width-(0.55*Dev_Width)}} 
          animating={Activity_Indicator}/>
          <View style={styles.close_button_style}>
            <TouchableOpacity style={styles.Close_Button_Touchable} onPress={()=>props.navigation.goBack()}>
            <Image source={require('../assets/back.png')} style={{width:25,height:25,tintColor:'#FFFFFF'}} />
            </TouchableOpacity>
          </View>

          <View style={{height:"70%",width:"100%",justifyContent:"flex-end",backgroundColor:"transparent",alignItems:"center"}}>
            <TouchableOpacity onPress={()=>setWallpaperListener()}
             style={{height:"8%",width:"40%",borderRadius:15,backgroundColor:"rgba(225,225,225,0.9)",justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"#121212",fontSize:16}}>Set as Wallpaper</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : 
      (
        <View style={{height:"100%",width:"100%"}}>
          <View style={styles.close_button_style}>
            <TouchableOpacity style={styles.Close_Button_Touchable} onPress={()=>props.navigation.goBack()}>
             <Image source={require('../assets/back.png')} style={{width:18,height:18}} />
            </TouchableOpacity>
          </View>
          <View style={{height:"50%",width:"100%",justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator color="#2abb9b" size="large" />
          </View>
        </View>
      )}
      </View>
    )
  }
export default ImageDisplay

const styles = StyleSheet.create({
  container:{
    height:Dev_Height,
    width:Dev_Width,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#222222",
  },
  close_button_style: {
    height: '20%',
    width: '90%',
    justifyContent:"center",
    paddingTop:StatusBar.currentHeight
  },
  Close_Button_Touchable: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(225,225,225,0.1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:"10%"
  },
})
