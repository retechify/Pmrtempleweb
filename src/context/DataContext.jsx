import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const defaultMangalyaMembers = [
  "S. குழந்தைவேலு – ராமதிலகம்", "S. கந்தசாமி – மஞ்சுளா", "வேலுச்சாமி – ரத்தினா", "சந்திரன் – நந்தினி", "சிவகுமார் – சங்கீதா",
  "சக்திவேல் – சிவலட்சுமி", "ராமசாமி – அமுதா", "குமார் – ஜெயந்தி", "கோவிந்தசாமி – லட்சுமி", "சுப்பிரமணி – கோகிலா",
  "ரவி – துளசிமணி", "திருமுருகன் – வசந்தி", "பழனிசாமி – அன்னக்கிளி", "கிட்டுசாமி – பழனியம்மாள்", "சண்முகம் – லலிதா",
  "பாலசுப்ரமணி – ராஜேஸ்வரி", "செந்தில்குமார் – கருப்பத்தாள்", "செந்தில்குமார் – கோமதி", "கார்த்தி – மோகனப்பிரியா", "E.B பழனிசாமி – பூங்கொடி",
  "அர்ச்சுனன் – சரஸ்வதி", "சுரேஷ்குமார் – சங்கீதா", "பழனிசாமி – கீர்த்திகா", "ஆறுச்சாமி – சுப்பத்தாள்", "மயில்சாமி – கெளசல்யா",
  "ராமசாமி – ஈஸ்வரி", "இலட்சுமணன் – நாகம்மாள்", "கதிர்வேல் – சாந்தி", "சுப்பிரமணியம் – லட்சுமி", "விஜயகுமார் – சாந்தி",
  "சக்திவேல் – வரேதி", "கந்தசாமி – ராமாத்தாள்", "ரங்கசாமி – வசந்தா", "ஆறுமுகம் – சீதா", "வெள்ளிங்கிரி – சரண்யா",
  "வெள்ளிங்கிரி – கிருஷ்ணவேணி", "வீரகுமார் – மலர்விழி", "சக்திவேல் – பூரணி", "ராமசாமி – வசந்தா", "வேலுச்சாமி – பூங்கொடி",
  "மணிகண்டன் – ரஞ்சினி", "அய்யாசாமி – சுலோச்சனா", "ரவிச்சந்திரன் – மேனகா", "குப்புசாமி – ரம்யா", "ஈஸ்வரன் – லிங்கம்மாள்",
  "வடிவேல் – வசந்தி", "பிரகாஷ் – கெளதமி", "முத்துசாமி – மாரியம்மாள்", "சுப்பிரமணி – பாப்பா", "பொன்னுசாமி – பழனியம்மாள்",
  "கோபாலகிருஷ்ணன் – சாந்தி", "ரமேஷ் – சரண்யா", "பத்ரசாமி – முருகேஸ்வரி", "கதிர்வேல் – ஐஸ்வர்யா", "ரங்கசாமி – லட்சுமி",
  "சண்முகம் – விநோதினி", "நாகராஜ் – நாகமணி", "விஜயகுமார் – கவின்", "முருகன் – விஜயா", "ராமசாமி – ஜெயா",
  "மணிகண்டன் – சௌந்தர்யா", "முருகேஷ் – சரஸ்வதி", "மூர்த்தி – வரேதி", "தர்மராஜ் – மாணிக்கம்", "தங்கவேல் – சுமதி",
  "பாலன் – நளினி", "கோபாலகிருஷ்ணன் – திவ்யா", "சங்கர் – ஜெயஸ்ரீ", "முருகேஷ் – செல்வி", "பூபதி – செல்வி",
  "தங்கவேல் – மயிலத்தாள்", "துரைசாமி – உலகம்பாள்", "குணசேகரன் – சத்யப்ரியா", "மோகன் – மாரியம்மாள்", "சக்திவேல் – வளர்மணி",
  "ராஜன் – சாந்தி", "ராஜன் – சித்ரா", "ஆறுச்சாமி – சரஸ்வதி", "மாணிக்கராஜ் – சந்திரகலா", "செந்தில்குமார் – கயல்விழி (ஆனந்தி)",
  "சுப்பிரமணி – கலாமணி", "மாரிமுத்து – மோகனம்பாள்", "ரவி – கிருஷ்ணவேணி (பாப்பி)", "சிவகுமார் – வித்யா", "மாது – மணியா",
  "நடராஜன் – கலாமணி", "துரைசாமி – ரம்யா", "M.P பழனிசாமி – சந்தியா", "தங்கவேல் – பத்மா", "சசிகுமார் – வனிதா",
  "சிவா – அருக்காணி", "கருப்பசாமி – ஜெயத்தாள்", "ஆறுமுகம் – ஜோதிமணி", "சாமிநாதன் – காயத்ரி", "கார்த்திகேயன் – சீதாலட்சுமி",
  "சின்னசாமி – ராசாமணி", "மாரிமுத்து – சௌந்தர்யா", "ஆரோக்கியசாமி – கலாவாணி", "கதிர் – கோமதி", "முத்து – சித்ரா",
  "விக்னேஷ் – சங்கீதா", "பார்த்திபன் – கார்த்திகா", "மகேஷ்குமார் – வரேதி", "முத்துசாமி – தேவி", "முனியப்பன் – சத்யப்ரியா",
  "ஆறுமுகம் – சுந்தரம்பாள்", "மாரிமுத்து – ஈஸ்வரி", "ரங்கநாதன் – சரிதா"
].map((name, index) => ({
  id: `default_m_${index + 1}`,
  name: name,
  category: 'Mangalya Contribution',
  amountPaid: 0,
  paymentDate: '',
}));

