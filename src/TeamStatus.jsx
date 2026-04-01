// Team Status & Availability Dashboard
// Built as a Manager-focused feature to provide real-time visibility
// into team availability and support quick decision-making.
// Focus: clarity, quick actions, and minimal navigation.

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const INITIAL_MEMBERS = [
  { id: 1,  initials: "SK", name: "Sindhiya K",      role: "Frontend Dev",   status: "active",   wfh: false, leaveEnd: null,       avatar: "#1557c4" },
  { id: 2,  initials: "HR", name: "Haresh R",    role: "Backend Dev",    status: "leave",    wfh: false, leaveEnd: "Apr 5",    avatar: "#7c3aed" },
  { id: 3, initials: "TH", name: "Tharah H",   role: "Software Eng",   status: "active",   wfh: true,  leaveEnd: null,       avatar: "#16a34a" },
  { id: 4,  initials: "HK", name: "Harsita K",   role: "QA Engineer",    status: "active",   wfh: false, leaveEnd: null,       avatar: "#16a34a" },
  { id: 5,  initials: "KV", name: "Karthika Vasu",      role: "DevOps",         status: "leave",    wfh: false, leaveEnd: "Apr 4",    avatar: "#dc2626" },
  { id: 6,  initials: "KS", name: "Karthikeyan S",    role: "Designer",       status: "active",   wfh: true,  leaveEnd: null,       avatar: "#d97706" },
  { id: 7,  initials: "RB", name: "Ramesh Babu",     role: "Mobile Dev",     status: "active",   wfh: false, leaveEnd: null,       avatar: "#0891b2" },
  { id: 8,  initials: "SB", name: "Subha Ramesh",    role: "Data Analyst",   status: "active",   wfh: true,  leaveEnd: null,       avatar: "#059669" },
  { id: 9,  initials: "HA", name: "Harshada A",      role: "Backend Dev",    status: "active",   wfh: false, leaveEnd: null,       avatar: "#7c3aed" },
  { id: 10,  initials: "DS", name: "Dhanya Shree",     role: "Scrum Master",   status: "leave",    wfh: false, leaveEnd: "Apr 6",    avatar: "#be185d" },
  { id: 11, initials: "MA", name: "Mythryee Arumugam",     role: "Frontend Dev",   status: "active",   wfh: false, leaveEnd: null,       avatar: "#1557c4" },
];

const STATUS_META = {
  active: { label: "Active",   color: "#16a34a", bg: "rgba(22,163,74,0.08)",   border: "rgba(22,163,74,0.25)"  },
  leave:  { label: "On Leave", color: "#9999b8", bg: "rgba(153,153,184,0.08)", border: "rgba(153,153,184,0.25)" },
  wfh:    { label: "WFH",      color: "#1557c4", bg: "rgba(21,87,196,0.08)",   border: "rgba(21,87,196,0.25)"  },
};

const FILTERS = ["All", "Active", "WFH", "On Leave"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDisplayStatus(m) {
  if (m.status === "leave") return "leave";
  if (m.wfh) return "wfh";
  return "active";
}

function getCoverage(members) {
  const available = members.filter(m => m.status === "active").length;
  return Math.round((available / members.length) * 100);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const s = STATUS_META[status];
  return (
    <span style={{
      fontSize: 10, padding: "2px 8px", borderRadius: 20,
      background: s.bg, color: s.color,
      border: `0.5px solid ${s.border}`,
      fontWeight: 500, letterSpacing: "0.2px", whiteSpace: "nowrap",
    }}>{s.label}</span>
  );
}

function Avatar({ initials, color, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "18", color,
      border: `1.5px solid ${color}35`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, fontWeight: 600, flexShrink: 0,
      fontFamily: "'DM Sans', sans-serif",
    }}>{initials}</div>
  );
}

function CoverageBar({ pct }) {
  const color = pct >= 75 ? "#16a34a" : pct >= 50 ? "#d97706" : "#dc2626";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        flex: 1, height: 5, background: "#e8e8f4", borderRadius: 3, overflow: "hidden",
      }}>
        <div style={{
          width: `${pct}%`, height: "100%", background: color,
          borderRadius: 3, transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
      <span style={{ fontSize: 11, color, fontWeight: 600, minWidth: 32 }}>{pct}%</span>
    </div>
  );
}

