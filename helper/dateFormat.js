export const getDateTimeOneDayAhead = () => {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Satu hari dalam milidetik

  // Ambil waktu sekarang dan tambahkan satu hari
  const oneDayAheadDate = new Date(Date.now() + oneDayInMilliseconds);

  // Format tanggal dan waktu sebagai "YYYY-MM-DD HH:mm"
  const formattedDateTime = oneDayAheadDate.toISOString().slice(0, 16).replace('T', ' ');

  return formattedDateTime;
}

export const getGreeting = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Selamat Pagi";
  } else if (currentHour >= 12 && currentHour < 15) {
    return "Selamat Siang";
  } else if (currentHour >= 15 && currentHour < 18) {
    return "Selamat Sore";
  } else {
    return "Selamat Malam";
  }
};

export const getDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString('id-ID', options);
}

export const getFullDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};