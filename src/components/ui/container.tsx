import { View,StyleSheet} from 'react-native';

interface  containerProp {
  children : React.ReactNode;
}

export default function Container({children}:containerProp){


    return (
        <View  style={style.container}>
            {
                children
            }
        
      </View>
    )
}

const style = StyleSheet.create({
    container:{
        marginHorizontal:15
    }
})