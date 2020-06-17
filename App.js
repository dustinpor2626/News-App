import React,{Component} from 'react';
import {Text,StyleSheet,View,TextInput,TouchableOpacity,Image,Modal,ActivityIndicator,FlatList} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

import Modal2 from  './Country.js';

 
class App extends Component{

  state = {
      data:[],
      modal_visibility:false, 
      country:'India',
      country_code:'in',
      keyword:'',
      loading_modal:true,
      webpage_modal:false,
      web_address:'',
      refresh:false,
  }

componentDidMount(){

  var url = 'https://newsapi.org/v2/top-headlines?' +
            'country=in&' +
            'apiKey=6d8e7040e44e474e8b1ec3dc1198ac80';
  fetch(url)
      .then((response) => response.json())
      .then((resjsn) => {
            if(resjsn.status === 'ok'){
              this.setState({data:resjsn.articles});
            }else{
              alert('Netwok Problem');
            }
      }).then(() => this.setState({loading_modal:false}))
}



callren=  (code,name) => {
this.setState({loading_modal:true});
  var url = 'https://newsapi.org/v2/top-headlines?' +
            'country=' + code + '&' +
            'apiKey=6d8e7040e44e474e8b1ec3dc1198ac80';
  fetch(url)
      .then((response) => response.json())
      .then((resjsn) => {
        if(resjsn.status === 'ok'){
          this.setState({data:resjsn.articles});
          this.setState({country:name});
          this.setState({country_code:code});
        }else{
          alert('Network Problem');
        }
      }).then(() => this.setState({loading_modal:false}))
      .then(() => this.tablename.clear())
      .then(() => this.setState({refresh:false}))
}


searching = (data) =>{
  this.setState({loading_modal:true});
var url = 'https://newsapi.org/v2/everything?' +
          'q='+ data +'&' +
          'sortBy=popularity&' +
          'apiKey=6d8e7040e44e474e8b1ec3dc1198ac80';

          fetch(url)
              .then((response) =>
              response.json())
              .then((resjsn) => {
                if(resjsn.status === 'ok'){
                  this.setState({data:resjsn.articles});
                  this.setState({country:'searching keywords'});
                }else{
                  alert('Netwok Problem');
                }
              }).then(() => this.setState({loading_modal:false}))

}



webpage = (data) => {
  this.setState({web_address:data});
  this.setState({webpage_modal:true});
}

show(){
  AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
  AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
}

