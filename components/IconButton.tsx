import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

export const IconButton = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  onPress: () => void;
  className?: string
}) => {
  // return <FontAwesome {...props} />;
  return (
    <TouchableOpacity
      className={props.className}
      onPress={props.onPress}
    >
      <FontAwesome name={props.name} color={props.color} />
      {/* <Text className="text-white text-center">Close</Text> */}
    </TouchableOpacity>
  )
};


