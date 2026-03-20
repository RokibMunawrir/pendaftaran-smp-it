import { useState, useEffect } from "react";
import Panel from "../panel";
import Modal from "../modal";

// --- Interfaces ---
export interface HeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface AboutSection {
  title: string;
  description: string;
  image: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface AgendaItem {
  title: string;
  date: string;
  description: string;
}

export interface BiayaItem {
  name: string;
  amount: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapEmbed: string;
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
}

export interface LandingPageData {
  siteName: string;
  logo: string;
  announcementBanner: string;
  hero: HeroSection;
  about: AboutSection;
  features: FeatureItem[];
  agenda: AgendaItem[];
  biaya: BiayaItem[];
  biayaBankName: string;
  biayaAccountNumber: string;
  biayaAccountName: string;
  biayaInstruction: string;
  faq: FaqItem[];
  contact: ContactInfo;
  social: SocialMedia;
  announcements: { id: string; title: string; content: string; date: string; isImportant?: boolean }[];
  footer: string;
}

// --- Dummy Data ---
const emptyData: LandingPageData = {
  siteName: "",
  logo: "",
  announcementBanner: "",
  hero: {
    title: "",
    subtitle: "",
    ctaText: "",
    ctaLink: "",
    backgroundImage: "",
  },
  about: {
    title: "",
    description: "",
    image: "",
  },
  features: [],
  agenda: [],
  biaya: [],
  biayaBankName: "",
  biayaAccountNumber: "",
  biayaAccountName: "",
  biayaInstruction: "",
  faq: [],
  contact: {
    address: "",
    phone: "",
    email: "",
    mapEmbed: "",
  },
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
  },
  announcements: [],
  footer: "",
};

// --- Section Components ---
function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-primary">{icon}</div>
            <h3 className="card-title text-base">{title}</h3>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text", helpText }: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  helpText?: string;
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-medium">{label}</span>
      </div>
      <input
        type={type}
        className="input input-bordered input-sm w-full"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {helpText && (
        <div className="label">
          <span className="label-text-alt text-base-content/50">{helpText}</span>
        </div>
      )}
    </label>
  );
}

function ImageUploadField({ label, value, onChange, helpText }: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  helpText?: string;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file to a server and get a URL back.
      // For this UI demo, we'll use a FileReader to show a local preview via data URL.
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="form-control w-full">
      <div className="label">
        <span className="label-text font-medium">{label}</span>
      </div>
      
      {value ? (
        <div className="relative w-fit mt-1 border border-base-300 rounded-lg overflow-hidden group">
          <img src={value} alt="Preview" className="h-32 object-contain bg-base-200" />
          <div className="absolute inset-0 bg-base-300/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              className="btn btn-sm btn-circle btn-error shadow" 
              onClick={handleRemove}
              title="Hapus gambar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <input 
          type="file" 
          accept="image/*"
          className="file-input file-input-bordered file-input-sm w-full" 
          onChange={handleFileChange}
        />
      )}

      {helpText && (
        <div className="label pb-0">
          <span className="label-text-alt text-base-content/50">{helpText}</span>
        </div>
      )}
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder, rows = 3, helpText }: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  helpText?: string;
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-medium">{label}</span>
      </div>
      <textarea
        className="textarea textarea-bordered w-full text-sm"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {helpText && (
        <div className="label">
          <span className="label-text-alt text-base-content/50">{helpText}</span>
        </div>
      )}
    </label>
  );
}