export const DataProvider = ({ children }) => {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('temple_members');
    const parsed = saved ? JSON.parse(saved) : [];
    
    // Auto-populate the 108 names if they are entirely missing from local storage
    const existingNames = new Set(parsed.map(m => m.name));
    const toAdd = defaultMangalyaMembers.filter(m => !existingNames.has(m.name));
    return [...parsed, ...toAdd];
  });

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('temple_donations');
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('temple_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('temple_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('temple_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('temple_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Actions
  const addMember = (member) => setMembers([...members, { id: Date.now().toString(), ...member }]);
  const updateMember = (updated) => setMembers(members.map(m => m.id === updated.id ? updated : m));
  const deleteMember = (id) => setMembers(members.filter(m => m.id !== id));

  const addDonation = (donation) => setDonations([...donations, { id: Date.now().toString(), ...donation }]);
  const updateDonation = (updated) => setDonations(donations.map(d => d.id === updated.id ? updated : d));
  const deleteDonation = (id) => setDonations(donations.filter(d => d.id !== id));

  const addTransaction = (txn) => setTransactions([...transactions, { id: Date.now().toString(), ...txn }]);
  const deleteTransaction = (id) => setTransactions(transactions.filter(t => t.id !== id));

  // Derived calculations for Contributions Tracking
  const totalMangalya = members.filter(m => m.category === 'Mangalya Contribution').reduce((acc, curr) => acc + Number(curr.amountPaid || 0), 0);
  const totalFamily = members.filter(m => m.category === 'Family Contribution').reduce((acc, curr) => acc + Number(curr.amountPaid || 0), 0);
  const totalDonationsList = donations.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  // General Ledger Auto-Calculations
  const totalIncome = transactions.filter(t => t.type === 'Credit').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'Debit').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <DataContext.Provider value={{
      members, addMember, updateMember, deleteMember,
      donations, addDonation, updateDonation, deleteDonation,
      transactions, addTransaction, deleteTransaction,
      stats: {
        totalMangalya,
        totalFamily,
        totalDonationsList,
        totalIncome,
        totalExpense,
        netBalance
      }
    }}>
      {children}
    </DataContext.Provider>
  );
};
