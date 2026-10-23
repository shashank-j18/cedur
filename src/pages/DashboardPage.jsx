import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config.js';
import { BRAND_NAME, CURRENCY } from '../config/brand.js';
import { 
  Users, 
  Clock, 
  Calculator, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  Building,
  UserCheck,
  Calendar,
  IndianRupee,
  X
} from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New employee form state
  const [newEmp, setNewEmp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Engineering',
    designation: 'Software Engineer',
    monthlySalary: 65000,
    todayAttendance: 'present',
  });
  const [empSubmitting, setEmpSubmitting] = useState(false);
  const [empFeedback, setEmpFeedback] = useState('');

  const navigate = useNavigate();

  const fetchStats = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch(API_ENDPOINTS.dashboardStats, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });

      if (res.status === 401) {
        localStorage.removeItem('auth_token');
        navigate('/login');
        return;
      }

      const resData = await res.json();
      if (res.ok) {
        setData(resData);
      } else {
        setError(resData.message || 'Failed to load dashboard data.');
      }
    } catch (err) {
      setError('Unable to connect to dashboard API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(API_ENDPOINTS.logout, { method: 'POST', credentials: 'include' });
    } catch (err) {
      // ignore
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setEmpSubmitting(true);
    setEmpFeedback('');

    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch(API_ENDPOINTS.dashboardEmployees, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: JSON.stringify(newEmp),
      });

      const resData = await res.json();
      if (res.ok) {
        setModalOpen(false);
        setNewEmp({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          department: 'Engineering',
          designation: 'Software Engineer',
          monthlySalary: 65000,
          todayAttendance: 'present',
        });
        fetchStats(); // Refresh dashboard data
      } else {
        setEmpFeedback(resData.message || 'Failed to add employee.');
      }
    } catch (err) {
      setEmpFeedback('Error connecting to server.');
    } finally {
      setEmpSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-700">Loading Workforce Dashboard...</p>
          <p className="text-xs text-slate-400 mt-1">Connecting to Neon database</p>
        </div>
      </div>
    );
  }

  const user = data?.user || JSON.parse(localStorage.getItem('auth_user') || '{}');
  const stats = data?.stats || {
    totalEmployees: 0,
    attendance: { present: 0, wfh: 0, onLeave: 0, absent: 0, ratePercent: 0 },
    payroll: { totalMonthlyPayoutINR: 0, estimatedPfLiability: 0, estimatedEsicLiability: 0, nextDisbursementDate: '2026-11-01' },
    employees: [],
  };

  const filteredEmployees = (stats.employees || []).filter(e => 
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Top App Header */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-40">
        <div className="section-container py-3.5 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-sky-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                CE
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight hidden sm:inline">
                Ce<span className="text-brand-600">dur</span>
              </span>
            </Link>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Acme Technologies India Pvt Ltd</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">{user.fullName || 'Administrator'}</p>
              <p className="text-[11px] text-slate-500">{user.email || 'admin@yourbrand.com'}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="section-container pt-8">
        
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Workforce Operations Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Live overview for {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-primary text-xs py-2.5 px-4 shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          {/* Card 1: Total Workforce */}
          <div className="card-premium">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Total Workforce</span>
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{stats.totalEmployees}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>100% Onboarded & Verified</span>
            </p>
          </div>

          {/* Card 2: Today's Attendance */}
          <div className="card-premium">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Today's Attendance</span>
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-slate-900">
                {stats.attendance.present + stats.attendance.wfh}
              </p>
              <span className="text-xs text-slate-500">
                / {stats.totalEmployees} Active ({stats.attendance.ratePercent}%)
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3 flex">
              <div 
                className="bg-emerald-500 h-full" 
                style={{ width: `${(stats.attendance.present / (stats.totalEmployees || 1)) * 100}%` }}
                title={`Present: ${stats.attendance.present}`}
              />
              <div 
                className="bg-sky-400 h-full" 
                style={{ width: `${(stats.attendance.wfh / (stats.totalEmployees || 1)) * 100}%` }}
                title={`WFH: ${stats.attendance.wfh}`}
              />
              <div 
                className="bg-amber-400 h-full" 
                style={{ width: `${(stats.attendance.onLeave / (stats.totalEmployees || 1)) * 100}%` }}
                title={`On Leave: ${stats.attendance.onLeave}`}
              />
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> {stats.attendance.present} Office</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-400 inline-block" /> {stats.attendance.wfh} WFH</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> {stats.attendance.onLeave} Leave</span>
            </div>
          </div>

          {/* Card 3: Upcoming Monthly Payroll */}
          <div className="card-premium">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Upcoming Payroll</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              {CURRENCY}{stats.payroll.totalMonthlyPayoutINR.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Disbursement Date: <span className="font-bold text-slate-700">{stats.payroll.nextDisbursementDate}</span>
            </p>
          </div>

          {/* Card 4: Statutory Liabilities */}
          <div className="card-premium">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Statutory Deductions</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-600">
              EPF Liability: <span className="font-bold text-slate-900">{CURRENCY}{stats.payroll.estimatedPfLiability.toLocaleString('en-IN')}</span>
            </p>
            <p className="text-xs text-slate-600 mt-1">
              ESIC Liability: <span className="font-bold text-slate-900">{CURRENCY}{stats.payroll.estimatedEsicLiability.toLocaleString('en-IN')}</span>
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] text-brand-600 font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>Challan files ready for EPFO upload</span>
            </div>
          </div>

        </div>

        {/* Employee Roster Table Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Active Workforce Roster</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time attendance status and monthly remuneration records</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, code, dept..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Code</th>
                  <th className="py-3.5 px-6">Employee</th>
                  <th className="py-3.5 px-6">Department</th>
                  <th className="py-3.5 px-6">Designation</th>
                  <th className="py-3.5 px-6">Monthly Salary</th>
                  <th className="py-3.5 px-6">Today's Punch</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredEmployees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-bold text-slate-500">
                      {emp.employeeCode}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-slate-900">{emp.firstName} {emp.lastName}</div>
                      <div className="text-[11px] text-slate-400">{emp.email}</div>
                    </td>
                    <td className="py-3.5 px-6 font-medium text-slate-600">
                      {emp.department}
                    </td>
                    <td className="py-3.5 px-6 text-slate-500">
                      {emp.designation}
                    </td>
                    <td className="py-3.5 px-6 font-semibold text-slate-900">
                      {CURRENCY}{(emp.monthlySalary || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-6">
                      {emp.todayAttendance === 'present' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Present (Office)
                        </span>
                      )}
                      {emp.todayAttendance === 'wfh' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                          Work From Home
                        </span>
                      )}
                      {emp.todayAttendance === 'on_leave' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          On Leave
                        </span>
                      )}
                      {emp.todayAttendance === 'absent' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Absent (LOP)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Active</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 text-center text-xs text-slate-400">
            Showing {filteredEmployees.length} of {stats.totalEmployees} total workforce records
          </div>

        </div>

      </div>

      {/* Quick Add Employee Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Add New Team Member</h3>
                <p className="text-xs text-slate-400">Registers employee record to Neon database</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newEmp.firstName}
                    onChange={(e) => setNewEmp({ ...newEmp, firstName: e.target.value })}
                    placeholder="e.g. Tarun"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newEmp.lastName}
                    onChange={(e) => setNewEmp({ ...newEmp, lastName: e.target.value })}
                    placeholder="e.g. Mehta"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newEmp.email}
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                    placeholder="tarun@company.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Gross (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newEmp.monthlySalary}
                    onChange={(e) => setNewEmp({ ...newEmp, monthlySalary: Number(e.target.value) })}
                    placeholder="65000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={newEmp.department}
                    onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600 bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Product">Product</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Today's Attendance</label>
                  <select
                    value={newEmp.todayAttendance}
                    onChange={(e) => setNewEmp({ ...newEmp, todayAttendance: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600 bg-white"
                  >
                    <option value="present">Present (Office)</option>
                    <option value="wfh">Work From Home</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  value={newEmp.designation}
                  onChange={(e) => setNewEmp({ ...newEmp, designation: e.target.value })}
                  placeholder="e.g. Senior Backend Engineer"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-600"
                />
              </div>

              {empFeedback && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {empFeedback}
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={empSubmitting}
                  className="btn-primary text-xs py-2 px-5 shadow-sm"
                >
                  {empSubmitting ? 'Saving...' : 'Add to Workforce'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
