import { useRateStore } from '~/store/rateStore';
import { useGitHubStore } from '~/store/githubStore';
import Toast from 'react-native-toast-message';

const GIST_FILENAME = 'rate-data.json';

const loadFromGitHub = async () => {
  const { token, gistId } = useGitHubStore.getState();
  if (!token || !gistId) {
    console.error('GitHub token or Gist ID is missing!');
    Toast.show({ type: 'error', position: 'top', text1: 'GitHub Error', text2: 'Token or GistID is missing!' });
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const result = await response.json();
    if (!result.files[GIST_FILENAME]) {
      console.error('Gist file not found!');
      Toast.show({ type: 'error', position: 'top', text1: 'GitHub Error', text2: 'Gist file not found!' });

      return;
    }

    const newData = JSON.parse(result.files[GIST_FILENAME].content);
    useRateStore.setState({ data: newData });
    console.log('Data successfully loaded from GitHub Gist');
    Toast.show({ type: 'success', position: 'top', text1: 'Data Loaded', text2: 'Successfully fetched from GitHub' });
  } catch (error:any) {
    console.error('Loading failed:', error);
    Toast.show({ type: 'error', position: 'top', text1: 'Load Failed', text2: error.message });
  }
};


export default loadFromGitHub;