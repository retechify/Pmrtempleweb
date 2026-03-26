import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const EventExpenses = () => {
  const { events, addEvent, addExpense, deleteExpense } = useContext(DataContext);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [showExpenseModal, setShowExpenseModal] = useState(null); // stores event ID
  const [expenseData, setExpenseData] = useState({ name: '', amount: '', date: '' });

  const handleAddEvent = (e) => {
    e.preventDefault();
    addEvent({ name: newEventName, createdDate: new Date().toISOString().split('T')[0] });
    setNewEventName('');
    setShowEventModal(false);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    addExpense(showExpenseModal, {
      name: expenseData.name,
      amount: Number(expenseData.amount),
      date: expenseData.date || new Date().toISOString().split('T')[0]
    });
    setExpenseData({ name: '', amount: '', date: '' });
    setShowExpenseModal(null);
  };

  const toggleEvent = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-maroon)', fontSize: '2rem' }}>
          Event Expense Notebook
        </h1>
        <button className="btn btn-primary" onClick={() => setShowEventModal(true)}>
          <Plus size={18} /> Create New Event
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {events.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ color: 'var(--clr-text-muted)', marginBottom: '1rem' }}>No events tracked yet.</p>
            <button className="btn btn-outline" onClick={() => setShowEventModal(true)}>Create First Event</button>
          </div>
        ) : (
          events.map(ev => {
            const evTotal = ev.expenses.reduce((acc, ex) => acc + ex.amount, 0);
            const isExpanded = expandedEvent === ev.id;
            
            return (
              <motion.div key={ev.id} className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: 0, overflow: 'hidden' }}>
                {/* Event Header */}
                <div 
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: isExpanded ? 'var(--clr-surface)' : 'transparent', cursor: 'pointer', transition: 'background 0.3s' }}
                  onClick={() => toggleEvent(ev.id)}
                >
                  <div>
                    <h2 style={{ color: 'var(--clr-maroon)', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.25rem' }}>{ev.name}</h2>
                    <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.85rem' }}>Created: {ev.createdDate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)' }}>Total Expense</p>
                      <h3 style={{ color: 'var(--clr-danger)' }}>₹{evTotal}</h3>
                    </div>
                    <div>
                      {isExpanded ? <ChevronUp size={24} color="var(--clr-text-muted)" /> : <ChevronDown size={24} color="var(--clr-text-muted)" />}
                    </div>
                  </div>
                </div>

                {/* Event Details (Expenses) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      style={{ borderTop: '1px solid #eee' }}
                    >
                      <div style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                          <h4 style={{ color: 'var(--clr-text-main)' }}>Expense Breakdown</h4>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={(e) => { e.stopPropagation(); window.print(); }}>
                              <Download size={16} /> Export Report
                            </button>
                            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={(e) => { e.stopPropagation(); setShowExpenseModal(ev.id); }}>
                              <Plus size={16} /> Add Item
                            </button>
                          </div>
                        </div>

                        {ev.expenses.length > 0 ? (
                          <div className="table-container">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Item Name</th>
                                  <th>Date</th>
                                  <th style={{ textAlign: 'right' }}>Amount</th>
                                  <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ev.expenses.map(ex => (
                                  <tr key={ex.id}>
                                    <td>{ex.name}</td>
                                    <td>{ex.date}</td>
                                    <td style={{ textAlign: 'right', color: 'var(--clr-danger)', fontWeight: '500' }}>₹{ex.amount}</td>
                                    <td style={{ textAlign: 'center' }}>
                                      <button onClick={() => deleteExpense(ev.id, ex.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-danger)' }}>
                                        <Trash2 size={16} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p style={{ color: 'var(--clr-text-muted)', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>No expenses recorded yet.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      {/* New Event Modal */}
      {showEventModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <motion.div className="card" style={{ width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Create New Event</h2>
            <form onSubmit={handleAddEvent}>
              <div className="form-group">
                <label className="form-label">Event Name (e.g., Navaratri Festival)</label>
                <input type="text" className="form-control" required value={newEventName} onChange={(e) => setNewEventName(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowEventModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* New Expense Modal */}
      {showExpenseModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <motion.div className="card" style={{ width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Add Expense Item</h2>
            <form onSubmit={handleAddExpense}>
              <div className="form-group">
                <label className="form-label">Item / Category</label>
                <select className="form-control" required value={expenseData.name} onChange={(e) => setExpenseData({...expenseData, name: e.target.value})}>
                  <option value="" disabled>Select category</option>
                  <option value="Decoration">Decoration</option>
                  <option value="Drums / Music">Drums / Music</option>
                  <option value="Food / Prasadam">Food / Prasadam</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input type="number" className="form-control" required min="1" value={expenseData.amount} onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Date (Optional)</label>
                <input type="date" className="form-control" value={expenseData.date} onChange={(e) => setExpenseData({...expenseData, date: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowExpenseModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EventExpenses;
