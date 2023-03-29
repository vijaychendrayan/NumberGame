import { StyleSheet, } from 'react-native';
import { TextInput, View } from 'react-native'
import PrimaryButton from '../components/PrimaryButton';
function StartGameScreen(){
    return(
        <View style={styles.inputContainer}>
            <TextInput />
            <PrimaryButton>Reset</PrimaryButton>
            <PrimaryButton>Confirm</PrimaryButton>
        </View>
    );

}

export default StartGameScreen;

const styles = StyleSheet.create({
    inputContainer:{
        
        padding: 16,
        marginTop: 100,
        marginHorizontal: 24,
        borderRadius: 8,
        backgroundColor: '#72063c',
        elevation: 4,  // android
        shadowColor: 'black',  // iOS
        shadowOffset: { width:0, height: 2}, //iOS
        shadowRadius: 6,  // iOS
        shadowOpacity: 0.25  // iOS

    }
})