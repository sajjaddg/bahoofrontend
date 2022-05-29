import React from "react";
import {Text,StyleSheet,View,ScrollView} from "react-native";
import CircleIcon from "../../component/CircleIcon";
import TransactionCard from "../../component/TransactionCard";

const Transaction = () => {
    return(
        <View style={styles.body}>
            <View style={styles.container}>
                <View style={styles.categories}>
                    <View>
                        <Text style={styles.title}> دسته بندی ها </Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <CircleIcon
                                circleStyle={{backgroundColor: '#CB98FF'}}
                                iconDisable={true}
                                title={'پوشاک'}
                            />
                            <CircleIcon
                                        circleStyle={{backgroundColor: '#8C2ADA'}}
                                        iconDisable={true}
                                        title={'کافه'}
                            />
                            <CircleIcon
                                circleStyle={{backgroundColor: '#7C50FC'}}
                                iconDisable={true}
                                title={'شارژ'}
                            />
                            <CircleIcon
                                circleStyle={{backgroundColor: '#CB98FF'}}
                                iconDisable={true}
                                title={'پوشاک'}
                            />
                            <CircleIcon
                                circleStyle={{backgroundColor: '#8C2ADA'}}
                                iconDisable={true}
                                title={'کافه'}
                            />
                            <CircleIcon
                                circleStyle={{backgroundColor: '#7C50FC'}}
                                iconDisable={true}
                                title={'شارژ'}
                            />
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.transactions}>
                    <View>
                        <Text style={styles.title}> تراکنش ها </Text>
                    </View>
                    <View
                        style={
                            {height:'97%' , paddingBottom:70, alignItems:'center'}
                        }
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}

                        >
                            <TransactionCard
                                title={'سفر بوشهر'}
                                date={'1/5/1401'}
                                circleStyle={{
                                    backgroundColor:'#84C4FF'
                                }}
                                balance={'800000'}
                                deposit={true}
                            />
                            <TransactionCard
                                title={'خرید عید'}
                                date={'1/1/1401'}
                                circleStyle={{
                                    backgroundColor:'#F3BB2C'
                                }}
                                balance={'600000'}
                                deposit={false}
                            />
                            <TransactionCard
                                title={'خرید عید'}
                                date={'1/1/1401'}
                                circleStyle={{
                                    backgroundColor:'#F3BB2C'
                                }}
                                balance={'400000'}
                                deposit={true}
                            />
                            <TransactionCard
                                title={'سفر بوشهر'}
                                date={'1/5/1401'}
                                circleStyle={{
                                    backgroundColor:'#84C4FF'
                                }}
                                balance={'800000'}
                                deposit={true}
                            />
                            <TransactionCard
                                title={'خرید عید'}
                                date={'1/1/1401'}
                                circleStyle={{
                                    backgroundColor:'#F3BB2C'
                                }}
                                balance={'600000'}
                                deposit={false}
                            />
                            <TransactionCard
                                title={'خرید عید'}
                                date={'1/1/1401'}
                                circleStyle={{
                                    backgroundColor:'#F3BB2C'
                                }}
                                balance={'400000'}
                                deposit={true}
                            />
                            <TransactionCard
                                title={'سفر بوشهر'}
                                date={'1/5/1401'}
                                circleStyle={{
                                    backgroundColor:'#84C4FF'
                                }}
                                balance={'800000'}
                                deposit={true}
                            />
                            <TransactionCard
                                title={'خرید عید'}
                                date={'1/1/1401'}
                                circleStyle={{
                                    backgroundColor:'#F3BB2C'
                                }}
                                balance={'600000'}
                                deposit={false}
                            />
                            <TransactionCard
                                title={'خرید عید'}
                                date={'1/1/1401'}
                                circleStyle={{
                                    backgroundColor:'#F3BB2C'
                                }}
                                balance={'400000'}
                                deposit={true}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
  body:{
      backgroundColor:'#FAF8F0',
      flex:1
  },
  container:{
      flex:1,
      marginTop:30,

      justifyContent:"flex-start",
  },
  categories:{
      flex:1
  },
    transactions:{
      flex:4,
    },
    title:{
        fontSize:18,
        color:'#302B38',
        fontFamily:'Shabnam-Bold-FD',
        marginHorizontal:25
    },

});
export default Transaction;
