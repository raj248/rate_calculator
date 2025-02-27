import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, TextInput, RadioButton } from 'react-native-paper';
import { DatePicker } from '~/components/nativewindui/DatePicker';
import { useRateStore } from '~/store/rateStore';

interface AddEntryPopupProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function AddEntryPopup({ visible, onDismiss }: AddEntryPopupProps) {
  const [date, setDate] = useState(new Date());
  const [amt1, setAmt1] = useState('');
  const [amt2, setAmt2] = useState('');

  const addEntry = useRateStore((state) => state.upsertEntry);

  const handleSave = () => {
    const formattedDate = date.toLocaleDateString('en-GB').split('/').join('-'); // Format: DD-MM-YYYY
    addEntry(formattedDate, Number(amt1) || 0, Number(amt2) || 0);
    setDate(new Date()); setAmt1(''); setAmt2('');
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Add Entry</Dialog.Title>
        <Dialog.Content>
          <View className="items-center">
            <DatePicker value={date} mode="date" onChange={(ev: any) => setDate(new Date(ev.nativeEvent.timestamp))} />
          </View>

          {/* Amount Inputs */}
          <TextInput label="Amount 1" keyboardType="numeric" value={amt1} onChangeText={setAmt1} mode="outlined" />
          <TextInput label="Amount 2" keyboardType="numeric" value={amt2} onChangeText={setAmt2} mode="outlined" className="mt-2" />
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
