export const getIDR = (amount) => {
  const formattedAmount = amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });
  return formattedAmount;
}