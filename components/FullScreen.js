/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-community/async-storage"
import React,{useState, useEffect, useCallback} from "react"
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  RefreshControl
} from "react-native"

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width



const  FullScreen = (props) => {
    const {query} = props.route.params
    const [refreshing, setRefreshing] = useState(true)
    const [carouselItems, setCarousalItems] = useState([])
    const [likedArr,setLikedArr] = useState([])
    
    const FindImages=(query)=>{
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Client-ID yJY_4ASmHr8aceVoCAEHbZdeWRQbwYVZBo9vVwwSj3g");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      if (AsyncStorage.getItem('Liked')){
        AsyncStorage.getItem('Liked')
        .then(res=>{
          const arr = JSON.parse(res)
          console.log("Stored ",arr)
          if (arr){
            setLikedArr(arr)
          }else{
            setLikedArr([])
          }
          
        })
        
      }

      fetch(`https://api.unsplash.com/search/photos?query=${query}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('Result Query ', result.results)
          setCarousalItems(result.results)
          setRefreshing(false)
        })
        .catch(error => {
          
          console.log('error', error)});
     
    }
    const likeClicked = async (id) => {
      if (likedArr){
        if (likedArr.findIndex((ele)=>ele == id) >= 0){
          const arr = likedArr.filter(ele => ele != id)
          setLikedArr(arr)
        }else{
          const newArr = likedArr.concat(id)      
          setLikedArr(newArr)
          console.log(likedArr)
        }
      }else{
        const newArr = likedArr.concat(id)      
        setLikedArr(newArr)
      }      
      await AsyncStorage.setItem('Liked',JSON.stringify(likedArr))
      console.log('ID ',id)
    }
    useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () =>{
        FindImages(query)
      }
      );
      return unsubscribe;
    }, [ FindImages, props]);

    
    const keyExtractor = useCallback((item, index) => index, []);
  
    return(
      <SafeAreaView style={styles.container}>
      
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={carouselItems}
          keyExtractor={keyExtractor}
          numColumns={2}
          
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={()=>FindImages(query)} 
               title="Refreshing" 
               titleColor="#222222" 
               colors={["gray","orange"]}
            />
           }
          renderItem={({item}) => {
            return (
              <TouchableOpacity 
               style={{height:height-(0.7*height),width:"48%",borderRadius:15,justifyContent:"center",alignItems:"center"}} 
               onPress={()=>props.navigation.navigate("ImageDisplay",{
              "item":item
            })}
               >
                 <View style={{height:"95%",width:"95%",borderRadius:15,overflow:'hidden'}}>
                  <ImageBackground source={{uri:item.urls.raw}} style={{height:"100%",width:"100%",alignItems:'flex-end'}}>
                    <Pressable onPress={()=>likeClicked(item.id)} style={{width:40,height:40,margin:10,borderRadius:5,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(113,113,113,.52)'}}>
                      {likedArr? likedArr.findIndex((ele)=>ele == item.id) >= 0?
                      <Image source={require('../assets/like.png')} style={{width:30,height:30,tintColor:'#FFFFFF'}} />
                      :<Image source={require('../assets/love.png')} style={{width:30,height:30,tintColor:'#FFFFFF'}} />:
                      <Image source={require('../assets/love.png')} style={{width:30,height:30,tintColor:'#FFFFFF'}} />}
                    </Pressable>
                  </ImageBackground>
                </View>
                {/* <Image source={{uri:item.urls.thumb}} style={{height:"95%",width:"95%",borderRadius:15}} /> */}
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={()=>{
            return(
              <View style={{height:10}} />
            )
          }}
      />
      </SafeAreaView>
    )
  }

  export default FullScreen

const styles = StyleSheet.create({
  container:{
    height:height,
    width:width,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#FFFFFF",
    paddingTop:StatusBar.currentHeight
  },
  FlatList_Container:{
    width:"95%"
  }
})
