import { useRateStore } from '~/store/rateStore';
import { useGitHubStore } from '~/store/githubStore';

const GIST_FILENAME = 'rate-data.json';

const loadFromGitHub = async () => {
  const { token, gistId } = useGitHubStore.getState();
  if (!token || !gistId) {
    console.error('GitHub token or Gist ID is missing!');
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
      return;
    }

    const newData = JSON.parse(result.files[GIST_FILENAME].content);
    useRateStore.setState({ data: newData });
    console.log('Data successfully loaded from GitHub Gist');
  } catch (error) {
    console.error('Loading failed:', error);
  }
};


export default loadFromGitHub;