// --- Main Component ---
export default function SettingWebContent({ initialData }: { initialData?: LandingPageData | null }) {
  const [data, setData] = useState<LandingPageData>(() => {
    if (!initialData) return emptyData;
    
    // Deep merge hero, about, contact, and social to ensure they aren't null or missing keys
    return {
      ...emptyData,
      ...initialData,
      hero: { ...emptyData.hero, ...(initialData.hero || {}) },
      about: { ...emptyData.about, ...(initialData.about || {}) },
      contact: { ...emptyData.contact, ...(initialData.contact || {}) },
      social: { ...emptyData.social, ...(initialData.social || {}) },
      features: Array.isArray(initialData.features) ? initialData.features : [],
      agenda: Array.isArray(initialData.agenda) ? initialData.agenda : [],
      biaya: Array.isArray(initialData.biaya) ? initialData.biaya : [],
      faq: Array.isArray(initialData.faq) ? initialData.faq : [],
      announcements: Array.isArray(initialData.announcements) ? initialData.announcements : [],
    };
  });
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [notif, setNotif] = useState<{ open: boolean; message: string; variant: "success" | "error" | "info" | "warning" }>({
    open: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/admin/setting');
          if (res.ok) {
            const result = await res.json();
            if (Array.isArray(result) && result.length > 0) {
              setData({ ...emptyData, ...result[0] });
            }
          }
        } catch (error) {
          console.error("Gagal mengambil data pengaturan:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [initialData]);

  // Feature editing
  const [editingFeature, setEditingFeature] = useState<number | null>(null);
  const [featureForm, setFeatureForm] = useState<FeatureItem>({ icon: "", title: "", description: "" });
  const [openFeatureModal, setOpenFeatureModal] = useState(false);

  // Agenda editing
  const [editingAgenda, setEditingAgenda] = useState<number | null>(null);
  const [agendaForm, setAgendaForm] = useState<AgendaItem>({ title: "", date: "", description: "" });
  const [openAgendaModal, setOpenAgendaModal] = useState(false);

  // Biaya editing
  const [editingBiaya, setEditingBiaya] = useState<number | null>(null);
  const [biayaForm, setBiayaForm] = useState<BiayaItem>({ name: "", amount: "", description: "" });
  const [openBiayaModal, setOpenBiayaModal] = useState(false);

  // FAQ editing
  const [editingFaq, setEditingFaq] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState<FaqItem>({ question: "", answer: "" });
  const [openFaqModal, setOpenFaqModal] = useState(false);
 
  // Announcement editing
  const [editingAnnouncement, setEditingAnnouncement] = useState<number | null>(null);
  const [announcementForm, setAnnouncementForm] = useState<{ title: string; content: string; date: string; isImportant?: boolean }>({ 
    title: "", 
    content: "", 
    date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
    isImportant: false 
  });
  const [openAnnouncementModal, setOpenAnnouncementModal] = useState(false);
 
  const updateHero = (field: keyof HeroSection, value: string) => {
    setData({ ...data, hero: { ...data.hero, [field]: value } });
  };

  const updateAbout = (field: keyof AboutSection, value: string) => {
    setData({ ...data, about: { ...data.about, [field]: value } });
  };

  const updateContact = (field: keyof ContactInfo, value: string) => {
    setData({ ...data, contact: { ...data.contact, [field]: value } });
  };

  const updateSocial = (field: keyof SocialMedia, value: string) => {
    setData({ ...data, social: { ...data.social, [field]: value } });
  };

  // Feature CRUD
  const openAddFeature = () => {
    setEditingFeature(null);
    setFeatureForm({ icon: "", title: "", description: "" });
    setOpenFeatureModal(true);
  };

  const openEditFeature = (index: number) => {
    setEditingFeature(index);
    setFeatureForm(data.features[index]);
    setOpenFeatureModal(true);
  };

  const saveFeature = () => {
    const updated = [...data.features];
    if (editingFeature !== null) {
      updated[editingFeature] = featureForm;
    } else {
      updated.push(featureForm);
    }
    setData({ ...data, features: updated });
    setOpenFeatureModal(false);
  };

  const deleteFeature = (index: number) => {
    setData({ ...data, features: data.features.filter((_, i) => i !== index) });
  };

  // Agenda CRUD
  const openAddAgenda = () => {
    setEditingAgenda(null);
    setAgendaForm({ title: "", date: "", description: "" });
    setOpenAgendaModal(true);
  };
  const openEditAgenda = (index: number) => {
    setEditingAgenda(index);
    setAgendaForm(data.agenda[index]);
    setOpenAgendaModal(true);
  };
  const saveAgenda = () => {
    const updated = [...data.agenda];
    if (editingAgenda !== null) { updated[editingAgenda] = agendaForm; } else { updated.push(agendaForm); }
    setData({ ...data, agenda: updated });
    setOpenAgendaModal(false);
  };
  const deleteAgenda = (index: number) => {
    setData({ ...data, agenda: data.agenda.filter((_, i) => i !== index) });
  };

  // Biaya CRUD
  const openAddBiaya = () => {
    setEditingBiaya(null);
    setBiayaForm({ name: "", amount: "", description: "" });
    setOpenBiayaModal(true);
  };
  const openEditBiaya = (index: number) => {
    setEditingBiaya(index);
    setBiayaForm(data.biaya[index]);
    setOpenBiayaModal(true);
  };
  const saveBiaya = () => {
    const updated = [...data.biaya];
    if (editingBiaya !== null) { updated[editingBiaya] = biayaForm; } else { updated.push(biayaForm); }
    setData({ ...data, biaya: updated });
    setOpenBiayaModal(false);
  };
  const deleteBiaya = (index: number) => {
    setData({ ...data, biaya: data.biaya.filter((_, i) => i !== index) });
  };

  // FAQ CRUD
  const openAddFaq = () => {
    setEditingFaq(null);
    setFaqForm({ question: "", answer: "" });
    setOpenFaqModal(true);
  };
  const openEditFaq = (index: number) => {
    setEditingFaq(index);
    setFaqForm(data.faq[index]);
    setOpenFaqModal(true);
  };
  const saveFaq = () => {
    const updated = [...data.faq];
    if (editingFaq !== null) { updated[editingFaq] = faqForm; } else { updated.push(faqForm); }
    setData({ ...data, faq: updated });
    setOpenFaqModal(false);
  };
  const deleteFaq = (index: number) => {
    setData({ ...data, faq: data.faq.filter((_, i) => i !== index) });
  };
 
  // Announcement CRUD
  const openAddAnnouncement = () => {
    setEditingAnnouncement(null);
    setAnnouncementForm({ 
      title: "", 
      content: "", 
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      isImportant: false 
    });
    setOpenAnnouncementModal(true);
  };
  const openEditAnnouncement = (index: number) => {
    setEditingAnnouncement(index);
    setAnnouncementForm(data.announcements[index]);
    setOpenAnnouncementModal(true);
  };
  const saveAnnouncement = () => {
    const updated = [...data.announcements];
    if (editingAnnouncement !== null) { 
      updated[editingAnnouncement] = { ...announcementForm, id: data.announcements[editingAnnouncement].id }; 
    } else { 
      updated.push({ ...announcementForm, id: Date.now().toString() }); 
    }
    setData({ ...data, announcements: updated });
    setOpenAnnouncementModal(false);
  };
  const deleteAnnouncement = (index: number) => {
    setData({ ...data, announcements: data.announcements.filter((_, i) => i !== index) });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/setting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setOpenSave(false);
        setNotif({ open: true, message: "Pengaturan landing page berhasil disimpan!", variant: "success" });
      } else {
        setNotif({ open: true, message: "Gagal menyimpan pengaturan", variant: "error" });
      }
    } catch (error) {
      console.error(error);
      setNotif({ open: true, message: "Terjadi kesalahan jaringan", variant: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Panel title="Setting Website">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold">Pengaturan Tampilan Landing Page</h2>
          <p className="text-sm text-base-content/50">Atur konten dan tampilan halaman depan website pendaftaran</p>
        </div>
        <button className="btn btn-primary btn-sm gap-2" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
            </svg>
          )}
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {/* ═══ Identitas Website ═══ */}
        <SectionCard
          title="Identitas Website"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <InputField
              label="Nama Situs"
              value={data.siteName}
              onChange={(val) => setData({ ...data, siteName: val })}
              placeholder="Nama pondok pesantren"
            />
            <ImageUploadField
              label="Logo Website"
              value={data.logo}
              onChange={(val) => setData({ ...data, logo: val })}
              helpText="Gunakan gambar PNG transparan (max 2MB). Kosongkan untuk nama situs."
            />
          </div>
          <div className="mt-3">
            <InputField
              label="Banner Pengumuman"
              value={data.announcementBanner}
              onChange={(val) => setData({ ...data, announcementBanner: val })}
              placeholder="Teks pengumuman di bagian atas halaman"
              helpText="Ditampilkan sebagai banner di atas navbar. Kosongkan untuk menyembunyikan"
            />
          </div>
        </SectionCard>

        {/* ═══ Hero Section ═══ */}
        <SectionCard
          title="Hero Section"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
          }
        >
          <div className="space-y-3">
            <InputField
              label="Judul Utama"
              value={data.hero.title}
              onChange={(val) => updateHero("title", val)}
              placeholder="Judul besar di hero section"
            />
            <TextareaField
              label="Subjudul"
              value={data.hero.subtitle}
              onChange={(val) => updateHero("subtitle", val)}
              placeholder="Deskripsi singkat di bawah judul"
              rows={3}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Teks Tombol CTA"
                value={data.hero.ctaText}
                onChange={(val) => updateHero("ctaText", val)}
                placeholder="Contoh: Daftar Sekarang"
              />
              <InputField
                label="Link Tombol CTA"
                value={data.hero.ctaLink}
                onChange={(val) => updateHero("ctaLink", val)}
                placeholder="/register"
              />
            </div>
            <ImageUploadField
              label="Gambar Background"
              value={data.hero.backgroundImage}
              onChange={(val) => updateHero("backgroundImage", val)}
              helpText="Ukuran disarankan: 1920x800px (JPG/PNG max 2MB)"
            />
          </div>
        </SectionCard>

        {/* ═══ Tentang Pondok ═══ */}
        <SectionCard
          title="Tentang Pondok"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          }
        >
          <div className="space-y-3">
            <InputField
              label="Judul Bagian"
              value={data.about.title}
              onChange={(val) => updateAbout("title", val)}
              placeholder="Tentang Pondok Pesantren"
            />
            <TextareaField
              label="Deskripsi"
              value={data.about.description}
              onChange={(val) => updateAbout("description", val)}
              placeholder="Ceritakan tentang pondok pesantren..."
              rows={4}
            />
            <ImageUploadField
              label="Gambar Tentang Pondok"
              value={data.about.image}
              onChange={(val) => updateAbout("image", val)}
              helpText="Foto pondok pesantren atau kegiatan santri"
            />
          </div>
        </SectionCard>

        {/* ═══ Keunggulan / Fitur ═══ */}
        <SectionCard
          title="Keunggulan / Fitur"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          }
        >
          <div className="space-y-3">
            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-base-300 bg-base-200/30">
                  <span className="text-2xl">{f.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{f.title}</h4>
                    <p className="text-xs text-base-content/50 mt-0.5">{f.description}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button className="btn btn-ghost btn-xs" onClick={() => openEditFeature(i)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </button>
                    <button className="btn btn-ghost btn-xs text-error" onClick={() => deleteFeature(i)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline btn-sm gap-2 mt-3" onClick={openAddFeature}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Tambah Keunggulan
            </button>
          </div>
        </SectionCard>

        {/* ═══ Agenda Kegiatan Pendaftaran ═══ */}
        <SectionCard
          title="Agenda Kegiatan Pendaftaran"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          }
        >
          <div className="space-y-3">
            <div className="space-y-2">
              {data.agenda.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-base-300 bg-base-200/30">
                  <div className="flex flex-col items-center justify-center shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium text-sm">{a.title}</h4>
                      <span className="badge badge-ghost badge-xs">{a.date}</span>
                    </div>
                    <p className="text-xs text-base-content/50 mt-0.5">{a.description}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button className="btn btn-ghost btn-sm" onClick={() => openEditAgenda(i)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </button>
                    <button className="btn btn-ghost btn-sm text-error" onClick={() => deleteAgenda(i)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline btn-sm gap-2 mt-3" onClick={openAddAgenda}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Tambah Agenda
            </button>
          </div>
        </SectionCard>

        {/* ═══ Announcements ═══ */}
        <SectionCard
          title="Pengumuman Terbaru (Pusat Informasi)"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75v-.7V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
            </svg>
          }
        >
          <div className="space-y-3">
            <div className="space-y-2">
              {data.announcements.map((ann, i) => (
                <div key={i} className={`rounded-lg border border-base-300 bg-base-200/30 overflow-hidden ${ann.isImportant ? 'ring-1 ring-error/30 border-error/20' : ''}`}>
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm truncate">{ann.title}</h4>
                        {ann.isImportant && <span className="badge badge-error badge-xs">Penting</span>}
                      </div>
                      <p className="text-xs text-base-content/50 mt-0.5">{ann.date}</p>
                    </div>
                    <div className="flex gap-1 shrink-0 ml-3">
                      <button className="btn btn-ghost btn-sm" onClick={() => openEditAnnouncement(i)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                      <button className="btn btn-ghost btn-sm text-error" onClick={() => deleteAnnouncement(i)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-base-300 px-4 py-3 bg-base-100">
                    <p className="text-sm text-base-content/60 line-clamp-2">{ann.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline btn-sm gap-2 mt-3" onClick={openAddAnnouncement}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Tambah Pengumuman
            </button>
          </div>
        </SectionCard>

        {/* ═══ Biaya Pendaftaran ═══ */}
        <SectionCard
          title="Biaya Pendaftaran"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
          }
        >
          <div className="space-y-5">
            {/* Informasi Rekening Pembayaran */}
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
              <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
                Informasi Rekening Pembayaran
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Nama Bank"
                  value={data.biayaBankName}
                  onChange={(val) => setData({ ...data, biayaBankName: val })}
                  placeholder="Contoh: Bank Syariah Indonesia (BSI)"
                />
                <InputField
                  label="Nomor Rekening"
                  value={data.biayaAccountNumber}
                  onChange={(val) => setData({ ...data, biayaAccountNumber: val })}
                  placeholder="Contoh: 7123 4567 89"
                />
                <InputField
                  label="Nama Pemilik Rekening"
                  value={data.biayaAccountName}
                  onChange={(val) => setData({ ...data, biayaAccountName: val })}
                  placeholder="Contoh: Yayasan Pondok Pesantren"
                />
              </div>
              <div className="mt-3">
                <TextareaField
                  label="Tata Cara Pembayaran"
                  value={data.biayaInstruction}
                  onChange={(val) => setData({ ...data, biayaInstruction: val })}
                  placeholder="Silakan transfer sesuai nominal di atas. Simpan bukti transfer untuk diunggah."
                  rows={3}
                  helpText="Instruksi ini akan ditampilkan di halaman pembayaran user"
                />
              </div>
            </div>

            {/* Daftar Komponen Biaya */}
            <div>
              <h4 className="text-sm font-bold text-base-content/70 mb-2">Rincian Komponen Biaya</h4>
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Komponen Biaya</th>
                      <th>Jumlah</th>
                      <th>Keterangan</th>
                      <th className="w-24">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.biaya.map((b, i) => (
                      <tr key={i} className="hover:bg-base-200/50">
                        <td className="font-medium">{b.name}</td>
                        <td><span className="badge badge-ghost badge-sm">{b.amount}</span></td>
                        <td className="text-sm text-base-content/60">{b.description}</td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-ghost btn-sm" onClick={() => openEditBiaya(i)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                            </button>
                            <button className="btn btn-ghost btn-sm text-error" onClick={() => deleteBiaya(i)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="btn btn-outline btn-sm gap-2 mt-3" onClick={openAddBiaya}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Tambah Biaya
              </button>
            </div>
          </div>
        </SectionCard>

        {/* ═══ FAQ ═══ */}
        <SectionCard
          title="FAQ (Pertanyaan Umum)"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          }
        >
          <div className="space-y-3">
            <div className="space-y-2">
              {data.faq.map((f, i) => (
                <div key={i} className="rounded-lg border border-base-300 bg-base-200/30 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3">
                    <h4 className="font-medium text-sm flex-1">{f.question}</h4>
                    <div className="flex gap-1 shrink-0 ml-3">
                      <button className="btn btn-ghost btn-sm" onClick={() => openEditFaq(i)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                      <button className="btn btn-ghost btn-sm text-error" onClick={() => deleteFaq(i)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-base-300 px-4 py-3">
                    <p className="text-sm text-base-content/60">{f.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline btn-sm gap-2 mt-3" onClick={openAddFaq}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Tambah FAQ
            </button>
          </div>
        </SectionCard>

        {/* ═══ Kontak & Alamat ═══ */}
        <SectionCard
          title="Kontak & Alamat"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          }
        >
          <div className="space-y-3">
            <TextareaField
              label="Alamat Lengkap"
              value={data.contact.address}
              onChange={(val) => updateContact("address", val)}
              placeholder="Alamat lengkap pondok pesantren"
              rows={2}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="No. Telepon"
                value={data.contact.phone}
                onChange={(val) => updateContact("phone", val)}
                placeholder="0812-3456-7890"
              />
              <InputField
                label="Email"
                value={data.contact.email}
                onChange={(val) => updateContact("email", val)}
                placeholder="info@example.com"
                type="email"
              />
            </div>
            <InputField
              label="Embed Google Maps"
              value={data.contact.mapEmbed}
              onChange={(val) => updateContact("mapEmbed", val)}
              placeholder='URL embed dari Google Maps'
              helpText="Buka Google Maps → Bagikan → Sematkan peta → Salin URL src dari iframe"
            />
          </div>
        </SectionCard>

        {/* ═══ Media Sosial ═══ */}
        <SectionCard
          title="Media Sosial"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Facebook"
              value={data.social.facebook}
              onChange={(val) => updateSocial("facebook", val)}
              placeholder="https://facebook.com/..."
            />
            <InputField
              label="Instagram"
              value={data.social.instagram}
              onChange={(val) => updateSocial("instagram", val)}
              placeholder="https://instagram.com/..."
            />
            <InputField
              label="YouTube"
              value={data.social.youtube}
              onChange={(val) => updateSocial("youtube", val)}
              placeholder="https://youtube.com/@..."
            />
            <InputField
              label="WhatsApp"
              value={data.social.whatsapp}
              onChange={(val) => updateSocial("whatsapp", val)}
              placeholder="6281234567890"
              helpText="Nomor WhatsApp dengan kode negara (tanpa +)"
            />
          </div>
        </SectionCard>

        {/* ═══ Footer ═══ */}
        <SectionCard
          title="Footer"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 6.5h9M7.5 9.5h9M7.5 12.5h9m-12 9h16.5a2.25 2.25 0 0 0 2.25-2.25V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
          }
        >
          <InputField
            label="Teks Footer"
            value={data.footer}
            onChange={(val) => setData({ ...data, footer: val })}
            placeholder="© 2026 Nama Pondok. Hak cipta dilindungi."
          />
        </SectionCard>
      </div>

      {/* ═══ Modals ═══ */}

      {/* Modal Simpan */}
      <Modal
        open={openSave}
        onClose={() => setOpenSave(false)}
        title="Simpan Perubahan"
        onConfirm={handleSave}
        variant="success"
        confirmLabel="Simpan"
      >
        <p>Apakah Anda yakin ingin menyimpan perubahan pengaturan landing page?</p>
      </Modal>

      {/* Modal Feature */}
      <Modal
        open={openFeatureModal}
        onClose={() => setOpenFeatureModal(false)}
        title={editingFeature !== null ? "Edit Keunggulan" : "Tambah Keunggulan"}
        onConfirm={saveFeature}
        variant="info"
        confirmLabel="Simpan"
        loading={featureForm.title.trim() === "" || featureForm.description.trim() === ""}
      >
        <div className="flex flex-col gap-3">
          <InputField
            label="Ikon (Emoji)"
            value={featureForm.icon}
            onChange={(val) => setFeatureForm({ ...featureForm, icon: val })}
            placeholder="📖"
            helpText="Gunakan satu emoji sebagai ikon"
          />
          <InputField
            label="Judul"
            value={featureForm.title}
            onChange={(val) => setFeatureForm({ ...featureForm, title: val })}
            placeholder="Nama keunggulan"
          />
          <TextareaField
            label="Deskripsi"
            value={featureForm.description}
            onChange={(val) => setFeatureForm({ ...featureForm, description: val })}
            placeholder="Deskripsi singkat keunggulan"
            rows={2}
          />
        </div>
      </Modal>

      {/* Modal Agenda */}
      <Modal
        open={openAgendaModal}
        onClose={() => setOpenAgendaModal(false)}
        title={editingAgenda !== null ? "Edit Agenda" : "Tambah Agenda"}
        onConfirm={saveAgenda}
        variant="info"
        confirmLabel="Simpan"
        loading={agendaForm.title.trim() === "" || agendaForm.date.trim() === ""}
      >
        <div className="flex flex-col gap-3">
          <InputField
            label="Nama Kegiatan"
            value={agendaForm.title}
            onChange={(val) => setAgendaForm({ ...agendaForm, title: val })}
            placeholder="Contoh: Tes Masuk"
          />
          <InputField
            label="Tanggal / Periode"
            value={agendaForm.date}
            onChange={(val) => setAgendaForm({ ...agendaForm, date: val })}
            placeholder="Contoh: 15 Maret 2026"
            helpText="Bisa berupa tanggal tunggal atau rentang tanggal"
          />
          <TextareaField
            label="Deskripsi"
            value={agendaForm.description}
            onChange={(val) => setAgendaForm({ ...agendaForm, description: val })}
            placeholder="Keterangan singkat kegiatan"
            rows={2}
          />
        </div>
      </Modal>

      {/* Modal Biaya */}
      <Modal
        open={openBiayaModal}
        onClose={() => setOpenBiayaModal(false)}
        title={editingBiaya !== null ? "Edit Biaya" : "Tambah Biaya"}
        onConfirm={saveBiaya}
        variant="info"
        confirmLabel="Simpan"
        loading={biayaForm.name.trim() === "" || biayaForm.amount.trim() === ""}
      >
        <div className="flex flex-col gap-3">
          <InputField
            label="Komponen Biaya"
            value={biayaForm.name}
            onChange={(val) => setBiayaForm({ ...biayaForm, name: val })}
            placeholder="Contoh: SPP Bulanan"
          />
          <InputField
            label="Jumlah"
            value={biayaForm.amount}
            onChange={(val) => setBiayaForm({ ...biayaForm, amount: val })}
            placeholder="Contoh: Rp 1.500.000"
          />
          <TextareaField
            label="Keterangan"
            value={biayaForm.description}
            onChange={(val) => setBiayaForm({ ...biayaForm, description: val })}
            placeholder="Keterangan tambahan"
            rows={2}
          />
        </div>
      </Modal>

      {/* Modal FAQ */}
      <Modal
        open={openFaqModal}
        onClose={() => setOpenFaqModal(false)}
        title={editingFaq !== null ? "Edit FAQ" : "Tambah FAQ"}
        onConfirm={saveFaq}
        variant="info"
        confirmLabel="Simpan"
        loading={faqForm.question.trim() === "" || faqForm.answer.trim() === ""}
      >
        <div className="flex flex-col gap-3">
          <InputField
            label="Pertanyaan"
            value={faqForm.question}
            onChange={(val) => setFaqForm({ ...faqForm, question: val })}
            placeholder="Contoh: Berapa usia minimal untuk mendaftar?"
          />
          <TextareaField
            label="Jawaban"
            value={faqForm.answer}
            onChange={(val) => setFaqForm({ ...faqForm, answer: val })}
            placeholder="Tulis jawaban dari pertanyaan"
            rows={3}
          />
        </div>
      </Modal>
 
      {/* Modal Announcement */}
      <Modal
        open={openAnnouncementModal}
        onClose={() => setOpenAnnouncementModal(false)}
        title={editingAnnouncement !== null ? "Edit Pengumuman" : "Tambah Pengumuman"}
        onConfirm={saveAnnouncement}
        variant="info"
        confirmLabel="Simpan"
        loading={announcementForm.title.trim() === "" || announcementForm.content.trim() === ""}
      >
        <div className="flex flex-col gap-3">
          <InputField
            label="Judul Pengumuman"
            value={announcementForm.title}
            onChange={(val) => setAnnouncementForm({ ...announcementForm, title: val })}
            placeholder="Masukkan judul pengumuman"
          />
          <TextareaField
            label="Isi Pengumuman"
            value={announcementForm.content}
            onChange={(val) => setAnnouncementForm({ ...announcementForm, content: val })}
            placeholder="Tuliskan isi pengumuman secara detail..."
            rows={4}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Tanggal"
              value={announcementForm.date}
              onChange={(val) => setAnnouncementForm({ ...announcementForm, date: val })}
              placeholder="Contoh: 14 Mar 2026"
            />
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Tandai Penting</span>
              </label>
              <div className="flex items-center gap-3 h-10 px-3 border border-base-300 rounded-lg bg-base-100">
                <span className="text-xs font-medium">{announcementForm.isImportant ? 'Ya' : 'Tidak'}</span>
                <input 
                  type="checkbox" 
                  className="toggle toggle-error toggle-xs ml-auto" 
                  checked={announcementForm.isImportant}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, isImportant: e.target.checked })}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Notification */}
      <Modal open={notif.open} onClose={() => setNotif({ ...notif, open: false })} mode="notification" variant={notif.variant} duration={3000} position="top-end">
        <p>{notif.message}</p>
      </Modal>
    </Panel>
  );
}
