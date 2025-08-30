import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";

export const IconButton = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  onPress: () => void;
  className?: string;
}) => {
  return (
    <Pressable
      className={props.className}
      onPress={props.onPress}
      android_ripple={{ color: "rgba(0,0,0,0.1)", borderless: true }}
    >
      {({ pressed }) => (
        <FontAwesome
          name={props.name}
          color={props.color}
          style={{
            opacity: pressed ? 0.6 : 1,
          }}
        />
      )}
    </Pressable>
  );
};
