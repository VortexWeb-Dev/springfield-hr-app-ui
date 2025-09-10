import React, { useMemo, useState, useEffect } from "react";
import {
  CheckCircle2,
  CircleAlert,
  CircleDot,
  Clock,
  Download,
  FileText,
  GraduationCap,
  ListChecks,
  LogOut,
  Mail,
  Phone,
  Search,
  Send,
  Settings,
  User2,
  Plus,
  CalendarDays,
  BadgeCheck,
  Upload,
  Edit,
  X,
  Laptop,
  ShieldCheck,
  BookOpen,
  Award,
  Video,
  BarChart3,
  FileSpreadsheet,
  Gift,
  Briefcase,
  MessageSquare,
  MapPin,
  CalendarCheck,
  UserMinus,
  Plane,
  Moon,
  Save,
  PlayCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/*************************************
 * Springfield palette + helpers
 *************************************/
const brand = {
  primary: "#00205B",
  primaryDark: "#001B3F",
  accentRed: "#E30613",
  surface: "#FFFFFF",
  panel: "#F5F7FA",
  border: "#E5E7EB",
  text: "#111827",
  muted: "#6B7280",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  primaryLight: "#E9F3FF",
};

const Card = ({ c = "", children, ...p }) => (
  <div
    className={`rounded-2xl bg-white border shadow-sm ${c}`}
    style={{ borderColor: brand.border }}
    {...p}
  >
    {children}
  </div>
);
const CardBody = ({ c = "", children }) => (
  <div className={`p-5 ${c}`}>{children}</div>
);
const Button = ({ c = "", v = "primary", children, ...p }) => {
  const base =
    "px-4 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 whitespace-nowrap";
  const styles = {
    primary: { background: brand.primary, color: "#fff" },
    outline: {
      background: "#fff",
      color: brand.primary,
      border: `1px solid ${brand.border}`,
    },
    subtle: {
      background: brand.panel,
      color: brand.text,
      border: `1px solid ${brand.border}`,
    },
    danger: { background: brand.danger, color: "#fff" },
  };
  return (
    <button className={`${base} ${c}`} style={styles[v]} {...p}>
      {children}
    </button>
  );
};
const Input = ({ c = "", ...p }) => (
  <input
    className={`w-full rounded-xl px-3 py-2 text-sm border focus:outline-none ${c}`}
    style={{ borderColor: brand.border, background: brand.surface }}
    {...p}
  />
);
const Select = ({ c = "", children, ...p }) => (
  <select
    className={`w-full rounded-xl px-3 py-2 text-sm border bg-white focus:outline-none ${c}`}
    style={{ borderColor: brand.border, background: brand.surface }}
    {...p}
  >
    {children}
  </select>
);
const Textarea = ({ c = "", ...p }) => (
  <textarea
    className={`w-full rounded-xl px-3 py-2 text-sm border bg-white focus:outline-none ${c}`}
    rows={4}
    style={{ borderColor: brand.border, background: brand.surface }}
    {...p}
  />
);
const Badge = ({ tone = "default", children }) => {
  const map = {
    default: brand.panel,
    info: brand.primaryLight,
    success: "#EBFBF5",
    danger: "#FEF2F2",
    warn: brand.primaryLight,
  };
  const col = {
    default: brand.text,
    info: brand.primary,
    success: "#065F46",
    danger: "#991B1B",
    warn: brand.accentRed,
  }[tone];
  return (
    <span
      className="px-2 py-1 text-xs rounded-full font-medium"
      style={{ background: map[tone], color: col }}
    >
      {children}
    </span>
  );
};
const Field = ({ label, required, children, hint }) => (
  <label className="text-sm block">
    <div className="mb-1 text-gray-600">
      {label} {required && <span className="text-red-500">*</span>}
    </div>
    {children}
    {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
  </label>
);

/*************************************
 * Demo data & helpers
 *************************************/
const people = [
  {
    id: 8,
    name: "Elena Petrova",
    firstName: "Elena",
    lastName: "Petrova",
    secondName: "",
    role: "Sales Executive",
    designation: "Sales Executive",
    email: "elena@example.com",
    phone: "+971 50 111 2223",
    dob: "1990-09-28",
    hireDate: "2022-03-15",
    photo: "https://i.pravatar.cc/150?img=44",
    department: "Agents",
    manager: "Madhu Kumar",
    compensationNotes: "Standard commission structure.",
    training: [
      { id: "C-1", progress: 80 },
      { id: "C-4", progress: 40 },
    ],
    attendance: [
      {
        date: "2025-08-25",
        checkIn: "09:00",
        checkOut: "17:30",
        location: "25.2048, 55.2708",
      },
    ],
    lateShift: false,
    notificationLang: "English",
    nationality: "Russian",
    passport: "P123456",
    labourCard: "LC98765",
    labourExp: "2026-03-14",
    emiratesId: "784-1990-1234567-1",
    emiratesIdExp: "2026-03-14",
    visa: "V555666",
    visaExp: "2026-03-14",
    reraCard: "BRN54321",
    emaarReg: "Yes",
    damacAccess: "Yes",
    insurance: "MetLife",
    insuranceCard: "INS-EP-001",
    hiredBy: "Natalia Panaskina",
    reraNum: "54321",
    team: "Team A",
  },
  {
    id: 12,
    name: "Natalia Panaskina",
    firstName: "Natalia",
    lastName: "Panaskina",
    secondName: "Alex",
    role: "HR Manager",
    designation: "HR Manager",
    email: "natalia@example.com",
    phone: "+971 50 987 0000",
    dob: "1985-11-10",
    hireDate: "2018-07-01",
    photo: "https://placehold.co/150x150/E5E7EB/6B7280?text=NP",
    department: "HR",
    manager: "Director",
    compensationNotes: "Salary + Performance Bonus.",
    training: [
      { id: "C-2", progress: 100 },
      { id: "C-3", progress: 90 },
    ],
    attendance: [
      {
        date: "2025-08-25",
        checkIn: "08:45",
        checkOut: "18:00",
        location: "25.2048, 55.2708",
      },
    ],
    lateShift: true,
    notificationLang: "English",
    nationality: "Ukrainian",
    passport: "P654321",
    labourCard: "LC54321",
    labourExp: "2025-06-30",
    emiratesId: "784-1985-7654321-1",
    emiratesIdExp: "2025-06-30",
    visa: "V777888",
    visaExp: "2025-06-30",
    reraCard: "N/A",
    emaarReg: "N/A",
    damacAccess: "N/A",
    insurance: "AXA",
    insuranceCard: "INS-NP-001",
    hiredBy: "Director",
    reraNum: "N/A",
    team: "Team B",
  },
  {
    id: 23,
    name: "Anne Lacad",
    role: "HR Officer",
    email: "anne@example.com",
    phone: "+971 55 444 1212",
    dob: "1992-08-26",
    hireDate: "2023-01-20",
    photo: "https://placehold.co/150x150/E5E7EB/6B7280?text=AL",
    department: "HR",
    manager: "Natalia Panaskina",
    compensationNotes: "Standard salary.",
    training: [
      { id: "C-1", progress: 100 },
      { id: "C-5", progress: 70 },
    ],
    attendance: [
      {
        date: "2025-08-25",
        checkIn: "09:15",
        checkOut: "17:45",
        location: "25.2048, 55.2708",
      },
    ],
    lateShift: false,
    team: "Team A",
  },
  {
    id: 30,
    name: "Omar Nasser",
    role: "Property Consultant",
    email: "omar@example.com",
    phone: "+971 50 222 3333",
    dob: "1988-10-05",
    hireDate: "2021-09-01",
    photo: "https://placehold.co/150x150/E5E7EB/6B7280?text=ON",
    department: "Agents",
    manager: "Madhu Kumar",
    compensationNotes: "High-performer commission tier.",
    training: [{ id: "C-4", progress: 60 }],
    attendance: [
      {
        date: "2025-08-25",
        checkIn: "09:05",
        checkOut: "19:15",
        location: "25.1972, 55.2744",
      },
    ],
    lateShift: true,
    team: "Team B",
  },
  {
    id: 35,
    name: "Sarah Jones",
    role: "Marketing Specialist",
    email: "sarah@example.com",
    phone: "+971 52 123 4567",
    dob: "1995-09-01",
    hireDate: "2024-02-14",
    photo: "https://i.pravatar.cc/150?img=11",
    department: "Marketing",
    manager: "Marketing Manager",
    compensationNotes: "Standard salary.",
    training: [{ id: "C-1", progress: 90 }],
    attendance: [
      {
        date: "2025-08-25",
        checkIn: "09:00",
        checkOut: "17:00",
        location: "25.2048, 55.2708",
      },
    ],
    lateShift: false,
  },
  {
    id: 42,
    name: "Madhu Kumar",
    role: "Sales Manager",
    email: "madhu@example.com",
    phone: "+971 50 555 1111",
    dob: "1982-05-20",
    hireDate: "2017-11-10",
    photo: "https://i.pravatar.cc/150?img=56",
    department: "Management",
    manager: "Director",
    compensationNotes: "Salary + Team Commission Override.",
    training: [],
    attendance: [
      {
        date: "2025-08-25",
        checkIn: "08:50",
        checkOut: "18:30",
        location: "25.2048, 55.2708",
      },
    ],
    lateShift: true,
    team: "Team A",
  },
  {
    id: 55,
    name: "Chen Wei",
    role: "Investment Advisor",
    email: "chen@example.com",
    phone: "+971 56 111 8888",
    dob: "1991-03-12",
    hireDate: "2023-08-01",
    photo: "https://i.pravatar.cc/150?img=32",
    department: "Agents",
    manager: "Madhu Kumar",
    compensationNotes: "Focus on international clients.",
    training: [{ id: "C-2", progress: 75 }],
    attendance: [
      {
        date: "2025-08-25",
        checkIn: "09:10",
        checkOut: "18:05",
        location: "25.2048, 55.2708",
      },
    ],
    lateShift: false,
    team: "Team B",
  },
  {
    id: 62,
    name: "Fatima Al-Sayed",
    role: "Leasing Coordinator",
    email: "fatima@example.com",
    phone: "+971 55 222 7777",
    dob: "1996-07-22",
    hireDate: "2024-05-15",
    photo: "https://i.pravatar.cc/150?img=49",
    department: "Leasing",
    manager: "Leasing Manager",
    compensationNotes: "Standard salary.",
    training: [{ id: "C-1", progress: 100 }],
    attendance: [
      {
        date: "2025-08-25",
        checkIn: "08:55",
        checkOut: "17:35",
        location: "25.2048, 55.2708",
      },
    ],
    lateShift: false,
    team: "Team C",
  },
];

const catalog = [
  {
    id: "C-1",
    title: "Welcome Course",
    area: "General",
    level: "Beginner",
    hours: 2,
    lessons: 8,
    description:
      "An essential introduction to Springfield's culture, values, and key personnel. Covers company history, mission, and our commitment to excellence in the UAE real estate market.",
    image:
      "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=1200",
  },
  {
    id: "C-2",
    title: "Key Systems & Registers (Dubai)",
    area: "Compliance",
    level: "Intermediate",
    hours: 4,
    lessons: 12,
    description:
      "A deep dive into the Dubai Land Department (DLD) systems, including Trakheesi for permits, and the Oqood portal for off-plan registration. Mandatory for all sales and leasing agents.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
  },
  {
    id: "C-3",
    title: "Dubai RE Law Essentials",
    area: "Compliance",
    level: "Intermediate",
    hours: 3,
    lessons: 10,
    description:
      "Covers Law No. 26 of 2007 (Landlord-Tenant Relationship), Form F (MOU), and other critical real estate regulations in Dubai to ensure full compliance.",
    image:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1200",
  },
  {
    id: "C-4",
    title: "Community Masterclass (Emaar/Damac)",
    area: "Sales",
    level: "Advanced",
    hours: 5,
    lessons: 14,
    description:
      "Advanced sales techniques and in-depth knowledge of major developer communities like Downtown Dubai, Dubai Hills Estate (Emaar), and DAMAC Hills.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
  },
  {
    id: "C-5",
    title: "Lead Handling & Telephony (Bitrix24)",
    area: "Sales",
    level: "Beginner",
    hours: 2,
    lessons: 6,
    description:
      "Mastering lead management in our CRM, Bitrix24. Learn best practices for call scripts, lead nurturing, and converting inquiries into viewings.",
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200",
  },
];
const videos = [
  {
    id: "V-1",
    title: "Mastering the Cold Call",
    duration: "8:45 min",
    area: "Sales",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "V-2",
    title: "How to Fill Form F Correctly",
    duration: "12:30 min",
    area: "Compliance",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "V-3",
    title: "Presenting Off-Plan Projects",
    duration: "15:10 min",
    area: "Sales",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "V-4",
    title: "Trakheesi Permit Application Guide",
    duration: "7:20 min",
    area: "Compliance",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];
const certs = [
  {
    id: "CERT-1",
    title: "RERA Certified Broker Card",
    issueDate: "2024-01-15",
    expiry: "2026-01-14",
  },
  {
    id: "CERT-2",
    title: "Certified Off-Plan Specialist",
    issueDate: "2024-03-20",
    expiry: "N/A",
  },
  {
    id: "CERT-3",
    title: "Anti-Money Laundering (AML) Training",
    issueDate: "2025-06-01",
    expiry: "2026-05-31",
  },
];

const vacations = [
  { employeeId: 35, start: "2025-08-28", end: "2025-09-05", type: "Annual" },
  { employeeId: 30, start: "2025-09-01", end: "2025-09-02", type: "Sick" },
  { employeeId: 55, start: "2025-08-26", end: "2025-09-10", type: "Annual" },
];

let reqCounter = 1401;
const makeId = () => `REQ-${reqCounter++}`;
const today = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

const OFFICE_LOCATION = { latitude: 25.2048, longitude: 55.2708 };
const GEOLOCATION_THRESHOLD_KM = 0.5;

/*************************************
 * Approval routes & Status Logic
 *************************************/
const approvalPaths = {
  salary: ["Manager", "HR"],
  noc: ["Manager", "HR", "Director"],
  leave_Agents: ["Manager", "Madhu Kumar", "HR"],
  leave_Marketing: ["Marketing Manager", "HR"],
  leave_default: ["Manager", "HR"],
  onboarding: ["HR", "IT", "Manager"],
  offboarding: ["Manager", "IT", "HR", "Finance"],
};
const nextStatus = (current, path) => {
  if (!current) return `${path[0]} Pending`;
  const idx = path.findIndex((p) => current.startsWith(p));
  if (idx === -1) return `${path[0]} Pending`;
  if (current.endsWith("Approved") && idx < path.length - 1)
    return `${path[idx + 1]} Pending`;
  if (current.endsWith("Pending")) return `${path[idx]} Approved`;
  return "Final Approved";
};

/*************************************
 * Navigation Menus (Role-Based)
 *************************************/
const NAV_AGENT = [
  { key: "salary", label: "Salary Certificate", icon: <FileText size={18} /> },
  { key: "noc", label: "NOC Certificate", icon: <FileText size={18} /> },
  { key: "requests", label: "My Requests", icon: <ListChecks size={18} /> },
  { key: "leave", label: "Leave Application", icon: <Clock size={18} /> },
  {
    key: "training",
    label: "My Training Path",
    icon: <GraduationCap size={18} />,
  },
  {
    key: "attendance",
    label: "My Attendance",
    icon: <CalendarCheck size={18} />,
  },
  { key: "academy", label: "Academy", icon: <BookOpen size={18} /> },
  {
    key: "documents",
    label: "Docs Center",
    icon: <FileSpreadsheet size={18} />,
  },
];

const NAV_HR = [
  { key: "salary", label: "Salary Certificate", icon: <FileText size={18} /> },
  { key: "noc", label: "NOC Certificate", icon: <FileText size={18} /> },
  { key: "requests", label: "My Requests", icon: <ListChecks size={18} /> },
  { key: "leave", label: "Leave Application", icon: <Clock size={18} /> },
  { key: "vacations", label: "Vacation List", icon: <Plane size={18} /> },
  { key: "birthdays", label: "Birthdays & Anniv.", icon: <Gift size={18} /> },
  {
    key: "training",
    label: "Training Paths",
    icon: <GraduationCap size={18} />,
  },
  { key: "attendance", label: "Attendance", icon: <CalendarCheck size={18} /> },
  { key: "academy", label: "Academy", icon: <BookOpen size={18} /> },
  { key: "onboarding", label: "Onboarding", icon: <User2 size={18} /> },
  { key: "offboarding", label: "Offboarding", icon: <UserMinus size={18} /> },
  {
    key: "documents",
    label: "Docs Center",
    icon: <FileSpreadsheet size={18} />,
  },
  {
    key: "approvals",
    label: "Approvals Center",
    icon: <CircleDot size={18} />,
  },
  { key: "directory", label: "Directory", icon: <Search size={18} /> },
  { key: "settings", label: "Settings", icon: <Settings size={18} /> },
];

/*************************************
 * Main App Component
 *************************************/
export default function HRAppV4() {
  const [role, setRole] = useState("agent"); // 'agent' or 'hr_manager'
  const [currentUser, setCurrentUser] = useState(
    people.find((p) => p.id === 8)
  ); // Default to Elena (Agent)
  const [active, setActive] = useState("attendance");
  const [requests, setRequests] = useState([
    {
      id: makeId(),
      type: "NOC Certificate",
      userId: 8,
      assignee: "Anne Lacad",
      date: "2025-07-05",
      status: "Final Approved",
      remarks: "Approved",
      downloadable: true,
    },
    {
      id: makeId(),
      type: "Salary Certificate",
      userId: 8,
      assignee: "Natalia Panaskina",
      date: "2025-06-18",
      status: "Manager Pending",
      remarks: "-",
      downloadable: false,
    },
    {
      id: makeId(),
      type: "Leave Application",
      userId: 30,
      assignee: "Madhu Kumar",
      date: "2025-08-20",
      status: "Manager Approved",
      remarks: "Approved by Manager",
      downloadable: false,
    },
    {
      id: makeId(),
      type: "Salary Certificate",
      userId: 35,
      assignee: "Marketing Manager",
      date: "2025-08-22",
      status: "Manager Pending",
      remarks: "Urgent",
      downloadable: false,
    },
  ]);
  const [wishModal, setWishModal] = useState(null);
  const [peopleData, setPeopleData] = useState(people); // State for mutable people data
  const [editModalPerson, setEditModalPerson] = useState(null);
  const [contentModal, setContentModal] = useState(null); // For viewing docs, courses, videos

  useEffect(() => {
    if (role === "agent") {
      setCurrentUser(peopleData.find((p) => p.id === 8));
      setActive("attendance");
    } else {
      setCurrentUser(peopleData.find((p) => p.id === 12));
      setActive("approvals");
    }
  }, [role, peopleData]);

  const NAV = role === "agent" ? NAV_AGENT : NAV_HR;
  const pendingForMe = useMemo(
    () => requests.filter((r) => /Pending/.test(r.status)),
    [requests]
  );
  const myRequests = useMemo(
    () => requests.filter((r) => r.userId === currentUser.id),
    [requests, currentUser]
  );

  const addRequestHandler = (payload) => {
    addRequest(setRequests, payload, currentUser);
    setActive("requests");
  };

  const handleSaveSensitiveInfo = (updatedPerson) => {
    setPeopleData((prev) =>
      prev.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
    );
    setEditModalPerson(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: brand.panel }}>
      <div
        className="sticky top-0 z-20 border-b bg-white"
        style={{ borderColor: brand.border }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
              style={{ background: brand.primary, color: brand.surface }}
            >
              SP
            </div>
            <div>
              <div className="text-xs" style={{ color: brand.muted }}>
                Welcome back, {currentUser.name.split(" ")[0]}
              </div>
              <div
                className="text-base font-semibold"
                style={{ color: brand.text }}
              >
                Springfield HR App
              </div>
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm">
            <span>View as:</span>
            <div
              className="p-1 rounded-xl flex border"
              style={{ background: brand.panel, borderColor: brand.border }}
            >
              <button
                onClick={() => setRole("agent")}
                className={`px-3 py-1 rounded-lg ${
                  role === "agent" ? "bg-white shadow-sm" : ""
                }`}
              >
                Agent
              </button>
              <button
                onClick={() => setRole("hr_manager")}
                className={`px-3 py-1 rounded-lg ${
                  role === "hr_manager" ? "bg-white shadow-sm" : ""
                }`}
              >
                HR Manager
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-3">
          <Card>
            <CardBody c="p-0">
              <nav className="flex flex-col">
                {NAV.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActive(item.key)}
                    className={`flex items-center gap-3 px-4 py-3 text-left border-b ${
                      active === item.key
                        ? "font-semibold"
                        : "hover:bg-[#F8FBFF]"
                    }`}
                    style={{
                      borderColor: brand.border,
                      backgroundColor:
                        active === item.key
                          ? brand.primaryLight
                          : brand.surface,
                      color: active === item.key ? brand.primary : brand.text,
                    }}
                  >
                    <span
                      style={{
                        color:
                          active === item.key ? brand.accentRed : brand.primary,
                      }}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {item.key === "approvals" && pendingForMe.length > 0 && (
                      <Badge tone="warn">{pendingForMe.length}</Badge>
                    )}
                  </button>
                ))}
              </nav>
            </CardBody>
          </Card>
        </aside>

        <section className="col-span-12 md:col-span-9">
          {active === "salary" && (
            <SalaryCertificate
              onSubmit={addRequestHandler}
              user={currentUser}
            />
          )}
          {active === "noc" && (
            <NOCCertificate onSubmit={addRequestHandler} user={currentUser} />
          )}
          {active === "requests" && (
            <MyRequests requests={myRequests} setRequests={setRequests} />
          )}
          {active === "leave" && (
            <LeaveApplication onSubmit={addRequestHandler} user={currentUser} />
          )}
          {active === "vacations" && (
            <VacationList vacations={vacations} people={peopleData} />
          )}
          {active === "birthdays" && (
            <BirthdaysAnniversaries
              people={peopleData}
              onSendWishes={setWishModal}
            />
          )}
          {active === "training" && (
            <TrainingPaths
              people={peopleData}
              catalog={catalog}
              role={role}
              currentUser={currentUser}
            />
          )}
          {active === "attendance" && (
            <Attendance
              people={peopleData}
              role={role}
              currentUser={currentUser}
            />
          )}
          {active === "academy" && (
            <AcademyPro onContentSelect={setContentModal} />
          )}
          {active === "onboarding" && <OnboardingEnhanced />}
          {active === "offboarding" && <Offboarding />}
          {active === "documents" && (
            <DocsCenter onContentSelect={setContentModal} />
          )}
          {active === "approvals" && (
            <ApprovalsCenter requests={requests} setRequests={setRequests} />
          )}
          {active === "directory" && (
            <Directory
              role={role}
              people={peopleData}
              onEdit={setEditModalPerson}
            />
          )}
          {active === "settings" && <SettingsPanel />}
        </section>
      </div>

      {wishModal && (
        <WishTemplateModal {...wishModal} onClose={() => setWishModal(null)} />
      )}
      {editModalPerson && (
        <EditSensitiveInfoModal
          person={editModalPerson}
          onSave={handleSaveSensitiveInfo}
          onClose={() => setEditModalPerson(null)}
        />
      )}
      {contentModal && (
        <ContentModal
          content={contentModal}
          onClose={() => setContentModal(null)}
        />
      )}
    </div>
  );
}