function MemberCard({ member, onStatusChange }) {
  const ds = getDisplayStatus(member);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMenuOpen(false); }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 120px 100px",
        alignItems: "center",
        padding: "10px 14px",
        borderRadius: 8,
        background: hovered ? "#f5f6fa" : "transparent",
        border: hovered ? "0.5px solid #e2e2ee" : "0.5px solid transparent",
        transition: "all 0.15s ease",
        position: "relative",
      }}
    >
      {/* Member Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <Avatar initials={member.initials} color={member.avatar} />
          <div style={{
            position: "absolute", bottom: 0, right: 0,
            width: 10, height: 10, borderRadius: "50%",
            background: STATUS_META[ds].color,
            border: "1.5px solid #fff",
          }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {member.name}
            {member.wfh && member.status !== "leave" && (
              <span style={{ fontSize: 10, color: "#1557c4", marginLeft: 6, fontWeight: 400 }}>· 🏠 Home</span>
            )}
          </div>
          <div style={{ fontSize: 11, color: "#9999b8", marginTop: 1 }}>
            {member.role}
            {member.leaveEnd && member.status === "leave" && (
              <span style={{ color: "#d97706", marginLeft: 4 }}>· returns {member.leaveEnd}</span>
            )}
          </div>
        </div>
      </div>

      {/* Status - Perfectly aligned */}
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <StatusBadge status={ds} />
      </div>

      {/* Action - Now left-aligned under ACTION header */}
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        {hovered && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: "none", border: "0.5px solid #e2e2ee", borderRadius: 6,
                padding: "3px 8px", cursor: "pointer", fontSize: 11, color: "#7a7a9a",
                display: "flex", alignItems: "center", gap: 4,
              }}
            >
              Update ▾
            </button>
            {menuOpen && (
              <div style={{
                position: "absolute", right: 0, top: "calc(100% + 4px)",
                background: "#fff", border: "0.5px solid #e2e2ee",
                borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                zIndex: 99, minWidth: 140, overflow: "hidden",
              }}>
                {["active", "wfh", "leave"].map(s => (
                  <div
                    key={s}
                    onClick={() => { onStatusChange(member.id, s); setMenuOpen(false); }}
                    style={{
                      padding: "8px 14px", fontSize: 12,
                      color: STATUS_META[s].color,
                      background: ds === s ? STATUS_META[s].bg : "transparent",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = STATUS_META[s].bg}
                    onMouseLeave={e => e.currentTarget.style.background = ds === s ? STATUS_META[s].bg : "transparent"}
                  >
                    <span style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: STATUS_META[s].color, display: "inline-block",
                    }} />
                    {STATUS_META[s].label}
                    {ds === s && <span style={{ marginLeft: "auto", fontSize: 10 }}>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, subColor = "#9999b8", accent = "#1557c4" }) {
  return (
    <div style={{
      background: "#fff", border: "0.5px solid #e2e2ee", borderRadius: 10,
      padding: "14px 16px", flex: 1,
    }}>
      <div style={{ fontSize: 10, color: "#9999b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, color: accent, lineHeight: 1, fontFamily: "'DM Sans', sans-serif" }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: subColor, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TeamStatus() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  // Derived stats
  const active  = members.filter(m => m.status === "active" && !m.wfh).length;
  const wfh     = members.filter(m => m.status === "active" && m.wfh).length;
  const onLeave = members.filter(m => m.status === "leave").length;
  const coverage = getCoverage(members);

  // Filter + search
  const visible = members.filter(m => {
    const ds = getDisplayStatus(m);
    const matchFilter =
      filter === "All"      ? true :
      filter === "Active"   ? ds === "active" :
      filter === "WFH"      ? ds === "wfh" :
      filter === "On Leave" ? ds === "leave" : true;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.role.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  function handleStatusChange(id, newStatus) {
    setMembers(prev => {
      const updated = prev.map(m => {
        if (m.id !== id) return m;
        const updatedMember = { ...m };

        if (newStatus === "wfh") {
          updatedMember.status = "active";
          updatedMember.wfh = true;
          updatedMember.leaveEnd = null;
        }
        if (newStatus === "active") {
          updatedMember.status = "active";
          updatedMember.wfh = false;
          updatedMember.leaveEnd = null;
        }
        if (newStatus === "leave") {
          updatedMember.status = "leave";
          updatedMember.wfh = false;
        }

        return updatedMember;
      });

      const member = updated.find(m => m.id === id);
      setToast(`${member.name} marked as ${STATUS_META[newStatus].label}`);

      return updated;
    });
  }

  return (
    <>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>

      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#f5f6fa", minHeight: "100vh",
        padding: "28px 32px", color: "#1a1a2e",
      }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: "#9999b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>
              PeopleOS · Manager View
            </div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#1a1a2e", letterSpacing: "-0.4px" }}>
              Team Status
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#9999b8" }}>
              Wednesday, 1 April 2026 · Real-time availability
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 11, color: "#16a34a", fontWeight: 500 }}>
              Last updated just now
            </p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#fff", border: "0.5px solid #e2e2ee",
            borderRadius: 8, padding: "8px 14px",
            fontSize: 12, color: "#1557c4", fontWeight: 500,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
            Live
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <StatCard label="Total Team"   value={members.length} sub="Direct reports" />
          <StatCard label="In Office"    value={active}  sub="Working on-site"        accent="#1557c4" />
          <StatCard label="Working from Home" value={wfh} sub="Remote today"          accent="#7c3aed" subColor="#7c3aed" />
          <StatCard label="On Leave"     value={onLeave} sub="Absent today"           accent="#9999b8" subColor="#d97706" />
          <div style={{
            background: "#fff", border: "0.5px solid #e2e2ee",
            borderRadius: 10, padding: "14px 16px", flex: 1,
          }}>
            <div style={{ fontSize: 10, color: "#9999b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>
              Coverage
            </div>
            <CoverageBar pct={coverage} />
            <div style={{ fontSize: 11, color: coverage >= 75 ? "#16a34a" : "#d97706", marginTop: 6 }}>
              {coverage >= 75 ? "Sufficient coverage" : "Below target (75%)"}
            </div>
          </div>
        </div>

        {/* Search + Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#fff", border: "0.5px solid #e2e2ee",
            borderRadius: 8, padding: "7px 12px", flex: 1, maxWidth: 280,
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="#9999b8" strokeWidth="1.2"/>
              <path d="M9 9l2.5 2.5" stroke="#9999b8" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name or role..."
              style={{
                border: "none", outline: "none", fontSize: 12,
                color: "#1a1a2e", background: "transparent",
                fontFamily: "'DM Sans', sans-serif", flex: 1,
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontSize: 11, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
                  padding: "5px 12px", borderRadius: 6, cursor: "pointer",
                  border: filter === f ? "0.5px solid #1557c4" : "0.5px solid #e2e2ee",
                  background: filter === f ? "#1557c4" : "#fff",
                  color: filter === f ? "#fff" : "#7a7a9a",
                  transition: "all 0.12s ease",
                }}
              >{f}</button>
            ))}
          </div>

          <div style={{ marginLeft: "auto", fontSize: 11, color: "#9999b8" }}>
            {visible.length} of {members.length} members
          </div>
        </div>

        {/* Member list */}
        <div style={{
          background: "#fff", border: "0.5px solid #e2e2ee",
          borderRadius: 12, overflow: "hidden",
        }}>
          {/* List header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 120px 100px",
            padding: "8px 14px",
            borderBottom: "0.5px solid #f0f0f8",
            background: "#fafafa",
          }}>
            {["Member", "Status", "Action"].map(h => (
              <div key={h} style={{ fontSize: 10, color: "#9999b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {h}
              </div>
            ))}
          </div>

          {visible.length === 0 ? (
            <div style={{ padding: "32px 0", textAlign: "center", color: "#9999b8", fontSize: 13 }}>
              No members match your search.<br />
              Try clearing filters or search
            </div>
          ) : (
            visible.map((m, i) => (
              <div key={m.id} style={{ borderBottom: i < visible.length - 1 ? "0.5px solid #f0f0f8" : "none" }}>
                <MemberCard member={m} onStatusChange={handleStatusChange} />
              </div>
            ))
          )}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: 14, fontSize: 11, color: "#9999b8", textAlign: "right" }}>
          Hover a member row to update their status
        </div>

        {/* Toast */}
        {toast && (
          <div style={{
            position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
            background: "#1a1a2e", color: "#fff", borderRadius: 8,
            padding: "10px 18px", fontSize: 12, fontWeight: 500,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            animation: "fadeUp 0.2s ease",
            zIndex: 999,
          }}>
            ✓ {toast}
          </div>
        )}

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateX(-50%) translateY(8px); }
            to   { opacity: 1; transform: translateX(-50%) translateY(0);   }
          }
        `}</style>
      </div>
    </>
  );
}