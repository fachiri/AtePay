import { BackHandler, ToastAndroid } from 'react-native';

const backButtonPressCount = { current: 0 };

export const handleBackPress = () => {
  backButtonPressCount.current += 1;

  if (backButtonPressCount.current === 2) {
    // Menutup aplikasi jika tombol kembali ditekan dua kali
    BackHandler.exitApp();
  } else {
    // Tampilkan pesan bahwa tombol kembali harus ditekan dua kali
    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
  }

  // Reset jumlah tekanan tombol kembali setelah 2 detik
  setTimeout(() => {
    backButtonPressCount.current = 0;
  }, 2000);

  return true;
};
