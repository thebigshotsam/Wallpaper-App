/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react"
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
  Pressable,
  TextInput,
  ScrollView,
  Animated,  
  ActivityIndicator
} from "react-native"

import AsyncStorage from "@react-native-community/async-storage"

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width
const Item_Width = width-(0.6*width)

import Carousel from 'react-native-snap-carousel';

import { Colors } from "react-native/Libraries/NewAppScreen"

var carousel;
const  HomeScreen = (props) => {
  const [visible,setVisible] = useState(false)
  const [loading,setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(1)
  const [carouselItems, setCarouselItems] = useState([])
  const [selectedIndex,setSelectedIndex] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [likedArr,setLikedArr] = useState([])
  const [x, setX] = useState( new Animated.Value(-100))
  const categories = [
            {
              "title":"Food",
              "img_url":"https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
              "title":"Music",
              "img_url":"https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
              "title":"Cars",
              "img_url":"https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
              "title":"Animals",
              "img_url":"https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            },

            {
              "title":"Art",
              "img_url":"https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
              "title":"Games",
              "img_url":"https://images.pexels.com/photos/159393/gamepad-video-game-controller-game-controller-controller-159393.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },

            {
              "title":"Nature",
              "img_url":"https://images.pexels.com/photos/2724664/pexels-photo-2724664.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
              "title":"Jungle",
              "img_url":"https://images.pexels.com/photos/1583207/pexels-photo-1583207.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
              "title":"Sports",
              "img_url":"https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
              "title":"Space",
              "img_url":"https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
              "title":"Technology",
              "img_url":"https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
              "title":"Places",
              "img_url":"https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
              "title":"Abstract",
              "img_url":"https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            },
          ]

    
 
    const FindImages = useCallback(()=>{
     
      setLoading(true)
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
      fetch("https://api.unsplash.com/photos", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('Result ', result)
          setCarouselItems(result)
          setLoading(false)  
        })
        .catch(error => {
          setLoading(false)
          console.log('error', error)});
          })
    useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () =>{        
        FindImages()
      }
      );
      return unsubscribe;
    }, [ FindImages, props]);
  
    const likeClicked = async (id) => {
      if (likedArr){
        if (likedArr.findIndex((ele)=>ele == id) >= 0){
          const arr = likedArr.filter(ele => ele != id)
          setLikedArr(arr)
        }else{
          const newArr = likedArr.concat(id)      
          setLikedArr(newArr)          
        }
      }else{
        const newArr = likedArr.concat(id)      
        setLikedArr(newArr)        
      }      
      await AsyncStorage.setItem('Liked',JSON.stringify(likedArr))
      console.log(likedArr)
    }
    const keyExtractor = useCallback((item, index) => index, []);

    const _renderItemCatogories=({item,index})=>{
      return(
          <TouchableOpacity style={{ 
            height:"90%",
            width:width-(0.6*width),
            backgroundColor:"transparent",borderRadius:15,justifyContent:"center",alignItems:"center"}} 
            onPress={()=>props.navigation.navigate("FullCatogery",{ "query" : item.title })}
              >
              <ImageBackground 
                source={{uri:item.img_url}} 
                style={{height:"100%",width:"100%",borderRadius:15,justifyContent:"flex-end"}} 
                imageStyle={{borderRadius:15}}
              >
              <Text style={{marginBottom:"10%",marginLeft:"10%",color:"#FFF",fontWeight:"bold",fontSize:18}}>{item.title}</Text>
            </ImageBackground>
          </TouchableOpacity>
      )
    }

  const renderSeparator = () => (
    <View
      style={{
        width: 20,
      }}
    />
  );  

    const _renderItem=({item,index})=>(
          <TouchableOpacity style={{ height:"100%",width:"100%",borderRadius:15,justifyContent:"center",alignItems:"center"}} 
            onPress={()=>props.navigation.navigate("ImageDisplay",{
              "item":item
            })}>
            <ImageBackground source={{uri:item.urls.small_s3}} style={{height:"100%",width:"100%",borderRadius:15,alignItems:'flex-end'}}>
              <Pressable onPress={()=>likeClicked(item.id)} style={{width:40,height:40,margin:10,borderRadius:5,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(113,113,113,.52)'}}>
                {likedArr? likedArr.findIndex((ele)=>ele == item.id) >= 0?
                <Image source={require('../assets/like.png')} style={{width:30,height:30,tintColor:'#FFFFFF'}} />
                :<Image source={require('../assets/love.png')} style={{width:30,height:30,tintColor:'#FFFFFF'}} />:
                <Image source={require('../assets/love.png')} style={{width:30,height:30,tintColor:'#FFFFFF'}} />}
              </Pressable>
            </ImageBackground>
          </TouchableOpacity>
    )


  
    return(
      <SafeAreaView style={styles.MainContainer}>
	<StatusBar translucent backgroundColor="transparent" />
      <View style={{height:"100%",width:"100%"}}>
          <ImageBackground
            source={{uri:"https://images.unsplash.com/photo-1653225516877-fc465ee3ccd1?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470"}} 
            style={styles.Background}
            imageStyle={{height:"100%",width:"100%",borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
            <View style={{height:"100%",width:"100%",alignItems:"center",paddingTop:StatusBar.currentHeight}}>
              <View style={{height:"45%",width:"100%",justifyContent:"center",alignItems:"center",marginTop:"5%"}}>
                <Text style={{fontSize:18,fontWeight:"bold",color:"#FFF"}}> Check Out  Wallpaper's   </Text>                
              </View>
              <View style={{...styles.Searchbox}}>
              <TextInput                
                style={{height:50,width:width*0.6,marginLeft:"5%",color:"#FFFFFF"}} 
                placeholder="Search Wallpapers" 
                placeholderTextColor="gray" 
                value={searchQuery}
                onChangeText={(value)=>setSearchQuery(value)}
              />
                <TouchableOpacity style={{height:"80%",width:"15%",justifyContent:"center",alignItems:"center"}} 
                  onPress={()=>{setSearchQuery(""); props.navigation.navigate("FullCatogery",{ "query" : searchQuery })}}>
                  <Image source={require('../assets/search.png')} style={{width:18,height:18,tintColor:'#FFFFFF'}}/>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

      <View style={{height:"10%",justifyContent:"center",width:"100%"}}>
        <Text style={{fontSize:18,color:"#222222",fontWeight:"bold",marginLeft:"5%"}}>Top Pick's</Text>
      </View>

      {loading?
      <ActivityIndicator style={{alignSelf:'center'}} size={25} color={"#222222"}/>:
      <View style={{height:"20%"}}>
        <Carousel
              layout={"default"}             
              ref={ref => carousel = ref}
              data={carouselItems}
              sliderWidth={width}
              itemWidth={Item_Width}
              renderItem={_renderItem}
              bounces={true} 
              keyExtractor={(item, index) => index}
              activeSlideAlignment={"center"}
              autoplay={true}
              loop={true}
          />
          </View>}


          <View style={{height:"10%",justifyContent:"center",width:"100%",position:'absolute',marginTop:height*0.6}}>
            <Text style={{fontSize:18,color:"#222222",fontWeight:"bold",marginLeft:"5%"}}>Categories</Text>
          </View>

          <View style={{height:"25%",width:"100%",justifyContent:"center",alignItems:"center",position:'absolute',marginTop:height*0.7}}>
	        <FlatList
                style={{
                height:"100%",width:"93%"}}
                data={categories}
                keyExtractor={keyExtractor}
                renderItem={_renderItemCatogories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={renderSeparator}
                alwaysBounceHorizontal={true}
                bounces={true}
              />
          </View>
        </View>
      </SafeAreaView>
    )
  }
export default HomeScreen

const styles = StyleSheet.create({
  MainContainer:{
    height:height,
    width:width,
    backgroundColor:"#FFFFFF",
  },
  Background:{
    height:"30%",
    width:"100%",
    justifyContent:"center",
  },
  Searchbox: {
    marginTop: "5%",
    height: "20%", 
    width: "80%", 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#222222", 
    borderRadius: 10, 
    flexDirection: "row"
  }
})