  render(){
    return(

<View style={{paddingBottom:100,backgroundColor:'rgba(0,128,128,0.3)'}}>

<Modal2
  visibility = {this.state.modal_visibility}
  closeModal = {(code,name) => {
        this.callren(code,name);
        this.setState({modal_visibility:false});
      }}
/>

<Modal
  visible={this.state.webpage_modal}
  onRequestClose = {() => this.setState({webpage_modal:false})}>
  <WebView
    source={{uri:this.state.web_address}}
  />
</Modal>

        <View style={styles.header}>

            <TextInput
            style={styles.text_input}
            ref={input => { this.tablename = input }}
            placeholder="Search Keyword"
            textAlign = {'center'}
            onChangeText = {(Text) => this.setState({keyword:Text})}
            />
            <TouchableOpacity onPress={() => {
                if(this.state.keyword !== '')
                {
                  this.searching(this.state.keyword);
                }
              }}>
                  <View style={styles.button} >
                    <Text>Search</Text>
                  </View>
            </TouchableOpacity>
        </View>

        <View style={styles.filter_container}>
                <View style={styles.country_name}><Text style={{color:'#BCC6CC'}}> News From: {this.state.country}</Text></View>
                <View style={styles.filter}>
                  <TouchableOpacity
                  onPress={() => this.setState({modal_visibility:true})}>
                      <View ><Text style={styles.filter_text}>Select Country</Text></View></TouchableOpacity>
                  </View>

          </View>
        <View >
        <Modal
          visible={this.state.loading_modal}
          transparent={true}
          onRequestClose = {() => this.setState({loading_modal:false})}>
              <View>
                <ActivityIndicator size={60}  animation={true}  color='grey' style={{marginTop:300}} />
                <Text style={{marginLeft:160,marginTop:20,fontWeight:'bold',color:'blue'}}>loading...</Text>
              </View>
        </Modal>
{/* 
        <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-3940256099942544/6300978111"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.error(error)}
/> */}

{this.show()}


        <FlatList
          keyExtractor = {(item,index) => 'key'+index}
          initialNumToRender = {3}
          windowSize = {3}
          bounces = {true}
          data = {this.state.data}
          refreshing = {this.state.refresh}
          onRefresh = {() => {
              this.setState({refresh:true});
              this.callren(this.state.country_code,this.state.country);
          }}
        renderItem = {({item}) => {

            var nam = item.source && item.source.name ;
          return(

            <TouchableOpacity
                   onPress = {() => this.webpage(item.url)}
                 >
                 <View style={styles.list}>
                     <View style={styles.img_article}>
                         <View style={styles.img}>
                           <Image source={{uri:item.urlToImage}} style={{height:'100%',width:'100%'}}/>
                         </View>
                         <View style={styles.article}>
                               <View style={styles.title}>
                                   <Text style={styles.title_text} numberOfLines = {5}>{item.title}</Text>
                               </View>
                               <View style={styles.src}>
                                   <Text style={{paddingLeft:15,color:'rgba(255,255,255,0.6)'}} numberOfLines={1}> {nam}</Text>
                               </View>
                         </View>
                     </View>
                     <View style={styles.desc}>
                       <Text style={styles.desc_text} numberOfLines={6}>{item.description}</Text>
                     </View>
                 </View>
                 </TouchableOpacity>

          );
        }} />


 

    </View>

    </View>

    );


}}

const styles = StyleSheet.create({

  header:{
    width:'100%',
    height:60,
    backgroundColor:'rgba(0,128,128,0.7)',
    marginTop:1,
    flexDirection:'row',
    borderBottomWidth:0.5,
    borderColor:'#737CA1',
    justifyContent:'center',
    alignItems:'center',
  },

  filter:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },

  list:{
    marginTop:5,
    backgroundColor:'rgba(245,245,220,0.8)',
    height:280,
    borderWidth:1.5,
    borderColor:'black',
  },

  img_article:{
    flex:1,
    flexDirection:'row',
  },

desc:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  overflow:'hidden',
},

img:{
  flex:1.5,
  marginTop:4,
  marginLeft:3,
  marginRight:2,
  marginBottom:5,
  borderRadius:5,
  borderWidth:0.7,
  borderColor:'#3D3C3A',
},

text_input:{
  borderWidth:1.5,
  borderColor:'rgba(0,128,128,1)',
  width:200,
  height:35,
  borderRadius:5,
  fontSize:16,
  color:'black',
  backgroundColor:'wheat',
  paddingTop:0,
  paddingBottom:-6,
},

button:{
  width:60,
  height:30,
  backgroundColor:'#E5E4E2',
  borderRadius:7,
  alignItems:'center',
  justifyContent:'center'
},

article:{
flex:3,
overflow:'hidden',
},

title:{
  flex:5,
  margin:2,
  alignItems:'center',
  justifyContent:'center',
},

src:{
  flex:1.4,
  backgroundColor:'#0C090A',
  paddingRight:10,
  justifyContent:'center',
  borderRadius:2,
},

filter_container:{
  height:30,
  backgroundColor:'#3D3C3A',
  flexDirection:'row',
  justifyContent:'center',
},

country_name:{
  flex:1,
  backgroundColor:'#3D3C3A',
  alignItems:'center',
  justifyContent:'center',
  borderRightWidth:1,
  borderColor:'black',
},

title_text:{
  color:'rgba(0,0,0,0.9)',
  padding:10,
  fontWeight:'bold',
  fontSize:16,
},

desc_text:{
  color:'rgba(0,0,0,0.7)',
  padding:10,
},

filter_text:{
  color:'#87AFC7',
  fontWeight:'bold',
  fontSize:18,
},


});

export default App;
