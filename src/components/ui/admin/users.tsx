import { useState } from "react";
import Panel from "../panel";
import Pagination from "../pagination";
import Modal from "../modal";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Operator";
  status: "Aktif" | "Nonaktif";
  lastLogin: string;
}

const dummyUsers: User[] = [
  { id: 1, name: "Admin Utama", email: "admin@pondok.id", role: "Admin", status: "Aktif", lastLogin: "2026-03-06 20:15" },
  { id: 2, name: "Ustaz Ahmad", email: "ahmad@pondok.id", role: "Operator", status: "Aktif", lastLogin: "2026-03-06 18:30" },
  { id: 3, name: "Ustazah Fatimah", email: "fatimah@pondok.id", role: "Operator", status: "Aktif", lastLogin: "2026-03-05 09:00" },
  { id: 4, name: "Budi Santoso", email: "budi@pondok.id", role: "Operator", status: "Nonaktif", lastLogin: "2026-02-20 14:00" },
  { id: 5, name: "Siti Rahmah", email: "siti@pondok.id", role: "Admin", status: "Aktif", lastLogin: "2026-03-06 21:00" },
  { id: 6, name: "Hasan Basri", email: "hasan@pondok.id", role: "Operator", status: "Nonaktif", lastLogin: "2026-01-15 10:30" },
];

const statusBadge: Record<User["status"], string> = {
  Aktif: "badge-success",
  Nonaktif: "badge-ghost",
};

const roleBadge: Record<User["role"], string> = {
  Admin: "badge-primary",
  Operator: "badge-secondary",
};

const entriesOptions = [5, 10, 25, 50];

// Form kosong default
const emptyForm = { name: "", email: "", role: "Operator" as User["role"], status: "Aktif" as User["status"] };

export default function UsersContent() {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);

  // Notification
  const [notif, setNotif] = useState<{ open: boolean; message: string; variant: "success" | "error" | "info" | "warning" }>({
    open: false,
    message: "",
    variant: "success",
  });

  // Filter
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.status.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * perPage;
  const paginatedData = filtered.slice(startIndex, startIndex + perPage);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  // Add user
  const handleAdd = () => {
    const newUser: User = {
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      name: form.name,
      email: form.email,
      role: form.role,
      status: form.status,
      lastLogin: "-",
    };
    setUsers([...users, newUser]);
    setOpenAdd(false);
    setForm(emptyForm);
    setNotif({ open: true, message: `User "${newUser.name}" berhasil ditambahkan`, variant: "success" });
  };

  // Edit user
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status });
    setOpenEdit(true);
  };

  const handleEdit = () => {
    if (!selectedUser) return;
    setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...form } : u)));
    setOpenEdit(false);
    setSelectedUser(null);
    setForm(emptyForm);
    setNotif({ open: true, message: `User "${form.name}" berhasil diperbarui`, variant: "success" });
  };

  // Delete user
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setOpenDelete(false);
    setNotif({ open: true, message: `User "${selectedUser.name}" berhasil dihapus`, variant: "success" });
    setSelectedUser(null);
  };

  // Form fields component
  const UserForm = () => (
    <div className="flex flex-col gap-3">
      <label className="form-control w-full">
        <div className="label"><span className="label-text">Nama</span></div>
        <input type="text" className="input input-bordered input-sm w-full" placeholder="Nama lengkap" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </label>
      <label className="form-control w-full">
        <div className="label"><span className="label-text">Email</span></div>
        <input type="email" className="input input-bordered input-sm w-full" placeholder="email@contoh.id" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </label>
      <label className="form-control w-full">
        <div className="label"><span className="label-text">Role</span></div>
        <select className="select select-bordered select-sm w-full" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as User["role"] })}>
          <option value="Admin">Admin</option>
          <option value="Operator">Operator</option>
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label"><span className="label-text">Status</span></div>
        <select className="select select-bordered select-sm w-full" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as User["status"] })}>
          <option value="Aktif">Aktif</option>
          <option value="Nonaktif">Nonaktif</option>
        </select>
      </label>
    </div>
  );

  return (
    <Panel title="Users">
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-base">Manajemen Users</h3>
            <button className="btn btn-primary btn-sm gap-2" onClick={() => { setForm(emptyForm); setOpenAdd(true); }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
              Tambah User
            </button>
          </div>

          {/* Search & Entries */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">Tampilkan</span>
              <select className="select select-bordered select-sm w-20" value={perPage} onChange={(e) => handlePerPageChange(Number(e.target.value))}>
                {entriesOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <span className="text-sm">data</span>
            </div>
            <label className="input input-bordered input-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
              <input type="text" className="grow" placeholder="Cari user..." value={search} onChange={(e) => handleSearch(e.target.value)} />
            </label>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Login Terakhir</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-base-content/50">Data tidak ditemukan</td>
                  </tr>
                ) : (
                  paginatedData.map((u, i) => (
                    <tr key={u.id} className="hover:bg-base-200/50">
                      <td>{startIndex + i + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-10 w-10">
                              <img className="rounded-full" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random&size=80`} alt={u.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{u.name}</div>
                            <div className="text-sm text-base-content/50">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className={`badge badge-sm ${roleBadge[u.role]}`}>{u.role}</span></td>
                      <td><span className={`badge badge-sm ${statusBadge[u.status]}`}>{u.status}</span></td>
                      <td className="text-sm text-base-content/60">{u.lastLogin}</td>
                      <td>
                        <div className="flex gap-1">
                          <button className="btn btn-ghost btn-xs" onClick={() => openEditModal(u)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Edit
                          </button>
                          <button className="btn btn-ghost btn-xs text-error" onClick={() => openDeleteModal(u)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Info & Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-2">
            <span className="text-sm text-base-content/50">
              Menampilkan {filtered.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + perPage, filtered.length)} dari {filtered.length} data
              {search && ` (difilter dari ${users.length} total)`}
            </span>
            <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>

      {/* Modal Tambah User */}
      <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Tambah User Baru" variant="info" confirmLabel="Simpan" onConfirm={handleAdd}>
        <UserForm />
      </Modal>

      {/* Modal Edit User */}
      <Modal open={openEdit} onClose={() => { setOpenEdit(false); setSelectedUser(null); }} title="Edit User" variant="warning" confirmLabel="Perbarui" onConfirm={handleEdit}>
        <UserForm />
      </Modal>

      {/* Modal Hapus User */}
      <Modal open={openDelete} onClose={() => { setOpenDelete(false); setSelectedUser(null); }} title="Hapus User" variant="error" confirmLabel="Hapus" onConfirm={handleDelete}>
        <p>Apakah Anda yakin ingin menghapus user <strong>{selectedUser?.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
      </Modal>

      {/* Notification */}
      <Modal open={notif.open} onClose={() => setNotif({ ...notif, open: false })} mode="notification" variant={notif.variant} duration={3000} position="top-end">
        <p>{notif.message}</p>
      </Modal>
    </Panel>
  );
}
