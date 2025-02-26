import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { DatePicker } from '~/components/nativewindui/DatePicker';

interface EditEntryPopupProps {
  visible: boolean;
  onDismiss: () => void;
  onSave: (data: { date: string; amt1: string; amt2: string }) => void;
  initialData: { date: string; amt1: string; amt2: string };
}

export default function EditEntryPopup({
  visible,
  onDismiss,
  onSave,
  initialData,
}: EditEntryPopupProps) {
  const [date, setDate] = useState(new Date(initialData.date));
  const [amt1, setAmt1] = useState(initialData.amt1);
  const [amt2, setAmt2] = useState(initialData.amt2);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Edit Entry</Dialog.Title>
        <Dialog.Content>
          {/* Date Selection (Only Custom Date) */}
          <View className="items-center">
            <DatePicker
              value={date}
              mode="date"
              onChange={(ev: any) => setDate(new Date(ev.nativeEvent.timestamp))}
            />
            <Button disabled>{date.toLocaleDateString('en-GB')}</Button>
          </View>

          {/* Amount Inputs */}
          <TextInput
            label="Amount 1"
            keyboardType="numeric"
            value={amt1.toString()}
            onChangeText={setAmt1}
            mode="outlined"
          />
          <TextInput
            label="Amount 2"
            keyboardType="numeric"
            value={amt2}
            onChangeText={setAmt2}
            mode="outlined"
            className="mt-2"
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button
            onPress={() =>
              onSave({ date: date.toLocaleDateString('en-GB'), amt1, amt2 })
            }
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
