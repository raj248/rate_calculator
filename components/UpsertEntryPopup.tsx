import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { DatePicker } from '~/components/nativewindui/DatePicker';
import { useRateStore } from '~/store/rateStore';
import { isAfter, startOfMonth } from 'date-fns';

interface AddEntryPopupProps {
  visible: boolean;
  onDismiss: () => void;
}

const StableTextInput = memo(
  ({
    label,
    value,
    onChangeText,
    style,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: object;
  }) => (
    <TextInput
      label={label}
      keyboardType="default"
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      style={style}
      autoCorrect={false}
      autoComplete="off"
      spellCheck={false}
      showSoftInputOnFocus={true}
    />
  )
);

export default function AddEntryPopup({ visible, onDismiss }: AddEntryPopupProps) {
  const [date, setDate] = useState(new Date());
  const [amt1, setAmt1] = useState('');
  const [amt2, setAmt2] = useState('');
  const addEntry = useRateStore((state) => state.upsertEntry);

  // Keep rate1Label in a ref so StableTextInput label prop stays stable
  // and doesn't trigger a re-render/remount when date changes
  const rate1 = isAfter(startOfMonth(date), new Date(2026, 4, 31)) ? 2.75 : 2.5;
  const rate1Ref = useRef(rate1);
  const rate1LabelRef = useRef(rate1 === 2.75 ? '2.75' : '2.5');
  // Only update ref when dialog is not open (between sessions, not mid-typing)
  useEffect(() => {
    if (!visible) {
      rate1Ref.current = rate1;
      rate1LabelRef.current = rate1 === 2.75 ? '2.75' : '2.5';
    }
  }, [visible, rate1]);

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
    const formattedDate = date.toLocaleDateString('en-GB').split('/').join('-');
    addEntry(formattedDate, amt1Value, amt2Value);
    onDismiss();
  };

  const handleAmt1Change = useCallback((text: string) => setAmt1(text), []);
  const handleAmt2Change = useCallback((text: string) => setAmt2(text), []);

  useEffect(() => {
    if (visible) {
      setDate(new Date());
      setAmt1('');
      setAmt2('');
    }
  }, [visible]);

  const total = amt1Value * rate1Ref.current + amt2Value * 2;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ borderRadius: 16 }}>
        <Dialog.Title style={{ textAlign: 'center', fontWeight: '600' }}>Add Entry</Dialog.Title>
        <Dialog.Content>
          <View className="mb-4 items-center">
            <DatePicker
              value={date}
              mode="date"
              onChange={(ev: any) => setDate(new Date(ev.nativeEvent.timestamp))}
            />
          </View>

          <StableTextInput
            label={`Qty at ₹${rate1LabelRef.current}`}
            value={amt1}
            onChangeText={handleAmt1Change}
            style={{ marginBottom: 12 }}
          />
          <StableTextInput label="Qty at ₹2" value={amt2} onChangeText={handleAmt2Change} />

          <View className="mt-4 items-center">
            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
              Total: ₹ {total.toFixed(2)}
            </Text>
            <Text variant="bodySmall" style={{ color: 'gray' }}>
              ({amt1Value} × {rate1LabelRef.current} + {amt2Value} × 2)
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button className="mr-8" onPress={onDismiss}>
            Cancel
          </Button>
          <Button className="px-3" onPress={handleSave} mode="contained">
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
