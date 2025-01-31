import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setQuranProgress } from '../store/slice/userSlice';

export default function QuranReadingScreen() {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.user.quranProgress);

  const handleProgress = () => {
    dispatch(setQuranProgress(progress + 1));
  };

  return (
    <View>
      <Text>Mevcut İlerleme: {progress}</Text>
      <Button title="Sonraki Ayet" onPress={handleProgress} />
    </View>
  );
}
