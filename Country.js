import React,{Component} from 'react';
import {Text,StyleSheet,View,TouchableOpacity,ScrollView} from 'react-native';

import Modal from 'react-native-modalbox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class Country extends Component{

state={
  data:[
        {label: 'India', value: 'in' },
        {label:'Argentina' , value:'ar'},
        {label:'Australia' , value:'au'},
        {label:'Austria' , value:'at'},
        {label:'Belgium' , value:'be'},
        {label:'Brazil' , value:'br'},
        {label:'Bulgaria' , value:'bg'},
        {label:'Canada' , value:'ca'},
        {label:'China', value: 'cn' },
        {label:'Colombia' , value:'co'},
        {label:'Cuba' , value:'cu'},
        {label:'Czech Republic' , value:'cz'},
        {label:'Egypt' , value:'eg'},
        {label:'France' , value:'fr'},
        {label:'Germany' , value:'de'},
        {label:'Greece' , value:'gr'},
        {label: 'Hong Kong', value: 'hk' },
        {label:'Hungary' , value:'hu'},
        {label:'Indonesia' , value:'id'},
        {label:'Ireland' , value:'ie'},
        {label:'Israel' , value:'il'},
        {label:'Italy' , value:'it'},
        {label:'Japan' , value:'lv'},
        {label:'Latvia' , value:'lv'},
        {label:'Lithuania', value: 'lt' },
        {label:'Malaysia' , value:'my'},
        {label:'Mexico' , value:'mx'},
        {label:'Morocco' , value:'ma'},
        {label:'Netherlands' , value:'nl'},
        {label:'New Zealand' , value:'nz'},
        {label:'Nigeria' , value:'ng'},
        {label:'Norway' , value:'no'},
        {label: 'Philippines', value: 'ph' },
        {label:'Poland' , value:'pl'},
        {label:'Portugal' , value:'pt'},
        {label:'Romania' , value:'ro'},
        {label:'Russia' , value:'ru'},
        {label:'Saudi Arabia' , value:'sa'},
        {label:'Serbia' , value:'rs'},
        {label:'Singapore' , value:'sg'},
        {label:'Slovakia', value: 'sk' },
        {label:'Slovenia' , value:'si'},
        {label:'South Africa' , value:'za'},
        {label:'South Korea' , value:'kr'},
        {label:'Sweden' , value:'se'},
        {label:'Switzerland' , value:'ch'},
        {label:'Taiwan' , value:'tw'},
        {label:'Thailand' , value:'th'},
        {label: 'Turkey', value: 'tr' },
        {label:'UAE' , value:'ae'},
        {label:'Ukraine' , value:'ua'},
        {label:'United Kingdom' , value:'gb'},
        {label:'United States' , value:'us'},
        {label:'Venuzuela' , value:'ve'},

  ],
}

  render(){
    return(

      <Modal
        isOpen={this.props.visibility}
        coverScreen={true}
        swipeToClose={false}
        position={'center'}
        style={styles.modal}
      >
      <ScrollView>
              <RadioForm
                formHorizontal={false}
                animation={true}
              >
              {
                this.state.data.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i}  >

                      <RadioButtonLabel
                        obj={obj}
                        labelHorizontal={true}
                        labelStyle={{fontSize: 20, color: '#BCC6CC',marginTop:20}}
                        onPress={() => this.props.closeModal(obj.value,obj.label)}
                      />
                  </RadioButton>
                ))
              }
            </RadioForm>
          </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({

modal:{
  height:500,
  width:250,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:5,
  backgroundColor:'#0C090A',
},

radio:{
  lineHeight:3,
}

});

export default Country;
