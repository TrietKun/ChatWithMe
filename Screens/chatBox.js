import { View, Text,StyleSheet ,TextInput,Image,FlatList,TouchableOpacity,Dimensions} from 'react-native'
import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function chatBox({navigation, route}) {

    const [data, setData] = useState([]);
    const [mess, setMess] = useState([]);
    const [messSend, setMessSend] = useState([]);
    const [refreshCount, setRefreshCount] = useState(0);

    const API = route.params;
    console.log(API);

    const getData = async () => {
        const response = await fetch('https://65473c6b902874dff3ac0f39.mockapi.io/chat/' + API.idAPI);
        const data = await response.json();
        setData(data);
    }

    const getMess = async () => {
        const response = await fetch('https://65473c6b902874dff3ac0f39.mockapi.io/chat/12');
        const data = await response.json();
        console.log(data);
        setMess(data);
    }
        useEffect(() => {
            getData();
            getMess();

            
    // Sử dụng setInterval để tự động cập nhật dữ liệu sau mỗi 2 giây
    const intervalId = setInterval(() => {
        getData();
        setRefreshCount((prevCount) => prevCount + 1);
      }, 2000);
  
      // Đảm bảo hủy bỏ interval khi component bị unmounted
      return () => {
        clearInterval(intervalId);
      };
    }, [refreshCount]);


    function sendMess() {
        const newmess = {
            id : (length = mess.mess.length + 1),
            mes : messSend,
            cl : data.cl,
        }
        mess.mess.push(newmess)
        fetch('https://65473c6b902874dff3ac0f39.mockapi.io/chat/12', {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                mess : mess.mess
            })
        })
        .then(response => {
            if(response.ok) {
                return navigation.navigate('b',{idAPI : data.id})
            }
        })
    
        .catch(err => console.log(err))
        
    }
  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.inputContainer}>
            <TextInput style={styles.input}
                onChangeText={setMessSend}
            >

            </TextInput>
            <TouchableOpacity style={{position : 'absolute', 
                                    backgroundColor : 'red', 
                                    width : 30,
                                    height : 30,
                                    borderRadius : 20,
                                    justifyContent : 'center',
                                    alignItems : 'center',
                                    right : 50}}
            onPress={sendMess}
            >
                <Text>Send</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.content}>
            <FlatList
            style={styles.flatList}
                data={mess.mess}
                renderItem={({item}) => {
                    return (
                        <View style={styles.item}>
                            <View style={[styles.itemJob, {backgroundColor : item.cl}]}>
                                <Text style={{fontSize : 14, fontWeight : 700, marginLeft : 20}}>{item.mes}</Text>
                            </View>
                        </View>
                    )
                }}                
                
            />
        </View>

        
    </View>
  )
}
const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : 'fit-content',
        alignItems : 'center',
    },
    inputContainer : {
        width : '100%',
        height : '10%',
        backgroundColor : 'white',
        alignItems : 'center',
        justifyContent : 'center'
    }, 
    input : {
        width : '80%',
        height : '60%',
        borderRadius : 10,
        borderColor : 'black',
        borderWidth : 1,
        paddingLeft : 20,
    }, 
    content : {
        width : '100%',
        height : 610,
        alignItems : 'center',
        justifyContent : 'center',
        paddingBottom : 10,
    },
    flatList : {
        width : '100%',
        height : '100%',
        position : 'sticky',
    },
    item : {
        width : '100%', 
        height : 50, 
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 30

    }, 
    itemJob : {
        width : '85%', 
        height : '100%', 
        borderRadius : 15, 
        flexDirection : 'row',
        alignItems : 'center',
        boxShadow: '0px 8px 17px 0px #171A1F26',
    }, 
    nhap : {
        width : '100%',
        height : '10%',
        backgroundColor : 'white',
        alignItems : 'center',
        justifyContent : 'center'
    }
});