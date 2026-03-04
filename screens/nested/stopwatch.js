import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useRef, useEffect, useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

import { updateTaskCompletion } from '../../firebase/tasksActions';
import { TaskContext } from './main_screens/TaskContext';
import { colors, spacing, typography, borderRadius, gradients } from '../../styles/style';
import GradientButton from '../../functions/components/ui/GradientButton';

const images = [
  require('./../../assets/background/1.png'),
  require('./../../assets/background/2.png'),
  require('./../../assets/background/3.png'),
  require('./../../assets/background/4.png'),
  require('./../../assets/background/5.png'),
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const randomImage = getRandomImage();

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function StopwatchScreen({ route, navigation }) {
  const { refreshAllTasks } = useContext(TaskContext);
  const { task } = route.params;

  const [sound, setSound] = useState();
  const [volumeOn, setVolume] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  async function playSound() {
    if (volumeOn) {
      setVolume(false);
      await sound.unloadAsync();
    } else {
      setVolume(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('./../../assets/music/audio2.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
    }
  }

  const markAsDone = async () => {
    await updateTaskCompletion(task.taskID);
    navigation.goBack();
    await refreshAllTasks();
  };

  const handleReset = () => {
    setTimer(0);
    setIsPaused(false);
  };

  return (
    <ImageBackground
      source={randomImage}
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(15,15,26,0.75)' }}>
        {/* Header */}
        <SafeAreaView>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.md }}>
            <TouchableOpacity onPress={() => navigation.pop()} style={{ padding: spacing.sm }}>
              <MaterialCommunityIcons name="arrow-left" color={colors.dark.primary} size={26} />
            </TouchableOpacity>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[typography.h3, { color: colors.dark.text }]} numberOfLines={1}>
                {task.task}
              </Text>
            </View>

            <TouchableOpacity onPress={playSound} style={{ padding: spacing.sm }}>
              <MaterialCommunityIcons
                name={volumeOn ? 'volume-off' : 'volume-high'}
                color={colors.dark.primary}
                size={26}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Timer Display */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              width: 220,
              height: 220,
              borderRadius: 110,
              borderWidth: 4,
              borderColor: colors.dark.primary + '40',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
          >
            <Text style={{ fontFamily: 'lexend-bold', fontSize: 48, color: colors.dark.text }}>
              {formatTime(timer)}
            </Text>
          </View>

          {/* Controls */}
          <View style={{ flexDirection: 'row', marginTop: spacing.xl, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={handleReset}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: colors.dark.surface,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: spacing.lg,
              }}
            >
              <MaterialCommunityIcons name="restart" color={colors.dark.textSecondary} size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsPaused(!isPaused)}
              style={{ overflow: 'hidden', borderRadius: 36 }}
            >
              <LinearGradient
                colors={gradients.primary}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name={isPaused ? 'play' : 'pause'}
                  color="#FFFFFF"
                  size={32}
                />
              </LinearGradient>
            </TouchableOpacity>

            <View style={{ width: 56, marginLeft: spacing.lg }} />
          </View>
        </View>

        {/* Mark as Done */}
        <SafeAreaView style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.lg }}>
          <GradientButton
            title="Mark as Done"
            onPress={markAsDone}
            variant="secondary"
            icon={<MaterialCommunityIcons name="check" color="#FFFFFF" size={20} />}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
