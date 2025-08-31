import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { DatePicker } from '~/components/nativewindui/DatePicker';
import { useRateStore } from '~/store/rateStore';

interface AddEntryPopupProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function AddEntryPopup({ visible, onDismiss }: AddEntryPopupProps) {
  const [date, setDate] = useState(new Date());
  const [amt1, setAmt1] = useState(''); // raw string input
  const [amt2, setAmt2] = useState('');

  const addEntry = useRateStore((state) => state.upsertEntry);

  // ✅ Helper: safely evaluate expressions like "25+32+18"
  const parseExpression = (input: string): number => {
    if (!input.trim()) return 0;
    return input
      .split('+')
      .map((n) => Number(n.trim()) || 0)
      .reduce((a, b) => a + b, 0);
  };

  const amt1Value = parseExpression(amt1);
  const amt2Value = parseExpression(amt2);

  const handleSave = () => {
    const formattedDate = date.toLocaleDateString('en-GB').split('/').join('-'); // DD-MM-YYYY
    addEntry(formattedDate, amt1Value, amt2Value);
    onDismiss();
  };

  // Reset fields whenever popup opens
  useEffect(() => {
    if (visible) {
      setDate(new Date());
      setAmt1('');
      setAmt2('');
    }
  }, [visible]);

  // ✅ Compute total live
  const total = amt1Value * 2.5 + amt2Value * 2;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ borderRadius: 16 }}>
        <Dialog.Title style={{ textAlign: 'center', fontWeight: '600' }}>
          Add Entry
        </Dialog.Title>

        <Dialog.Content>
          {/* Date */}
          <View className="items-center mb-4">
            <DatePicker
              value={date}
              mode="date"
              onChange={(ev: any) => setDate(new Date(ev.nativeEvent.timestamp))}
            />
          </View>

          {/* Amount Inputs */}
          <TextInput
            label="Qty at ₹2.5"
            keyboardType="default" // allow "+" typing
            value={amt1}
            onChangeText={setAmt1}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />
          <TextInput
            label="Qty at ₹2"
            keyboardType="default"
            value={amt2}
            onChangeText={setAmt2}
            mode="outlined"
          />

          {/* Total */}
          <View className="mt-4 items-center">
            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
              Total: ₹ {total.toFixed(2)}
            </Text>
            <Text variant="bodySmall" style={{ color: 'gray' }}>
              ({amt1Value} × 2.5 + {amt2Value} × 2)
            </Text>
          </View>
        </Dialog.Content>

        <Dialog.Actions>
          <Button className="mr-8" onPress={onDismiss}>Cancel</Button>
          <Button className="px-3" onPress={handleSave} mode="contained">Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}