/*************************************
 * Forms & Request Components
 *************************************/
function SalaryCertificate({ onSubmit, user }) {
  const [form, setForm] = useState({
    addressTo: "",
    responsible: "Natalia Panaskina",
    purpose: "",
  });
  const submit = () => {
    if (!form.addressTo || !form.responsible) {
      alert("Please fill required fields");
      return;
    }
    onSubmit({
      kind: "Salary Certificate",
      assignee: form.responsible,
      details: form,
    });
  };
  return (
    <Card>
      <CardBody>
        <SimpleHeader title="Salary Certificate" />
        <div className="grid gap-4">
          <Field label="Address To:" required>
            <Input
              placeholder="Enter the recipient address"
              value={form.addressTo}
              onChange={(e) => setForm({ ...form, addressTo: e.target.value })}
            />
          </Field>
          <Field label="Responsible Person:" required>
            <Select
              value={form.responsible}
              onChange={(e) =>
                setForm({ ...form, responsible: e.target.value })
              }
            >
              {people
                .filter((p) => /HR/.test(p.role))
                .map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
            </Select>
          </Field>
          <Field label="Purpose:">
            <Textarea
              placeholder="Enter the purpose of the certificate"
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            />
          </Field>
          <div className="flex justify-end">
            <Button onClick={submit}>
              <Send size={16} className="inline mr-1" />
              Request Certificate
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function NOCCertificate({ onSubmit, user }) {
  const [form, setForm] = useState({
    addressTo: "",
    country: "",
    reason: "",
    responsible: "Natalia Panaskina",
    purpose: "",
  });
  const submit = () => {
    if (!form.addressTo || !form.reason || !form.responsible) {
      alert("Please fill required fields");
      return;
    }
    onSubmit({
      kind: "NOC Certificate",
      assignee: form.responsible,
      details: form,
    });
  };
  return (
    <Card>
      <CardBody>
        <SimpleHeader title="No Objection Certificate (NOC)" />
        <div className="grid gap-4">
          <Field label="Address To:" required>
            <Input
              placeholder="Enter the recipient address"
              value={form.addressTo}
              onChange={(e) => setForm({ ...form, addressTo: e.target.value })}
            />
          </Field>
          <Field label="Country:">
            <Input
              placeholder="Enter NOC relevant country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </Field>
          <Field label="NOC Reason:" required>
            <Select
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
            >
              <option value="">Select Reason</option>
              <option>Bank Account</option>
              <option>Travel</option>
              <option>Visa</option>
              <option>Mortgage</option>
            </Select>
          </Field>
          <Field label="Responsible Person:" required>
            <Select
              value={form.responsible}
              onChange={(e) =>
                setForm({ ...form, responsible: e.target.value })
              }
            >
              {people
                .filter((p) => /HR/.test(p.role))
                .map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
            </Select>
          </Field>
          <Field label="Purpose:">
            <Textarea
              placeholder="Enter the purpose of the certificate"
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            />
          </Field>
          <div className="flex justify-end">
            <Button onClick={submit}>
              <Send size={16} className="inline mr-1" />
              Request NOC
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function MyRequests({ requests, setRequests }) {
  const download = (r) => {
    const user = people.find((p) => p.id === r.userId);
    const content = `
      SPRINGFIELD PROPERTIES
      HR Department

      Date: ${today()}
      Ref: ${r.id}

      SUBJECT: ${r.type.toUpperCase()}

      To Whom It May Concern,

      This is to certify that ${user.name}, holding the position of ${
      user.role
    } in the ${
      user.department
    } department, has been an employee of Springfield Properties since ${
      user.hireDate
    }.

      This certificate is issued upon the employee's request.

      ---
      (Auto-Signature & Stamp)
      Natalia Panaskina
      HR Manager
      Springfield Properties
    `;
    const blob = new Blob([content.trim()], { type: "application/pdf" }); // Simulate PDF
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${r.type.replace(/\s+/g, "_")}_${r.id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    alert("PDF download initiated.");
  };
  return (
    <Card>
      <CardBody>
        <SimpleHeader title="My Document Requests" />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Form</th>
                <th className="py-2 pr-4">Assigned To</th>
                <th className="py-2 pr-4">Request Date</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr
                  key={r.id}
                  className="border-t"
                  style={{ borderColor: brand.border }}
                >
                  <td className="py-2 pr-4">{i + 1}</td>
                  <td className="py-2 pr-4">{r.type}</td>
                  <td className="py-2 pr-4">{r.assignee}</td>
                  <td className="py-2 pr-4">{r.date}</td>
                  <td className="py-2 pr-4">
                    {r.status.includes("Final Approved") ? (
                      <Badge tone="success">Final Approved</Badge>
                    ) : r.status.includes("Approved") ? (
                      <Badge tone="info">{r.status}</Badge>
                    ) : (
                      <Badge tone="warn">{r.status}</Badge>
                    )}
                  </td>
                  <td className="py-2 pr-4">
                    {r.downloadable && (
                      <Button v="outline" onClick={() => download(r)}>
                        <Download size={14} className="inline mr-1" />
                        Download
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}

function LeaveApplication({ onSubmit, user }) {
  const [form, setForm] = useState({
    type: "Annual",
    start: "",
    end: "",
    reason: "",
  });
  const balances = { Annual: 21, Sick: 10, Unpaid: 0 };
  const submit = () => {
    if (!form.start || !form.end) {
      alert("Please choose dates");
      return;
    }
    onSubmit({ kind: "Leave Application", details: form });
  };
  return (
    <Card>
      <CardBody>
        <SimpleHeader title="Leave Application" />
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Leave Type:">
            <Select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Annual</option>
              <option>Sick</option>
              <option>Unpaid</option>
            </Select>
            <div className="text-xs text-gray-500 mt-1">
              Balance: {balances[form.type]} days
            </div>
          </Field>
          <div />
          <Field label="Start Date:">
            <Input
              type="date"
              value={form.start}
              onChange={(e) => setForm({ ...form, start: e.target.value })}
            />
          </Field>
          <Field label="End Date:">
            <Input
              type="date"
              value={form.end}
              onChange={(e) => setForm({ ...form, end: e.target.value })}
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="Reason:">
              <Textarea
                placeholder="Why do you need leave?"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />
            </Field>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button onClick={submit}>
              <Send size={16} className="inline mr-1" />
              Submit Leave Request
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

/*************************************
 * New & Updated Feature Components
 *************************************/
function VacationList({ vacations, people }) {
  const currentVacations = useMemo(() => {
    const today = new Date();
    return vacations
      .filter((v) => new Date(v.start) <= today && new Date(v.end) >= today)
      .map((v) => ({
        ...v,
        employee: people.find((p) => p.id === v.employeeId),
      }));
  }, [vacations, people]);

  return (
    <Card>
      <CardBody>
        <SimpleHeader title="Vacation & Leave List" />
        <h3
          className="font-semibold mb-3 flex items-center gap-2"
          style={{ color: brand.primary }}
        >
          <Plane size={18} /> Currently on Leave
        </h3>
        {currentVacations.length > 0 ? (
          <ul className="space-y-3">
            {currentVacations.map((v) => (
              <li
                key={v.employee.id}
                className="p-3 rounded-xl border flex items-center gap-3"
                style={{ borderColor: brand.border }}
              >
                <img
                  src={v.employee.photo}
                  alt={v.employee.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{v.employee.name}</div>
                  <div className="text-xs text-gray-500">{v.employee.role}</div>
                  <div className="text-xs" style={{ color: brand.accentRed }}>
                    Back on{" "}
                    {new Date(v.end).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <Badge tone="info" className="ml-auto">
                  {v.type} Leave
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">
            Everyone is currently in the office.
          </p>
        )}
      </CardBody>
    </Card>
  );
}

function Offboarding() {
  const [offboardingList, setOffboardingList] = useState([
    {
      id: "EMP-198",
      name: "John Doe",
      role: "Sales Executive",
      lastDay: "2025-08-20",
      status: "Finance Pending",
      progress: 75,
      checklist: {
        "Device Return": true,
        "Access Revocation": true,
        "Final Settlement": false,
        "Experience Letter": false,
      },
    },
    {
      id: "EMP-155",
      name: "Jane Smith",
      role: "Marketing Intern",
      lastDay: "2025-09-05",
      status: "Manager Pending",
      progress: 25,
      checklist: {
        "Device Return": true,
        "Access Revocation": false,
        "Final Settlement": false,
        "Experience Letter": false,
      },
    },
  ]);
  const [checklistModalFor, setChecklistModalFor] = useState(null);
  const employeeForModal = useMemo(
    () => offboardingList.find((j) => j.id === checklistModalFor),
    [offboardingList, checklistModalFor]
  );

  const updateChecklist = (employeeId, key, value) => {
    setOffboardingList((prev) =>
      prev.map((e) => {
        if (e.id === employeeId) {
          const newChecklist = { ...e.checklist, [key]: value };
          const total = Object.keys(newChecklist).length;
          const completed = Object.values(newChecklist).filter(Boolean).length;
          const newProgress = Math.round((completed / total) * 100);
          return { ...e, checklist: newChecklist, progress: newProgress };
        }
        return e;
      })
    );
  };

  return (
    <>
      <Card>
        <CardBody>
          <SimpleHeader title="Offboarding Center" />
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Manage employee exits, device returns, access revocation, and
              final settlements.
            </p>
            <Button v="outline">
              <Plus size={16} className="inline mr-1" />
              Initiate Offboarding
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-4">Employee</th>
                  <th className="py-2 pr-4">Last Day</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Progress</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {offboardingList.map((j) => (
                  <tr
                    key={j.id}
                    className="border-t"
                    style={{ borderColor: brand.border }}
                  >
                    <td className="py-2 pr-4">
                      <div className="font-medium">{j.name}</div>
                      <div className="text-xs text-gray-400">{j.role}</div>
                    </td>
                    <td className="py-2 pr-4">{j.lastDay}</td>
                    <td className="py-2 pr-4">
                      <Badge tone="warn">{j.status}</Badge>
                    </td>
                    <td className="py-2 pr-4">
                      <div className="w-40 h-2 rounded-full bg-gray-200">
                        <div
                          className="h-full"
                          style={{
                            width: `${j.progress}%`,
                            background: brand.primary,
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-2 pr-4">
                      <Button
                        v="outline"
                        onClick={() => setChecklistModalFor(j.id)}
                      >
                        View Checklist
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      {checklistModalFor && (
        <ChecklistModal
          title="Offboarding Checklist"
          employee={employeeForModal}
          onClose={() => setChecklistModalFor(null)}
          onUpdate={updateChecklist}
        />
      )}
    </>
  );
}

function Attendance({ people, role, currentUser }) {
  const [selectedEmployee, setSelectedEmployee] = useState(currentUser);
  const [status, setStatus] = useState("Ready to Check In");
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [todaysCheckIns, setTodaysCheckIns] = useState([
    {
      employeeId: 30,
      name: "Omar Nasser",
      time: "09:05:12 AM",
      location: "25.1972, 55.2744",
      type: "Field / External",
    },
    {
      employeeId: 23,
      name: "Anne Lacad",
      time: "09:15:30 AM",
      location: "25.2048, 55.2708",
      type: "Office",
    },
  ]);
  const lateShiftEmployees = useMemo(
    () => people.filter((p) => p.lateShift),
    [people]
  );

  useEffect(() => {
    setSelectedEmployee(currentUser);
    setStatus("Ready to Check In");
    setLastCheckIn(null);
  }, [currentUser]);

  const haversineDistance = (coords1, coords2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(coords1.latitude)) *
        Math.cos(toRad(coords2.latitude)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const getLocation = (action) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const distance = haversineDistance(OFFICE_LOCATION, {
          latitude,
          longitude,
        });
        const locationType =
          distance <= GEOLOCATION_THRESHOLD_KM ? "Office" : "Field / External";
        const timestamp = new Date().toLocaleTimeString();
        const locationString = `${latitude.toFixed(4)}, ${longitude.toFixed(
          4
        )}`;

        if (action === "checkIn") {
          const checkInData = {
            employeeId: selectedEmployee.id,
            name: selectedEmployee.name,
            time: timestamp,
            location: locationString,
            type: locationType,
          };
          setTodaysCheckIns((prev) => [
            ...prev.filter((c) => c.employeeId !== selectedEmployee.id),
            checkInData,
          ]);
          setLastCheckIn(`${timestamp} (${locationType})`);
          setStatus("Checked In");
          alert(`Checked In at ${timestamp} from ${locationType} location.`);
        } else {
          setStatus("Ready to Check In");
          alert(`Checked Out at ${timestamp} from ${locationType} location.`);
        }
      },
      (err) => alert(`Geolocation Error: ${err.message}`),
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <SimpleHeader title="Employee Attendance" />
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {role === "hr_manager" && (
                <div className="mb-4">
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: brand.primary }}
                  >
                    Select Employee
                  </h3>
                  <Select
                    value={selectedEmployee.id}
                    onChange={(e) =>
                      setSelectedEmployee(
                        people.find((p) => p.id === parseInt(e.target.value))
                      )
                    }
                  >
                    {people.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.role})
                      </option>
                    ))}
                  </Select>
                </div>
              )}
              <div
                className="p-4 rounded-xl border"
                style={{ borderColor: brand.border }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={selectedEmployee.photo}
                    alt={selectedEmployee.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{selectedEmployee.name}</div>
                    <div className="text-xs text-gray-500">
                      {selectedEmployee.role}
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <p>
                    <strong>Status:</strong>{" "}
                    <Badge
                      tone={status === "Checked In" ? "success" : "default"}
                    >
                      {status}
                    </Badge>
                  </p>
                  <p className="mt-2">
                    <strong>Last Check In:</strong> {lastCheckIn || "N/A"}
                  </p>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button
                    v="primary"
                    onClick={() => getLocation("checkIn")}
                    disabled={status === "Checked In"}
                  >
                    Check In
                  </Button>
                  <Button
                    v="outline"
                    onClick={() => getLocation("checkOut")}
                    disabled={status !== "Checked In"}
                  >
                    Check Out
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <h3
                className="font-semibold mb-3 flex items-center gap-2"
                style={{ color: brand.primary }}
              >
                <MapPin size={18} /> Last Recorded Location
              </h3>
              <div
                className="p-3 rounded-xl border"
                style={{ borderColor: brand.border }}
              >
                <p className="text-sm text-gray-500 mb-2">
                  {selectedEmployee.name}'s last recorded location on{" "}
                  {selectedEmployee.attendance[0].date}:
                </p>
                <img
                  src={`https://placehold.co/400x250/E9F3FF/00205B?text=Location+Map`}
                  alt="Map"
                  className="w-full rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Coordinates: {selectedEmployee.attendance[0].location}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      {role === "hr_manager" && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardBody>
              <h3
                className="font-semibold mb-3 flex items-center gap-2"
                style={{ color: brand.primary }}
              >
                <CalendarCheck size={18} /> Today's Check-ins
              </h3>
              {todaysCheckIns.length > 0 ? (
                <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
                  {todaysCheckIns.map((c) => (
                    <li
                      key={c.employeeId}
                      className="p-2 border-b"
                      style={{ borderColor: brand.border }}
                    >
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">
                        Time: {c.time} | Type: {c.type}
                      </div>
                      <div className="text-xs text-gray-400">
                        Location: {c.location}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No one has checked in yet today.
                </p>
              )}
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3
                className="font-semibold mb-3 flex items-center gap-2"
                style={{ color: brand.primary }}
              >
                <Moon size={18} /> Employees on Late Shift
              </h3>
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {lateShiftEmployees.map((p) => (
                  <li
                    key={p.id}
                    className="p-2 rounded-xl border flex items-center justify-between"
                    style={{ borderColor: brand.border }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={p.photo}
                        alt={p.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.role}</div>
                      </div>
                    </div>
                    <Badge tone="info">Scheduled Late</Badge>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}

function TrainingPaths({ people, catalog, role, currentUser }) {
  const [selectedEmployee, setSelectedEmployee] = useState(currentUser);
  useEffect(() => {
    setSelectedEmployee(currentUser);
  }, [currentUser]);

  const employeeTraining = useMemo(() => {
    return selectedEmployee.training.map((t) => {
      const course = catalog.find((c) => c.id === t.id);
      return { ...course, progress: t.progress };
    });
  }, [selectedEmployee, catalog]);

  return (
    <Card>
      <CardBody>
        <SimpleHeader
          title={
            role === "agent" ? "My Training Path" : "Employee Training Paths"
          }
        />
        <div
          className={role === "hr_manager" ? "grid md:grid-cols-3 gap-6" : ""}
        >
          {role === "hr_manager" && (
            <div className="md:col-span-1">
              <h3
                className="font-semibold mb-3"
                style={{ color: brand.primary }}
              >
                Select Employee
              </h3>
              <Select
                value={selectedEmployee.id}
                onChange={(e) =>
                  setSelectedEmployee(
                    people.find((p) => p.id === parseInt(e.target.value))
                  )
                }
              >
                {people.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.role})
                  </option>
                ))}
              </Select>
            </div>
          )}
          <div className={role === "hr_manager" ? "md:col-span-2" : ""}>
            <h3
              className="font-semibold mb-3 flex items-center gap-2"
              style={{ color: brand.primary }}
            >
              <GraduationCap size={18} /> {selectedEmployee.name}'s Learning
              Path
            </h3>
            {employeeTraining.length === 0 ? (
              <p className="text-sm text-gray-500">
                No training courses assigned.
              </p>
            ) : (
              <ul className="space-y-3">
                {employeeTraining.map((course) => (
                  <li
                    key={course.id}
                    className="p-3 rounded-xl border"
                    style={{ borderColor: brand.border }}
                  >
                    <div className="font-medium">{course.title}</div>
                    <div className="text-xs text-gray-500">
                      {course.area} • {course.level}
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${course.progress}%`,
                          background: brand.primary,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {course.progress}% Complete
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4">
              <Button v="primary">
                <CalendarDays size={16} className="inline mr-1" /> Sync with
                Bitrix24 Calendar
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function OnboardingEnhanced() {
  const [tab, setTab] = useState("joiners");
  const [joiners, setJoiners] = useState([
    {
      id: "EMP-221",
      name: "Hassan Ali",
      role: "Property Consultant",
      doj: "2025-09-01",
      manager: "Madhu Kumar",
      status: "HR Pending",
      progress: 40,
      checklist: {
        "Offer Acceptance": true,
        "Equipment Handover": true,
        "Policy Briefing": false,
        "Day-1 Orientation": false,
        "Account Provisioning": false,
      },
      docs: { passport: true, visa: true, contract: false, emiratesId: false },
      policies: { conduct: true, privacy: false, safety: false },
    },
    {
      id: "EMP-222",
      name: "Fatima Noor",
      role: "Leasing Agent",
      doj: "2025-09-10",
      manager: "Madhu Kumar",
      status: "IT Pending",
      progress: 50,
      checklist: {
        "Offer Acceptance": true,
        "Equipment Handover": true,
        "Policy Briefing": true,
        "Day-1 Orientation": false,
        "Account Provisioning": false,
      },
      docs: { passport: true, visa: false, contract: true, emiratesId: false },
      policies: { conduct: true, privacy: true, safety: false },
    },
    {
      id: "EMP-223",
      name: "Carlos Gomez",
      role: "Sales Executive",
      doj: "2025-09-15",
      manager: "Madhu Kumar",
      status: "HR Pending",
      progress: 20,
      checklist: {
        "Offer Acceptance": true,
        "Equipment Handover": false,
        "Policy Briefing": false,
        "Day-1 Orientation": false,
        "Account Provisioning": false,
      },
      docs: {
        passport: false,
        visa: false,
        contract: false,
        emiratesId: false,
      },
      policies: { conduct: false, privacy: false, safety: false },
    },
  ]);
  const [checklistModalFor, setChecklistModalFor] = useState(null);
  const employeeForModal = useMemo(
    () => joiners.find((j) => j.id === checklistModalFor),
    [joiners, checklistModalFor]
  );

  const updateChecklist = (employeeId, key, value) => {
    setJoiners((prev) =>
      prev.map((j) => {
        if (j.id === employeeId) {
          const newChecklist = { ...j.checklist, [key]: value };
          const total = Object.keys(newChecklist).length;
          const completed = Object.values(newChecklist).filter(Boolean).length;
          const newProgress = Math.round((completed / total) * 100);
          return { ...j, checklist: newChecklist, progress: newProgress };
        }
        return j;
      })
    );
  };

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <SimpleHeader title="Onboarding Center" />
              <div className="flex gap-2">
                <Button v="outline">
                  <Plus size={16} className="inline mr-1" />
                  Add Joiner
                </Button>
              </div>
            </div>
            <div
              className="mt-4 flex gap-2 overflow-x-auto border-b"
              style={{ borderColor: brand.border }}
            >
              {[
                "joiners",
                "checklist",
                "equipment",
                "documents",
                "orientation",
                "policies",
              ].map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`px-3 pb-2 text-sm border-b-2 ${
                    tab === k
                      ? "font-semibold border-red-500 text-red-500"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {k[0].toUpperCase() + k.slice(1)}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {tab === "joiners" && (
          <Card>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2 pr-4">Employee</th>
                      <th className="py-2 pr-4">DOJ</th>
                      <th className="py-2 pr-4">Manager</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Progress</th>
                      <th className="py-2 pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {joiners.map((j) => (
                      <tr
                        key={j.id}
                        className="border-t"
                        style={{ borderColor: brand.border }}
                      >
                        <td className="py-2 pr-4">
                          <div className="font-medium">{j.name}</div>
                          <div className="text-xs text-gray-400">{j.role}</div>
                        </td>
                        <td className="py-2 pr-4">{j.doj}</td>
                        <td className="py-2 pr-4">{j.manager}</td>
                        <td className="py-2 pr-4">
                          <Badge tone="warn">{j.status}</Badge>
                        </td>
                        <td className="py-2 pr-4">
                          <div className="w-40 h-2 rounded-full bg-gray-200">
                            <div
                              className="h-full"
                              style={{
                                width: `${j.progress}%`,
                                background: brand.primary,
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-2 pr-4">
                          <Button
                            v="outline"
                            onClick={() => setChecklistModalFor(j.id)}
                          >
                            View Checklist
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        )}
        {tab === "checklist" && (
          <Card>
            <CardBody>
              <h3
                className="font-semibold mb-3"
                style={{ color: brand.primary }}
              >
                Standard Onboarding Checklist
              </h3>
              <ul className="grid md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {[
                  { task: "Send offer & e-sign package", owner: "HR" },
                  { task: "Create email & CRM accounts", owner: "IT" },
                  { task: "Equipment handover (laptop, SIM)", owner: "Admin" },
                  { task: "Day-1 orientation (agenda attached)", owner: "HR" },
                  { task: "Compliance briefing (RERA, H&S)", owner: "HR" },
                  {
                    task: "Buddy assignment & 30-60-90 plan",
                    owner: "Manager",
                  },
                  { task: "Add to workgroup chats", owner: "Manager" },
                  { task: "Schedule introductory meetings", owner: "Manager" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="p-3 rounded-xl border flex items-center justify-between"
                    style={{ borderColor: brand.border }}
                  >
                    <div>
                      <div className="font-medium">{item.task}</div>
                      <div className="text-xs text-gray-500">
                        Owner: {item.owner}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        )}
        {tab === "equipment" && (
          <Card>
            <CardBody>
              <h3
                className="font-semibold mb-3"
                style={{ color: brand.primary }}
              >
                Equipment & Access Handover
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {joiners.map((j) => (
                  <div
                    key={j.id}
                    className="p-4 rounded-xl border"
                    style={{ borderColor: brand.border }}
                  >
                    <div className="font-medium mb-2">{j.name}</div>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={j.checklist["Equipment Handover"]}
                          readOnly
                        />{" "}
                        <Laptop size={14} className="inline mr-1" /> Laptop &
                        SIM
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={j.checklist["Account Provisioning"]}
                          readOnly
                        />{" "}
                        <User2 size={14} className="inline mr-1" /> CRM/Email
                        Access
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={j.checklist["Access Card"]}
                          readOnly
                        />{" "}
                        <ShieldCheck size={14} className="inline mr-1" /> Access
                        Card
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
        {tab === "documents" && (
          <Card>
            <CardBody>
              <h3
                className="font-semibold mb-3"
                style={{ color: brand.primary }}
              >
                Required Documents Status
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {joiners.map((j) => (
                  <div
                    key={j.id}
                    className="p-4 rounded-xl border"
                    style={{ borderColor: brand.border }}
                  >
                    <div className="font-medium mb-2">{j.name}</div>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={j.docs.passport}
                          readOnly
                        />{" "}
                        Passport Copy
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={j.docs.visa} readOnly />{" "}
                        Visa Copy
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={j.docs.contract}
                          readOnly
                        />{" "}
                        Signed Contract
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={j.docs.emiratesId}
                          readOnly
                        />{" "}
                        Emirates ID Copy
                      </label>
                    </div>
                    <Button v="outline" c="text-xs py-1 px-2 mt-3">
                      <Upload size={12} className="inline mr-1" /> Upload File
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
        {tab === "orientation" && (
          <Card>
            <CardBody>
              <h3
                className="font-semibold mb-3"
                style={{ color: brand.primary }}
              >
                Orientation Planner
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className="p-4 rounded-xl border"
                  style={{ borderColor: brand.border }}
                >
                  <div className="font-medium text-gray-800 mb-3">
                    Schedule New Session
                  </div>
                  <div className="grid gap-3 text-sm">
                    <Input placeholder="Title (e.g., Welcome, CRM Training)" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="date" /> <Input type="time" />
                    </div>
                    <Select>
                      <option>HR</option>
                      <option>IT</option>
                      <option>Manager</option>
                    </Select>
                    <Button>
                      <CalendarDays size={14} className="inline mr-1" />
                      Add to Calendar
                    </Button>
                  </div>
                </div>
                <div
                  className="p-4 rounded-xl border"
                  style={{ borderColor: brand.border }}
                >
                  <div className="font-medium text-gray-800 mb-3">
                    Upcoming Sessions
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li
                      className="p-2 rounded-lg border bg-gray-50"
                      style={{ borderColor: brand.border }}
                    >
                      Welcome & Company Intro — 02 Sep, 09:30 (HR)
                    </li>
                    <li
                      className="p-2 rounded-lg border bg-gray-50"
                      style={{ borderColor: brand.border }}
                    >
                      CRM/Bitrix24 Basics — 02 Sep, 13:00 (IT)
                    </li>
                    <li
                      className="p-2 rounded-lg border bg-gray-50"
                      style={{ borderColor: brand.border }}
                    >
                      RERA & Trakheesi — 03 Sep, 10:00 (HR)
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
        {tab === "policies" && (
          <Card>
            <CardBody>
              <h3
                className="font-semibold mb-3"
                style={{ color: brand.primary }}
              >
                Policies & Acknowledgements
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Track which new joiners have acknowledged key company policies.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {joiners.map((j) => (
                  <div
                    key={j.id}
                    className="p-4 rounded-xl border"
                    style={{ borderColor: brand.border }}
                  >
                    <div className="font-medium mb-2">{j.name}</div>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={j.policies.conduct}
                          readOnly
                        />{" "}
                        Code of Conduct
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={j.policies.privacy}
                          readOnly
                        />{" "}
                        Data Privacy
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={j.policies.safety}
                          readOnly
                        />{" "}
                        Health & Safety
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
      </div>
      {checklistModalFor && (
        <ChecklistModal
          title="Onboarding Checklist"
          employee={employeeForModal}
          onClose={() => setChecklistModalFor(null)}
          onUpdate={updateChecklist}
        />
      )}
    </>
  );
}

function Directory({ role, people, onEdit }) {
  const [q, setQ] = useState("");
  const rows = people.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.role.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Card>
      <CardBody>
        <SimpleHeader title="Employee Directory" />
        <Input
          placeholder="Search name or role..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          c="mb-4"
        />
        <ul className="grid md:grid-cols-2 gap-4">
          {rows.map((p) => (
            <li
              key={p.id}
              className="p-3 rounded-xl border"
              style={{ borderColor: brand.border }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">
                    {p.role} | {p.department}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    DOJ: {p.hireDate}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Team: {p?.team}
                  </div>
                </div>
              </div>
              {role === "hr_manager" && (
                <div
                  className="mt-3 p-2 rounded-lg text-xs"
                  style={{
                    background: brand.panel,
                    border: `1px solid ${brand.border}`,
                  }}
                >
                  <div className="flex justify-between items-center">
                    <strong style={{ color: brand.primary }}>HR Notes:</strong>
                    <Button
                      v="subtle"
                      c="py-1 px-2 text-xs"
                      onClick={() => onEdit(p)}
                    >
                      <Edit size={12} className="inline mr-1" />
                      Edit Sensitive Info
                    </Button>
                  </div>
                  <p className="text-gray-600 mt-1">{p.compensationNotes}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}

/*************************************
 * Unchanged / Minor Change Components
 *************************************/
function BirthdaysAnniversaries({ people, onSendWishes }) {
  const today = new Date();
  const upcomingBirthdays = useMemo(
    () =>
      people
        .filter((p) => p.dob)
        .map((p) => ({
          ...p,
          nextDate: new Date(
            today.getFullYear(),
            new Date(p.dob).getMonth(),
            new Date(p.dob).getDate()
          ),
        }))
        .sort((a, b) => a.nextDate - b.nextDate)
        .slice(0, 5),
    [people]
  );
  const upcomingAnniversaries = useMemo(
    () =>
      people
        .filter((p) => p.hireDate)
        .map((p) => ({
          ...p,
          nextDate: new Date(
            today.getFullYear(),
            new Date(p.hireDate).getMonth(),
            new Date(p.hireDate).getDate()
          ),
          years: today.getFullYear() - new Date(p.hireDate).getFullYear(),
        }))
        .sort((a, b) => a.nextDate - b.nextDate)
        .slice(0, 5),
    [people]
  );
  return (
    <Card>
      <CardBody>
        <SimpleHeader title="Birthdays & Anniversaries" />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3
              className="font-semibold mb-3 flex items-center gap-2"
              style={{ color: brand.primary }}
            >
              <Gift size={18} /> Upcoming Birthdays
            </h3>
            <ul className="space-y-3">
              {upcomingBirthdays.map((p) => (
                <li
                  key={p.id}
                  className="p-3 rounded-xl border flex items-center gap-3"
                  style={{ borderColor: brand.border }}
                >
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.role}</div>
                    <div className="text-xs" style={{ color: brand.accentRed }}>
                      {p.nextDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <Button
                    v="subtle"
                    className="ml-auto"
                    onClick={() =>
                      onSendWishes({ person: p, type: "birthday" })
                    }
                  >
                    Send Wishes
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3
              className="font-semibold mb-3 flex items-center gap-2"
              style={{ color: brand.primary }}
            >
              <Briefcase size={18} /> Work Anniversaries
            </h3>
            <ul className="space-y-3">
              {upcomingAnniversaries.map((p) => (
                <li
                  key={p.id}
                  className="p-3 rounded-xl border flex items-center gap-3"
                  style={{ borderColor: brand.border }}
                >
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.role}</div>
                    <div className="text-xs" style={{ color: brand.accentRed }}>
                      {p.nextDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      ({p.years} years)
                    </div>
                  </div>
                  <Button
                    v="subtle"
                    className="ml-auto"
                    onClick={() =>
                      onSendWishes({ person: p, type: "anniversary" })
                    }
                  >
                    Send Wishes
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
function WishTemplateModal({ person, type, onClose }) {
  const isBirthday = type === "birthday";
  const title = isBirthday
    ? `Happy Birthday, ${person.name}!`
    : `Happy Work Anniversary, ${person.name}!`;
  const message = isBirthday
    ? `Wishing you a fantastic birthday!`
    : `Congratulations on ${person.years} years with Springfield!`;
  const templateImage = isBirthday
    ? "https://placehold.co/600x200/00205B/FFFFFF?text=Happy+Birthday"
    : "https://placehold.co/600x200/E30613/FFFFFF?text=Work+Anniversary";
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border"
        style={{ borderColor: brand.border }}
      >
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: brand.border }}
        >
          <div className="font-semibold" style={{ color: brand.primary }}>
            {title}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border"
            style={{ borderColor: brand.border }}
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <img
            src={templateImage}
            alt="Wish Template"
            className="w-full rounded-lg border"
            style={{ borderColor: brand.border }}
          />
          <p>{message}</p>
          <div
            className="flex justify-end gap-3 border-t pt-4"
            style={{ borderColor: brand.border }}
          >
            <Button
              v="outline"
              onClick={() => {
                alert(`Emailing ${person.email}`);
                onClose();
              }}
            >
              <Mail size={16} className="inline mr-1" /> Email
            </Button>
            <Button
              v="primary"
              onClick={() => {
                alert(`Sending WhatsApp to ${person.phone}`);
                onClose();
              }}
            >
              <MessageSquare size={16} className="inline mr-1" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AcademyPro({ onContentSelect }) {
  const [subTab, setSubTab] = useState("courses");
  const perf = [
    { m: "Apr", score: 70 },
    { m: "May", score: 78 },
    { m: "Jun", score: 85 },
    { m: "Jul", score: 82 },
    { m: "Aug", score: 88 },
  ];
  const mix = [
    { name: "Sales", value: 45 },
    { name: "Compliance", value: 35 },
    { name: "General", value: 20 },
  ];
  const CHART_COLORS_ACADEMY = [
    brand.primary,
    brand.accentRed,
    brand.primaryDark,
  ];
  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <SimpleHeader title="Academy" />
            <div className="flex gap-2 overflow-x-auto">
              {["courses", "videos", "path", "certs", "reports"].map((k) => (
                <button
                  key={k}
                  onClick={() => setSubTab(k)}
                  className={`px-3 py-2 rounded-xl text-sm border ${
                    subTab === k ? "font-semibold" : ""
                  }`}
                  style={{
                    borderColor: brand.border,
                    backgroundColor:
                      subTab === k ? brand.primaryLight : brand.surface,
                    color: subTab === k ? brand.primary : brand.text,
                  }}
                >
                  {k[0].toUpperCase() + k.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {subTab === "courses" && (
        <Card>
          <CardBody>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {catalog.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border bg-white p-4 flex flex-col"
                  style={{ borderColor: brand.border }}
                >
                  <img
                    src={`${c.image}&fit=crop&w=400&h=200`}
                    alt={c.title}
                    className="h-28 w-full object-cover rounded-lg mb-3"
                  />
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-xs text-gray-500">
                    {c.area} • {c.level} • {c.hours}h
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Lessons: {c.lessons}
                  </div>
                  <div className="mt-auto pt-3 flex gap-2">
                    <Button
                      v="primary"
                      onClick={() => onContentSelect({ type: "course", ...c })}
                    >
                      <BookOpen size={14} className="inline mr-1" />
                      View
                    </Button>
                    <Button v="outline">
                      <Plus size={14} className="inline mr-1" />
                      Assign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
      {subTab === "videos" && (
        <Card>
          <CardBody>
            <div className="grid md:grid-cols-3 gap-4">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="rounded-xl border p-4"
                  style={{ borderColor: brand.border }}
                >
                  <div className="h-32 rounded-lg bg-gray-200 mb-3 flex items-center justify-center">
                    <PlayCircle size={40} className="text-gray-400" />
                  </div>
                  <div className="font-medium">{v.title}</div>
                  <div className="text-xs text-gray-500 mb-2">
                    {v.duration} • {v.area}
                  </div>
                  <Button
                    v="primary"
                    onClick={() => onContentSelect({ type: "video", ...v })}
                  >
                    <Video size={14} className="inline mr-1" />
                    Play
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
      {subTab === "path" && (
        <Card>
          <CardBody>
            <h3 className="font-semibold mb-3">My Learning Path</h3>
            <ul className="grid md:grid-cols-2 gap-3 text-sm">
              {catalog.slice(0, 4).map((c) => (
                <li
                  key={c.id}
                  className="p-3 rounded-xl border flex items-center justify-between"
                  style={{ borderColor: brand.border }}
                >
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-gray-500">
                      {c.area} • {c.level}
                    </div>
                  </div>
                  <div className="w-32 h-2 rounded-full bg-gray-200">
                    <div
                      className="h-full"
                      style={{
                        width: `${50 + Math.floor(Math.random() * 40)}%`,
                        background: brand.primary,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}
      {subTab === "certs" && (
        <Card>
          <CardBody>
            <h3 className="font-semibold mb-3">My Certificates</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {certs.map((c) => (
                <div
                  key={c.id}
                  className="p-4 border rounded-xl"
                  style={{ borderColor: brand.border }}
                >
                  <div className="font-medium">{c.title}</div>
                  <div className="text-xs text-gray-500">
                    Issued: {c.issueDate} | Expires: {c.expiry}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button v="outline">
                      <Download size={14} className="inline mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
      {subTab === "reports" && (
        <Card>
          <CardBody>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64">
                <div className="text-sm font-medium mb-2">
                  Completion by Department
                </div>
                <ResponsiveContainer>
                  <BarChart
                    data={[
                      { name: "Sales", v: 78 },
                      { name: "Leasing", v: 65 },
                      { name: "Admin", v: 88 },
                      { name: "IT", v: 92 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="v"
                      fill={brand.primary}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-64">
                <div className="text-sm font-medium mb-2">
                  Compliance Training Due (30 days)
                </div>
                <ResponsiveContainer>
                  <LineChart
                    data={[
                      { d: "Week 1", due: 12 },
                      { d: "Week 2", due: 9 },
                      { d: "Week 3", due: 7 },
                      { d: "Week 4", due: 4 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="d" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="due"
                      stroke={brand.accentRed}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

function DocsCenter({ onContentSelect }) {
  const [tab, setTab] = useState("policies");
  const docData = {
    policies: [
      {
        id: "DOC-P1",
        title: "Code of Conduct",
        content:
          "This document outlines the expected standards of behavior for all Springfield Properties employees...",
      },
      {
        id: "DOC-P2",
        title: "Commission Payout Policy",
        content:
          "Commissions are calculated based on the signed Form F and are paid out on the 15th of the following month...",
      },
      {
        id: "DOC-P3",
        title: "RERA Compliance Guidelines",
        content:
          "All agents must adhere strictly to RERA advertising guidelines, including the use of BRN numbers in all marketing materials...",
      },
      {
        id: "DOC-P4",
        title: "Leave Policy",
        content:
          "Annual leave must be requested at least 30 days in advance through the HR portal...",
      },
    ],
    templates: [
      {
        id: "DOC-T1",
        title: "MOU (Form F)",
        content:
          "This is a template for the RERA-compliant Memorandum of Understanding (Form F) to be used for all property sales transactions...",
      },
      {
        id: "DOC-T2",
        title: "Tenancy Contract (Ejari)",
        content:
          "Standard bilingual tenancy contract template for Ejari registration in Dubai...",
      },
      {
        id: "DOC-T3",
        title: "Offer Letter",
        content: "Official company offer letter template for new hires...",
      },
    ],
    certs: [
      {
        id: "DOC-C1",
        title: "Company Trade License",
        content:
          "A copy of the Springfield Properties trade license issued by the Dubai Department of Economic Development...",
      },
      {
        id: "DOC-C2",
        title: "RERA Brokerage Registration",
        content:
          "Official RERA registration certificate for Springfield Properties...",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <SimpleHeader title="Documents Center" />
            <div className="flex gap-2">
              <Button v="outline">
                <Upload size={14} className="inline mr-1" />
                Upload
              </Button>
            </div>
          </div>
          <div
            className="mt-4 flex gap-2 overflow-x-auto border-b"
            style={{ borderColor: brand.border }}
          >
            {["policies", "templates", "certs"].map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-3 pb-2 text-sm border-b-2 ${
                  tab === k
                    ? "font-semibold border-red-500 text-red-500"
                    : "border-transparent text-gray-500"
                }`}
              >
                {k[0].toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {docData[tab].map((doc, i) => (
              <li
                key={i}
                className="p-3 rounded-xl border flex items-center justify-between"
                style={{ borderColor: brand.border }}
              >
                <span className="font-medium text-sm">{doc.title}</span>
                <div className="flex gap-2">
                  <Button
                    v="outline"
                    c="py-1 px-2 text-xs"
                    onClick={() =>
                      onContentSelect({ type: "document", ...doc })
                    }
                  >
                    View
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

function ApprovalsCenter({ requests, setRequests }) {
  const pending = requests.filter((r) => /Pending/.test(r.status));
  const act = (id, action) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const user = people.find((p) => p.id === r.userId);
        let pathKey = `leave_${user.department}`;
        if (!approvalPaths[pathKey]) pathKey = "leave_default";

        const kindMap = {
          "NOC Certificate": "noc",
          "Salary Certificate": "salary",
          Onboarding: "onboarding",
          Offboarding: "offboarding",
          "Leave Application": pathKey,
        };
        const kind = Object.keys(kindMap).find((k) => r.type.startsWith(k));
        const path = approvalPaths[kindMap[kind]];

        if (action === "approve") {
          const next = nextStatus(r.status, path);
          alert(`Request ${id} approved. Next status: ${next}`);
          if (next === "Final Approved")
            return {
              ...r,
              status: next,
              downloadable: true,
              remarks: "Final approval complete",
            };
          return {
            ...r,
            status: next,
            remarks: `Approved, pending ${next.split(" ")[0]}`,
          };
        }
        alert(`Request ${id} rejected.`);
        return { ...r, status: "Rejected", remarks: "Rejected by approver" };
      })
    );
  };
  return (
    <Card>
      <CardBody>
        <SimpleHeader title="Approvals Center" />
        {pending.length === 0 ? (
          <div className="text-sm text-gray-500">
            No items awaiting your approval.
          </div>
        ) : (
          <ul className="space-y-3">
            {pending.map((p) => (
              <li
                key={p.id}
                className="p-3 rounded-xl border"
                style={{ borderColor: brand.border }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="font-medium">
                      {p.type} for {people.find((u) => u.id === p.userId)?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {p.id} • Assigned to: {p.assignee} • {p.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone="warn">{p.status}</Badge>
                    <Button v="subtle" onClick={() => act(p.id, "approve")}>
                      <CheckCircle2 size={14} className="inline mr-1" />
                      Approve
                    </Button>
                    <Button v="danger" onClick={() => act(p.id, "reject")}>
                      <CircleAlert size={14} className="inline mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
function SettingsPanel() {
  return (
    <Card>
      <CardBody>
        <SimpleHeader title="Settings" />
        <p className="text-sm text-gray-600">
          Notification and integration settings. (UI unchanged from previous
          version)
        </p>
      </CardBody>
    </Card>
  );
}

/*************************************
 * Shared Logic & Components
 *************************************/
function addRequest(setRequests, payload, user) {
  let pathKey = `leave_${user.department}`;
  if (!approvalPaths[pathKey]) pathKey = "leave_default";

  const kindMap = {
    "NOC Certificate": "noc",
    "Salary Certificate": "salary",
    Onboarding: "onboarding",
    "Leave Application": pathKey,
  };
  const kind = kindMap[payload.kind];
  const path = approvalPaths[kind];
  const firstStatus = `${path[0]} Pending`;

  const assignee =
    payload.kind === "Leave Application" ? path[0] : payload.assignee;

  const row = {
    id: makeId(),
    type: payload.kind,
    userId: user.id,
    assignee: assignee,
    date: today(),
    status: firstStatus,
    remarks: "Submitted",
    downloadable: false,
  };
  setRequests((prev) => [row, ...prev]);
  alert(
    `${payload.kind} submitted. It is now pending approval from: ${assignee}.`
  );
}

function SimpleHeader({ title }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: brand.primary }}
      >
        <span className="text-white font-bold">SP</span>
      </div>
      <h2 className="text-xl font-semibold" style={{ color: brand.primary }}>
        {title}
      </h2>
      <span
        className="ml-auto text-xs px-2 py-1 rounded"
        style={{ background: brand.accentRed, color: "#fff" }}
      >
        Springfield
      </span>
    </div>
  );
}

function ChecklistModal({ title, employee, onClose, onUpdate }) {
  if (!employee) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border"
        style={{ borderColor: brand.border }}
      >
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: brand.border }}
        >
          <div className="font-semibold" style={{ color: brand.primary }}>
            {title}: {employee.name}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border"
            style={{ borderColor: brand.border }}
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5">
          <ul className="space-y-3">
            {Object.entries(employee.checklist).map(([key, value]) => (
              <li key={key}>
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      onUpdate(employee.id, key, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{key}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditSensitiveInfoModal({ person, onSave, onClose }) {
  const [formData, setFormData] = useState(person);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fieldGroups = {
    "Personal Details": [
      { name: "firstName", label: "First Name" },
      { name: "lastName", label: "Last Name" },
      { name: "secondName", label: "Second Name" },
      { name: "email", label: "Email" },
      { name: "phone", label: "Mobile Phone" },
      { name: "dob", label: "Date of Birth", type: "date" },
      { name: "nationality", label: "Nationality" },
      { name: "notificationLang", label: "Notification Language" },
    ],
    "Employment Details": [
      { name: "department", label: "Department" },
      { name: "designation", label: "Designation" },
      { name: "hireDate", label: "Date of Joining", type: "date" },
      { name: "hiredBy", label: "Hired By" },
    ],
    "Legal & ID": [
      { name: "passport", label: "Passport Number" },
      { name: "labourCard", label: "Labour Card Number" },
      { name: "labourExp", label: "Labour Card Expiration", type: "date" },
      { name: "emiratesId", label: "Emirates ID" },
      { name: "emiratesIdExp", label: "Emirates ID Expiration", type: "date" },
      { name: "visa", label: "Employment VISA Number" },
      { name: "visaExp", label: "Visa Expiration Date", type: "date" },
    ],
    "Professional & Access": [
      { name: "reraCard", label: "RERA Card" },
      { name: "reraNum", label: "RERA Number" },
      { name: "emaarReg", label: "Emaar Registration" },
      { name: "damacAccess", label: "DAMAC App Access" },
    ],
    Insurance: [
      { name: "insurance", label: "Insurance" },
      { name: "insuranceCard", label: "Insurance Card Number" },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border flex flex-col"
        style={{ borderColor: brand.border }}
      >
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: brand.border }}
        >
          <div className="font-semibold" style={{ color: brand.primary }}>
            Edit Sensitive Info: {person.name}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border"
            style={{ borderColor: brand.border }}
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          {Object.entries(fieldGroups).map(([groupTitle, fields]) => (
            <div key={groupTitle} className="mb-6">
              <h3
                className="text-lg font-semibold mb-3 border-b pb-2"
                style={{ color: brand.primary, borderColor: brand.border }}
              >
                {groupTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fields.map((field) => (
                  <Field key={field.name} label={field.label}>
                    <Input
                      name={field.name}
                      type={field.type || "text"}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                    />
                  </Field>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="p-4 border-t flex justify-end gap-3"
          style={{ borderColor: brand.border }}
        >
          <Button v="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(formData)}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

function ContentModal({ content, onClose }) {
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border flex flex-col"
        style={{ borderColor: brand.border }}
      >
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: brand.border }}
        >
          <h3
            className="font-semibold text-lg"
            style={{ color: brand.primary }}
          >
            {content.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border"
            style={{ borderColor: brand.border }}
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          {content.type === "video" && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={content.url}
                title={content.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          )}
          {(content.type === "course" || content.type === "document") && (
            <div>
              {content.image && (
                <img
                  src={`${content.image}&fit=crop&w=800&h=400`}
                  alt={content.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-gray-600">
                {content.description || content.content}
              </p>
            </div>
          )}
        </div>
        <div
          className="p-4 border-t flex justify-end"
          style={{ borderColor: brand.border }}
        >
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
