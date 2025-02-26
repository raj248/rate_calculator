import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, TextInput, RadioButton } from 'react-native-paper';
import { DatePicker } from '~/components/nativewindui/DatePicker';

interface AddEntryPopupProps {
  visible: boolean;
  onDismiss: () => void;
  onSave: (data: { date: string; amt1: string; amt2: string }) => void;
}

export default function AddEntryPopup({ visible, onDismiss, onSave }: AddEntryPopupProps) {
  const [dateOption, setDateOption] = useState('today');
  const [date, setDate] = useState(new Date());
  const [amt1, setAmt1] = useState('');
  const [amt2, setAmt2] = useState('');

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Add Entry</Dialog.Title>
        <Dialog.Content>
          {/* Date Selection */}
          <RadioButton.Group onValueChange={setDateOption} value={dateOption}>
            <View className="flex-row items-center">
              <RadioButton value="yesterday" />
              <Button onPress={() => setDateOption('yesterday')}>Yesterday</Button>
            </View>
            <View className="flex-row items-center">
              <RadioButton value="today" />
              <Button onPress={() => setDateOption('today')}>Today</Button>
            </View>
            <View className="flex-row items-center">
              <RadioButton value="custom" />
              <Button onPress={() => setDateOption('custom')}>Custom Date</Button>
            </View>
          </RadioButton.Group>
          {dateOption === 'custom' && (
            <View className="items-center">
              <DatePicker
                value={date}
                mode="date"
                onChange={(ev: any) => {
                  setDate(new Date(ev.nativeEvent.timestamp));
                  console.log(ev.nativeEvent.timestamp);
                  console.log(date.toLocaleDateString('en-GB'));
                }}
              />
            </View>
          )}
          {/* Amount Inputs */}
          <TextInput
            label="Amount 1"
            keyboardType="numeric"
            value={amt1}
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
          <Button onPress={() => onSave({ date: date.toLocaleDateString('en-GB'), amt1, amt2 })}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
