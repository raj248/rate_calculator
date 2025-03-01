import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Linking, Platform, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Text } from '~/components/nativewindui/Text';
import SettingsScreen from '~/components/Settings';
import { useColorScheme } from '~/lib/useColorScheme';
import { useGitHubStore } from '~/store/githubStore';
import backupToGitHub from '~/utils/backupToGitHub';
import loadFromGitHub from '~/utils/loadFromGitHub';

export default function ModalScreen() {
  const { colors, colorScheme } = useColorScheme();
  const { token, setToken } = useGitHubStore();

  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : colorScheme === 'dark' ? 'light' : 'dark'} />
      <View className='mx-4'>
        <FontAwesome name="github" size={32} color={colors.grey} namingScheme={'ion'} className='mt-4' />
        <Text variant="title3" className="pb-1 text-center font-semibold">
          GitHub Backup Settings
        </Text>
        <TextInput
          label="GitHub PAT"
          value={token || ''}
          onChangeText={setToken}
          secureTextEntry
          mode="outlined"
          className="w-full"
        />
        <Button mode="contained" onPress={backupToGitHub} className="mt-4 w-full">
          Save Backup to Gist
        </Button>
        <Button mode="outlined" onPress={loadFromGitHub} className="mt-2 w-full">
          Load Backup from Gist
        </Button>

        <SettingsScreen />
      </View>
    </>
  );
}
