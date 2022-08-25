import { RouteProp, useNavigation, useNavigationState, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native'
import { IMarker } from '../Home'

type DetailRoute = RouteProp<{detail: IMarker}, "detail">;

export default function Detail (){
    const { params } = useRoute<DetailRoute>();
    const [address, setAddres] = useState<any>()
    const navigation = useNavigation()

    useEffect(() =>{
        
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${params.latitude}&lon=${params.longitude}&format=json`)
        .then(async (request) =>{
            const data = await request.json();

            setAddres(data);
            navigation.setOptions({
                title: params.name,
            })
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{params.name}</Text>
            <Text style={styles.subTitle}>{params.description}</Text>

            <Text style={styles.section}>Endereço</Text>
            <Text style={styles.text}>{address?.address.road}</Text>
            <Text style={styles.text}>{address?.address.city}</Text>
            <Text style={styles.text}>{address?.address.postcode}</Text>
            <Text style={styles.text}>{address?.address.state}</Text>

            <Text style={styles.section}>Contato</Text>
            <Text style={styles.text}>{params.contact}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f5",
        padding: 20,      
    },

    title:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2667ff',
    },

    subTitle:{
        fontSize: 18,
        fontWeight: '400',
        color: '#6C6C80',
    },

    section: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2667ff',
        paddingTop: 20,
    },

    text: {
        fontSize: 16,
        color: '#6C6C80',
    }
})