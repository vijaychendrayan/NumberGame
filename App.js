import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';


// Keep the splash screen visible while we fetch resources
// console.log("Visible Splash");
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0)
  
  //----------------- Splash Screen with Font Loading ---------------
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // console.log("Start Loading Fonts - try");
        await Font.loadAsync(
                      { 'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
                        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
                      }
                      
        );
        
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        // console.log("Error Loading Fonts");
        console.warn(e);
      } finally {
        // Tell the application to render
        // console.log("finally Loading Fonts");
        setAppIsReady(true);
        
      }
    }

    prepare();
  }, []);
  // console.log("App is Ready : ",appIsReady);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      // console.log("Hide Splash");
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // console.log("Return : Null");
    return null;
  }
 
  //----------------- End -------------------------------------------



  // const [fontsLoaded]=useFonts({
  //   'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  //   'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  // });

  // if(!fontsLoaded){
  //   return <AppLoading />
    
  // }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }
  function startNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0);


  }
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;
  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }
  if(gameIsOver && userNumber){
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }
  
  return (
    <>
      <StatusBar style='light'/>
      <LinearGradient colors={[Colors.primary700,Colors.accent500]} style={styles.rootScreen} onLayout={onLayoutRootView}>
          <ImageBackground 
            source={require('./assets/images/dice.jpg')}
            resizeMode="cover" 
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          >
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>  
          </ImageBackground>
      </LinearGradient>      
    </>   
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    
  },
  backgroundImage:{
    opacity: 0.15
  }
});
