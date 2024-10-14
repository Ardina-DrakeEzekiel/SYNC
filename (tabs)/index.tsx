import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

const Colors = {
  YELLOW: '#fff788',
  GREEN: '#0e372b',
  WHITE: '#fff',
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./Outfit-Regular.ttf'),
    'outfit-bold': require('./Outfit-Bold.ttf'),
    'outfit-medium': require('./Outfit-SemiBold.ttf'),
    'outfit-light': require('./Outfit-Light.ttf'),
  });

  const [screen, setScreen] = useState('login'); // State to manage different screens

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {screen === 'login' && <LoginScreen onSignIn={() => setScreen('dashboard')} />}
        {screen === 'dashboard' && <DashboardScreen onStart={() => setScreen('main')} />}
        {screen === 'main' && <MainScreen />}
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

function LoginScreen({ onSignIn }) {
  return (
    <View style={styles.loginContainer}>
      <Image source={require('./page1.png')} style={styles.image} resizeMode="contain" />
      <View style={styles.loginContent}>
        <Text style={styles.title}>SYNC</Text>
        <Text style={styles.subtitle}>
          A Mobile Application for Course Management and Syllabi Access at Cavite State University.
        </Text>
        <TouchableOpacity style={styles.googleSignIn} onPress={onSignIn}>
          <Image source={require('./google.png')} style={styles.googleIcon} />
          <Text style={styles.googleText}>Sign In using your CvSU Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DashboardScreen({ onStart }) {
  const [schoolYear, setSchoolYear] = useState("");
  const [semester, setSemester] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [yearSection, setYearSection] = useState("");

  return (
    <View style={styles.dashboardContainer}>
      <View style={styles.header}>
        <Image source={require('./sync.png')} style={styles.logoSmall} />
        <Text style={styles.syncText}>SYNC</Text>
      </View>
      <Text style={styles.dashboardWelcome}>Welcome to SYNC!</Text>
      <Text style={styles.dashboardDescription}>
        Your all-in-one companion for academic success at Cavite State University.
      </Text>

      <TextInput style={styles.dashboardInput} placeholder="School Year" value={schoolYear} onChangeText={setSchoolYear} />
      <TextInput style={styles.dashboardInput} placeholder="Semester" value={semester} onChangeText={setSemester} />
      <TextInput style={styles.dashboardInput} placeholder="College" value={college} onChangeText={setCollege} />
      <TextInput style={styles.dashboardInput} placeholder="Course" value={course} onChangeText={setCourse} />
      <TextInput style={styles.dashboardInput} placeholder="Year & Section" value={yearSection} onChangeText={setYearSection} />

      <TouchableOpacity style={styles.startButton} onPress={onStart}>
        <Text style={styles.startButtonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
}

function MainScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainHeader}>
        <View style={styles.headerBox}>
          <Image source={require('./sync.png')} style={styles.logoSmall} />
          <Text style={styles.syncText}>SYNC</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.syllabusButton}>
          <Text style={styles.buttonText}>Syllabus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.coursePlannerButton}>
          <Text style={styles.buttonText}>Course Planner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskTrackerButton}>
          <Text style={styles.buttonText}>Task Tracker</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  // Main container for the app
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Container for the login screen layout
  loginContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  
  // Style for the main image on the login screen
  image: {
    width: 250,
    height: 400,
    marginTop: 50,
  },
  
  // Content container for the login screen text and buttons
  loginContent: {
    height: 350,
    backgroundColor: Colors.YELLOW,
    width: '100%',
    marginTop: -80,
    padding: 20,
  },
  
  // Title style for the login screen
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: Colors.GREEN,
    fontFamily: 'outfit-bold',
    marginTop: 20,
  },
  
  // Subtitle style for the login screen
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    color: Colors.GREEN,
    fontFamily: 'outfit',
  },
  
  // Button style for Google sign-in
  googleSignIn: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 100,
    marginTop: 25,
  },
  
  // Style for the Google icon inside the sign-in button
  googleIcon: {
    width: 40,
    height: 40,
  },
  
  // Text style for the sign-in button
  googleText: {
    fontSize: 18,
    color: Colors.GREEN,
    fontFamily: 'outfit',
    marginRight: 5,
  },
  
  // Container for the dashboard screen layout
  dashboardContainer: {
    flex: 1,
    backgroundColor: Colors.YELLOW,
    padding: 20,
    width: '100%', // Ensures the container stretches to the full width of the screen
    alignSelf: 'stretch', // Allows the container to stretch horizontally as much as possible
  },
  
  // Header section for the dashboard screen
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Logo image style in the dashboard header
  logoSmall: {
    width: 150,
    height: 80,
    marginLeft: -50,
    marginTop: 30
  },
  
  // SYNC text style in the dashboard header
  syncText: {
    fontSize: 40,
    fontFamily: 'outfit-bold',
    color: Colors.GREEN,
    marginLeft: -40,
    marginTop: 30
  },
  
  // Welcome text style on the dashboard screen
  dashboardWelcome: {
    fontSize: 23,
    marginVertical: 16,
    fontFamily: 'outfit',
    color: Colors.GREEN,
    textAlign: "center",
  },
  
  // Description text style on the dashboard screen
  dashboardDescription: {
    fontSize: 16,
    marginBottom: 16,
    color: Colors.GREEN,
    textAlign: "center",
  },
  
  // Input fields style on the dashboard screen
  dashboardInput: {
    width: '100%',
    height: 50,
    borderColor: Colors.GREEN,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: Colors.WHITE,
  },
  
  // Style for the START button on the dashboard screen
  startButton: {
    backgroundColor: Colors.GREEN,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  // Text style for the START button
  startButtonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },

  mainContainer: {
    flex: 1,
    backgroundColor: Colors.YELLOW,
    alignItems: 'center'
  },
  mainHeader: {
    backgroundColor: Colors.YELLOW,
    width: '200%',
    height: '30%',
    padding: 80,
    alignItems: 'center',
    marginBottom: 10,
    display: 'flex',

  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: Colors.WHITE,
    padding: 12,
    marginVertical: 10,
    width: 250,
    borderRadius: 90,
    borderColor: Colors.WHITE,
    borderWidth: 1,
  },
  
  syllabusButton: {
    backgroundColor: Colors.GREEN,
    padding: 30,
    marginVertical: 10,
    width: 250,
    borderRadius: 5,
  },
  coursePlannerButton: {
    backgroundColor: Colors.GREEN,
    padding: 30,
    marginVertical: 10,
    width: 250,
    borderRadius: 5,
  },
  taskTrackerButton: {
    backgroundColor: Colors.GREEN,
    padding: 30,
    marginVertical: 10,
    width: 250,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 25,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  searchButtonText: {
    color: Colors.GREEN,
    textAlign: 'left',
  },
});

