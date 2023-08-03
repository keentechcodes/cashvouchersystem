export const VoucherContext = React.createContext();

export function VoucherProvider({ children }) {
  const [vouchers, setVouchers] = useState([]);

  // Add a function to refresh the vouchers
  const refreshVouchers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vouchers');
      setVouchers(response.data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };

  // Initially load vouchers
  useEffect(() => {
    refreshVouchers();
  }, []);

  return (
    <VoucherContext.Provider value={{ vouchers, refreshVouchers }}>
      {children}
    </VoucherContext.Provider>
  );
}
