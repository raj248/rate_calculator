import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';

interface BottomSheetProps {
  children?: React.ReactNode; // Dynamic content
  setOpenSheet?: (fn: () => void) => void; // Function to open sheet from parent
}

export default function BottomSheet({ children, setOpenSheet }: BottomSheetProps) {
  const bottomSheetModalRef = useSheetRef();

  // Provide the open function to parent
  useEffect(() => {
    if (setOpenSheet) setOpenSheet(() => () => bottomSheetModalRef.current?.present());
  }, [setOpenSheet]);

  return (
    <Sheet ref={bottomSheetModalRef} snapPoints={[500]}>
      <View className="flex-1 items-center justify-center pb-8">
        {children || <Text>No content provided</Text>}

        {/* Close Button */}
        <TouchableOpacity
          onPress={() => bottomSheetModalRef.current?.close()}
          className="mt-4 p-2 bg-red-500 rounded-lg"
        >
          <Text className="text-white text-center">Close</Text>
        </TouchableOpacity>
      </View>
    </Sheet>
  );
}
