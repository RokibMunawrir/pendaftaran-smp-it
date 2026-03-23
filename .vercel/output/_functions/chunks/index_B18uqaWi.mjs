import { c as createComponent } from './astro-component_BNzcyMhR.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_q2GBgLGh.mjs';
import { r as renderComponent } from './entrypoint_CFef_-o-.mjs';
import { $ as $$Layout } from './Layout_D1AtF-Rk.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { N as NavbarUser, T as TimelineProgress } from './timeline-progress_gLgtSjZ8.mjs';
import { z } from 'zod';
import { t as toTitleCase } from './string_DxHjmCCS.mjs';
import { a as getProfileByUserId } from './profiles_DJkIwHAp.mjs';
import { g as getUser } from './user_Bn5kOyuo.mjs';
import { e as ensureRegistration } from './registrations_D6_46JUM.mjs';
import { a as getRegistrationPaths } from './registration-settings_0AOtr-1D.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const biodataSchema = z.object({
  // Data Pribadi
  namaLengkap: z.string().min(1, "Nama lengkap wajib diisi"),
  nik: z.string().length(16, "NIK harus 16 digit"),
  nisn: z.string().min(1, "NISN wajib diisi"),
  tempatLahir: z.string().min(1, "Tempat lahir wajib diisi"),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  jenisKelamin: z.string().min(1, "Jenis kelamin wajib dipilih"),
  agama: z.string().min(1, "Agama wajib diisi"),
  hobi: z.string().optional(),
  citaCita: z.string().optional(),
  // Data Orang Tua
  namaAyah: z.string().min(1, "Nama ayah wajib diisi"),
  pekerjaanAyah: z.string().min(1, "Pekerjaan ayah wajib dipilih"),
  penghasilanAyah: z.string().min(1, "Penghasilan ayah wajib dipilih"),
  namaIbu: z.string().min(1, "Nama ibu wajib diisi"),
  pekerjaanIbu: z.string().min(1, "Pekerjaan ibu wajib dipilih"),
  penghasilanIbu: z.string().min(1, "Penghasilan ibu wajib dipilih"),
  noTelpOrtu: z.string().min(10, "Nomor telepon minimal 10 digit").max(13, "Nomor telepon maksimal 13 digit"),
  // Alamat & Sekolah
  alamatLengkap: z.string().min(1, "Alamat lengkap wajib diisi"),
  provinsi: z.string().min(1, "Provinsi wajib diisi"),
  kabupaten: z.string().min(1, "Kabupaten/Kota wajib diisi"),
  kecamatan: z.string().min(1, "Kecamatan wajib diisi"),
  asalSekolah: z.string().min(1, "Asal sekolah wajib diisi"),
  npsnSekolahAsal: z.string().length(8, "NPSN harus 8 digit").optional().or(z.literal("")),
  program: z.string().min(1, "Program wajib diisi")
});
function Biodata({
  userId,
  initialData = null,
  user = { name: "User", registrationNumber: null },
  steps = [],
  programs = []
}) {
  const [activeTab, setActiveTab] = useState("pribadi");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [notif, setNotif] = useState({
    open: false,
    message: "",
    variant: "success"
  });
  const [formData, setFormData] = useState({
    // Data Pribadi
    namaLengkap: user?.name || initialData?.name || initialData?.namaLengkap || "",
    nik: initialData?.nik || "",
    nisn: initialData?.nisn || "",
    tempatLahir: initialData?.placeOfBirth || initialData?.place_of_birth || initialData?.tempatLahir || "",
    tanggalLahir: "",
    jenisKelamin: initialData?.gender || initialData?.jenisKelamin || "",
    agama: initialData?.religion || initialData?.agama || "Islam",
    hobi: initialData?.hobby || initialData?.hobi || "",
    citaCita: initialData?.ambition || initialData?.citaCita || initialData?.ambition || "",
    // Data Orang Tua
    namaAyah: initialData?.fatherName || initialData?.father_name || initialData?.namaAyah || "",
    pekerjaanAyah: initialData?.fatherJob || initialData?.father_job || initialData?.pekerjaanAyah || "",
    penghasilanAyah: initialData?.fatherIncome || initialData?.father_income || initialData?.penghasilanAyah || "",
    namaIbu: initialData?.motherName || initialData?.mother_name || initialData?.namaIbu || "",
    pekerjaanIbu: initialData?.motherJob || initialData?.mother_job || initialData?.pekerjaanIbu || "",
    penghasilanIbu: initialData?.motherIncome || initialData?.mother_income || initialData?.penghasilanIbu || "",
    noTelpOrtu: initialData?.parentPhone || initialData?.parent_phone || initialData?.noTelpOrtu || "",
    // Alamat & Sekolah
    alamatLengkap: initialData?.address || initialData?.alamatLengkap || "",
    provinsi: initialData?.province || initialData?.provinsi || "",
    kabupaten: initialData?.city || initialData?.kabupaten || "",
    kecamatan: initialData?.district || initialData?.kecamatan || "",
    asalSekolah: initialData?.previousSchool || initialData?.previous_school || initialData?.asalSekolah || "",
    npsnSekolahAsal: initialData?.originSchoolNpsn || initialData?.origin_school_npsn || initialData?.npsnSekolahAsal || "",
    program: initialData?.program || ""
  });
  useEffect(() => {
    if (initialData || user) {
      const parseDate = (d) => {
        if (!d) return "";
        try {
          const date = new Date(d);
          return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
        } catch (e) {
          return "";
        }
      };
      setFormData((prev) => ({
        ...prev,
        namaLengkap: user?.name || initialData?.name || initialData?.namaLengkap || prev.namaLengkap,
        nik: initialData?.nik ?? prev.nik,
        nisn: initialData?.nisn ?? prev.nisn,
        tempatLahir: initialData?.placeOfBirth || initialData?.place_of_birth || initialData?.tempatLahir || prev.tempatLahir,
        tanggalLahir: parseDate(initialData?.dateOfBirth) || parseDate(initialData?.date_of_birth) || parseDate(initialData?.tanggalLahir) || prev.tanggalLahir,
        jenisKelamin: initialData?.gender || initialData?.jenisKelamin || prev.jenisKelamin,
        agama: initialData?.religion || initialData?.agama || prev.agama,
        hobi: initialData?.hobby || initialData?.hobi || prev.hobi,
        citaCita: initialData?.ambition || initialData?.citaCita || prev.citaCita,
        namaAyah: initialData?.fatherName || initialData?.father_name || initialData?.namaAyah || prev.namaAyah,
        pekerjaanAyah: initialData?.fatherJob || initialData?.father_job || initialData?.pekerjaanAyah || prev.pekerjaanAyah,
        penghasilanAyah: initialData?.fatherIncome || initialData?.father_income || initialData?.penghasilanAyah || prev.penghasilanAyah,
        namaIbu: initialData?.motherName || initialData?.mother_name || initialData?.namaIbu || prev.namaIbu,
        pekerjaanIbu: initialData?.motherJob || initialData?.mother_job || initialData?.pekerjaanIbu || prev.pekerjaanIbu,
        penghasilanIbu: initialData?.motherIncome || initialData?.mother_income || initialData?.penghasilanIbu || prev.penghasilanIbu,
        noTelpOrtu: initialData?.parentPhone || initialData?.parent_phone || initialData?.noTelpOrtu || prev.noTelpOrtu,
        alamatLengkap: initialData?.address || initialData?.alamatLengkap || prev.alamatLengkap,
        provinsi: initialData?.province || initialData?.provinsi || prev.provinsi,
        kabupaten: initialData?.city || initialData?.kabupaten || prev.kabupaten,
        kecamatan: initialData?.district || initialData?.kecamatan || prev.kecamatan,
        asalSekolah: initialData?.previousSchool || initialData?.previous_school || initialData?.asalSekolah || prev.asalSekolah,
        npsnSekolahAsal: initialData?.originSchoolNpsn || initialData?.origin_school_npsn || initialData?.npsnSekolahAsal || prev.npsnSekolahAsal,
        program: initialData?.program || prev.program
      }));
    }
  }, [initialData, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (["namaLengkap", "namaAyah", "namaIbu"].includes(name)) {
      finalValue = toTitleCase(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: finalValue
    }));
  };
  const handleSubmit = async (e, isDraft = false) => {
    if (e) e.preventDefault();
    setFieldErrors({});
    if (!isDraft) {
      const result = biodataSchema.safeParse(formData);
      if (!result.success) {
        const formattedErrors = {};
        result.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            formattedErrors[issue.path[0]] = issue.message;
          }
        });
        setFieldErrors(formattedErrors);
        const firstErrorPath = result.error.issues[0].path[0];
        if (["namaLengkap", "nik", "nisn", "tempatLahir", "tanggalLahir", "jenisKelamin", "agama", "hobi", "citaCita"].includes(firstErrorPath)) {
          setActiveTab("pribadi");
        } else if (["namaAyah", "pekerjaanAyah", "penghasilanAyah", "namaIbu", "pekerjaanIbu", "penghasilanIbu", "noTelpOrtu"].includes(firstErrorPath)) {
          setActiveTab("ortu");
        } else if (["alamatLengkap", "provinsi", "kabupaten", "kecamatan", "asalSekolah", "npsnSekolahAsal"].includes(firstErrorPath)) {
          setActiveTab("alamat");
        } else if (["program"].includes(firstErrorPath)) {
          setActiveTab("program");
        }
        return;
      }
    }
    setIsSaving(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId })
      });
      if (response.ok) {
        setNotif({ open: true, message: isDraft ? "Draf Berhasil Disimpan!" : "Data Berhasil Disimpan!", variant: "success" });
        setTimeout(() => {
          window.location.href = "/user/dashboard";
        }, 1500);
      } else {
        const err = await response.json();
        throw new Error(err.error || "Gagal menyimpan data");
      }
    } catch (error) {
      setNotif({ open: true, message: error.message, variant: "error" });
    } finally {
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 500);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-base-200/50", children: [
    /* @__PURE__ */ jsx(NavbarUser, { user }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-base-content mb-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-8 h-8 text-primary", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" }) }),
          "Lengkapi Biodata"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base-content/60 text-lg", children: "Mohon isi data diri santri, orang tua, dan alamat dengan lengkap dan benar sesuai dokumen resmi (KK/KTP)." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-base-100 rounded-[2rem] shadow-xl border border-base-200 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-base-200/50 p-4 border-b border-base-200 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `btn rounded-full px-6 flex-1 sm:flex-none ${activeTab === "pribadi" ? "btn-primary shadow-md" : "btn-ghost bg-base-100 border border-base-200 text-base-content/70"}`,
                onClick: () => setActiveTab("pribadi"),
                children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs", children: "1" }),
                  "Data Pribadi"
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `btn rounded-full px-6 flex-1 sm:flex-none ${activeTab === "ortu" ? "btn-primary shadow-md" : "btn-ghost bg-base-100 border border-base-200 text-base-content/70"}`,
                onClick: () => setActiveTab("ortu"),
                children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs", children: "2" }),
                  "Data Orang Tua"
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `btn rounded-full px-6 flex-1 sm:flex-none ${activeTab === "alamat" ? "btn-primary shadow-md" : "btn-ghost bg-base-100 border border-base-200 text-base-content/70"}`,
                onClick: () => setActiveTab("alamat"),
                children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs", children: "3" }),
                  "Alamat & Sekolah"
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `btn rounded-full px-6 flex-1 sm:flex-none ${activeTab === "program" ? "btn-primary shadow-md" : "btn-ghost bg-base-100 border border-base-200 text-base-content/70"}`,
                onClick: () => setActiveTab("program"),
                children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs", children: "4" }),
                  "Program"
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 md:p-10", children: [
            /* @__PURE__ */ jsxs("div", { className: activeTab === "pribadi" ? "block animate-fade-in" : "hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8", children: [
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6 text-primary", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-base-content", children: "Identitas Calon Santri" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                  /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Nama Lengkap" }) }),
                  /* @__PURE__ */ jsx("input", { type: "text", name: "namaLengkap", value: formData.namaLengkap, onChange: handleChange, placeholder: "Sesuai Akta Kelahiran/KK", className: "input input-bordered focus:border-primary w-full bg-base-200/30", required: true }),
                  fieldErrors.namaLengkap && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.namaLengkap }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "NIK" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "nik", value: formData.nik, onChange: handleChange, placeholder: "16 Digit NIK", maxLength: 16, className: "input input-bordered focus:border-primary w-full bg-base-200/30", required: true }),
                    fieldErrors.nik && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.nik }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "NISN" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "nisn", value: formData.nisn, onChange: handleChange, placeholder: "Nomor Induk Siswa", className: "input input-bordered focus:border-primary w-full bg-base-200/30", required: true }),
                    fieldErrors.nisn && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.nisn }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Tempat Lahir" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "tempatLahir", value: formData.tempatLahir, onChange: handleChange, placeholder: "Kota/Kab", className: "input input-bordered focus:border-primary w-full bg-base-200/30", required: true }),
                    fieldErrors.tempatLahir && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.tempatLahir }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Tanggal Lahir" }) }),
                    /* @__PURE__ */ jsx("input", { type: "date", name: "tanggalLahir", value: formData.tanggalLahir, onChange: handleChange, className: "input input-bordered focus:border-primary w-full bg-base-200/30", required: true }),
                    fieldErrors.tanggalLahir && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.tanggalLahir }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Jenis Kelamin" }) }),
                    /* @__PURE__ */ jsxs("select", { name: "jenisKelamin", value: formData.jenisKelamin, onChange: handleChange, className: "select select-bordered focus:border-primary w-full bg-base-200/30", required: true, children: [
                      /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Pilih" }),
                      /* @__PURE__ */ jsx("option", { value: "L", children: "Laki-Laki (Putra)" }),
                      /* @__PURE__ */ jsx("option", { value: "P", children: "Perempuan (Putri)" })
                    ] }),
                    fieldErrors.jenisKelamin && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.jenisKelamin }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Agama" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "agama", value: formData.agama, readOnly: true, className: "input input-bordered w-full bg-base-200/60 opacity-80 cursor-not-allowed" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Hobi" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "hobi", value: formData.hobi, onChange: handleChange, placeholder: "Cth: Membaca", className: "input input-bordered focus:border-primary w-full bg-base-200/30" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Cita-Cita" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "citaCita", value: formData.citaCita, onChange: handleChange, placeholder: "Cth: Guru", className: "input input-bordered focus:border-primary w-full bg-base-200/30" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: activeTab === "ortu" ? "block animate-fade-in" : "hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8", children: [
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6 text-primary", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-base-content", children: "Profil Orang Tua / Wali" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-5 bg-base-200/30 rounded-2xl border border-base-200", children: [
                  /* @__PURE__ */ jsxs("h4", { className: "font-bold text-lg text-primary mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center", children: "A" }),
                    "Data Ayah"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Nama Lengkap Ayah" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "namaAyah", value: formData.namaAyah, onChange: handleChange, placeholder: "Sesuai KTP", className: "input input-bordered focus:border-primary w-full bg-white dark:bg-base-100" }),
                    fieldErrors.namaAyah && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.namaAyah }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Pekerjaan Ayah" }) }),
                    /* @__PURE__ */ jsxs("select", { name: "pekerjaanAyah", value: formData.pekerjaanAyah, onChange: handleChange, className: "select select-bordered focus:border-primary w-full bg-white dark:bg-base-100", children: [
                      /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Pilih Pekerjaan" }),
                      /* @__PURE__ */ jsx("option", { value: "PNS", children: "Pegawai Negeri Sipil (PNS)" }),
                      /* @__PURE__ */ jsx("option", { value: "Swasta", children: "Pegawai Swasta" }),
                      /* @__PURE__ */ jsx("option", { value: "Wiraswasta", children: "Wiraswasta / Pengusaha" }),
                      /* @__PURE__ */ jsx("option", { value: "TNI/Polri", children: "TNI / Polri" }),
                      /* @__PURE__ */ jsx("option", { value: "Petani/Nelayan", children: "Petani / Nelayan" }),
                      /* @__PURE__ */ jsx("option", { value: "Lainnya", children: "Lainnya" })
                    ] }),
                    fieldErrors.pekerjaanAyah && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.pekerjaanAyah }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Penghasilan Per Bulan" }) }),
                    /* @__PURE__ */ jsxs("select", { name: "penghasilanAyah", value: formData.penghasilanAyah, onChange: handleChange, className: "select select-bordered focus:border-primary w-full bg-white dark:bg-base-100", children: [
                      /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Pilih Range Penghasilan" }),
                      /* @__PURE__ */ jsx("option", { value: "< 1jt", children: "Kurang dari Rp 1.000.000" }),
                      /* @__PURE__ */ jsx("option", { value: "1-3jt", children: "Rp 1.000.000 - Rp 3.000.000" }),
                      /* @__PURE__ */ jsx("option", { value: "3-5jt", children: "Rp 3.000.000 - Rp 5.000.000" }),
                      /* @__PURE__ */ jsx("option", { value: "> 5jt", children: "Lebih dari Rp 5.000.000" })
                    ] }),
                    fieldErrors.penghasilanAyah && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.penghasilanAyah }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-5 bg-base-200/30 rounded-2xl border border-base-200", children: [
                  /* @__PURE__ */ jsxs("h4", { className: "font-bold text-lg text-secondary mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center", children: "I" }),
                    "Data Ibu"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Nama Lengkap Ibu" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "namaIbu", value: formData.namaIbu, onChange: handleChange, placeholder: "Sesuai KTP", className: "input input-bordered focus:border-secondary w-full bg-white dark:bg-base-100" }),
                    fieldErrors.namaIbu && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.namaIbu }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Pekerjaan Ibu" }) }),
                    /* @__PURE__ */ jsxs("select", { name: "pekerjaanIbu", value: formData.pekerjaanIbu, onChange: handleChange, className: "select select-bordered focus:border-secondary w-full bg-white dark:bg-base-100", children: [
                      /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Pilih Pekerjaan" }),
                      /* @__PURE__ */ jsx("option", { value: "IRT", children: "Ibu Rumah Tangga (IRT)" }),
                      /* @__PURE__ */ jsx("option", { value: "PNS", children: "Pegawai Negeri Sipil (PNS)" }),
                      /* @__PURE__ */ jsx("option", { value: "Swasta", children: "Pegawai Swasta" }),
                      /* @__PURE__ */ jsx("option", { value: "Wiraswasta", children: "Wiraswasta / Pengusaha" }),
                      /* @__PURE__ */ jsx("option", { value: "Lainnya", children: "Lainnya" })
                    ] }),
                    fieldErrors.pekerjaanIbu && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.pekerjaanIbu }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Penghasilan Per Bulan" }) }),
                    /* @__PURE__ */ jsxs("select", { name: "penghasilanIbu", value: formData.penghasilanIbu, onChange: handleChange, className: "select select-bordered focus:border-secondary w-full bg-white dark:bg-base-100", children: [
                      /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Pilih Range Penghasilan" }),
                      /* @__PURE__ */ jsx("option", { value: "-", children: "Tidak Berpenghasilan" }),
                      /* @__PURE__ */ jsx("option", { value: "< 1jt", children: "Kurang dari Rp 1.000.000" }),
                      /* @__PURE__ */ jsx("option", { value: "1-3jt", children: "Rp 1.000.000 - Rp 3.000.000" }),
                      /* @__PURE__ */ jsx("option", { value: "> 3jt", children: "Lebih dari Rp 3.000.000" })
                    ] }),
                    fieldErrors.penghasilanIbu && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.penghasilanIbu }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "form-control w-full md:col-span-2 pt-2 border-t border-base-200 mt-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "label pt-2", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Nomor WhatsApp / HP Orang Tua yang Aktif" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "relative max-w-md", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 font-bold border-r border-base-300 pr-3", children: "+62" }),
                    /* @__PURE__ */ jsx("input", { type: "tel", name: "noTelpOrtu", value: formData.noTelpOrtu, onChange: handleChange, placeholder: "81234567890", className: "input input-bordered focus:border-primary w-full bg-base-200/30 pl-[70px]", required: true })
                  ] }),
                  /* @__PURE__ */ jsx("label", { className: "label pb-0", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-base-content/60", children: "Nomor ini akan digunakan untuk mengirimkan informasi kelulusan dan pembayaran." }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: activeTab === "alamat" ? "block animate-fade-in" : "hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8", children: [
                  /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6 text-primary", children: [
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" }),
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-base-content", children: "Alamat Rumah" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Alamat Lengkap" }) }),
                    /* @__PURE__ */ jsx("textarea", { name: "alamatLengkap", value: formData.alamatLengkap, onChange: handleChange, className: "textarea textarea-bordered h-24 focus:border-primary w-full bg-base-200/30", placeholder: "Nama Jalan, Gg, RT/RW, No Rumah", required: true }),
                    fieldErrors.alamatLengkap && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.alamatLengkap }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Provinsi" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "provinsi", value: formData.provinsi, onChange: handleChange, placeholder: "Cth: Jawa Tengah", className: "input input-bordered focus:border-primary w-full bg-base-200/30", required: true }),
                    fieldErrors.provinsi && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.provinsi }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                      /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Kabupaten/Kota" }) }),
                      /* @__PURE__ */ jsx("input", { type: "text", name: "kabupaten", value: formData.kabupaten, onChange: handleChange, placeholder: "Kab. / Kota", className: "input input-bordered focus:border-primary w-full bg-base-200/30", required: true }),
                      fieldErrors.kabupaten && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.kabupaten }) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                      /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Kecamatan" }) }),
                      /* @__PURE__ */ jsx("input", { type: "text", name: "kecamatan", value: formData.kecamatan, onChange: handleChange, placeholder: "Kecamatan", className: "input input-bordered focus:border-primary w-full bg-base-200/30", required: true }),
                      fieldErrors.kecamatan && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.kecamatan }) })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8", children: [
                  /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6 text-primary", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-base-content", children: "Riwayat Sekolah" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Nama Sekolah Asal" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "asalSekolah", value: formData.asalSekolah, onChange: handleChange, placeholder: "Cth: SD Negeri 1 Jakarta / SMP IT Baitul Hikmah", className: "input input-bordered focus:border-primary w-full bg-base-200/30", required: true }),
                    fieldErrors.asalSekolah && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.asalSekolah }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                    /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "NPSN Sekolah Asal" }) }),
                    /* @__PURE__ */ jsx("input", { type: "text", name: "npsnSekolahAsal", value: formData.npsnSekolahAsal, onChange: handleChange, placeholder: "8 Digit Nomor Pokok Sekolah Nasional", maxLength: 8, className: "input input-bordered focus:border-primary w-full bg-base-200/30" }),
                    fieldErrors.npsnSekolahAsal && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.npsnSekolahAsal }) }),
                    /* @__PURE__ */ jsx("label", { className: "label pb-0", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-base-content/60", children: "Isi jika diketahui. Bisa bertanya ke sekolah asal." }) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-8 p-4 bg-warning/10 border border-warning/20 rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6 text-warning flex-shrink-0", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z", clipRule: "evenodd" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-bold text-base-content mb-1", children: "Pernyataan Kebenaran Data" }),
                      /* @__PURE__ */ jsx("p", { className: "text-base-content/70", children: "Dengan menekan tombol simpan, Anda menyatakan bahwa seluruh data yang diisikan adalah benar dan dapat dipertanggungjawabkan keabsahannya." })
                    ] })
                  ] }) })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: activeTab === "program" ? "block animate-fade-in" : "hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 pb-2 border-b border-base-200 w-max pr-8", children: [
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6 text-primary", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-base-content", children: "Program" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: /* @__PURE__ */ jsxs("div", { className: "form-control w-full", children: [
                /* @__PURE__ */ jsx("label", { className: "label pt-0", children: /* @__PURE__ */ jsx("span", { className: "label-text font-semibold", children: "Pilih Program Pendaftaran" }) }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    name: "program",
                    value: formData.program,
                    onChange: handleChange,
                    className: "select select-bordered focus:border-primary w-full bg-base-200/30",
                    required: true,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Pilih Program" }),
                      programs.map((prog) => /* @__PURE__ */ jsx("option", { value: prog.name, children: prog.name }, prog.id)),
                      programs.length === 0 && /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Tidak ada program aktif" })
                    ]
                  }
                ),
                fieldErrors.program && /* @__PURE__ */ jsx("label", { className: "label py-1", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-error font-medium", children: fieldErrors.program }) }),
                /* @__PURE__ */ jsx("label", { className: "label pb-0", children: /* @__PURE__ */ jsx("span", { className: "label-text-alt text-base-content/60", children: "Pilih salah satu jalur pendaftaran yang tersedia." }) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-10 pt-6 border-t border-base-200 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-2 w-full sm:w-auto", children: activeTab !== "pribadi" && /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: "btn btn-outline border-base-300 hover:bg-base-200 flex-1 sm:flex-none",
                  onClick: () => {
                    if (activeTab === "program") setActiveTab("alamat");
                    else if (activeTab === "alamat") setActiveTab("ortu");
                    else setActiveTab("pribadi");
                  },
                  children: [
                    /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-5 h-5 mr-1", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" }) }),
                    "Kembali"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 w-full sm:w-auto", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSubmit(void 0, true),
                    disabled: isSaving,
                    className: "btn btn-ghost border border-base-300 flex-1 sm:flex-none",
                    children: "Simpan Draf"
                  }
                ),
                activeTab !== "program" ? /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    className: "btn btn-primary shadow-lg shadow-primary/30 flex-1 sm:flex-none",
                    onClick: () => {
                      if (activeTab === "pribadi") setActiveTab("ortu");
                      else if (activeTab === "ortu") setActiveTab("alamat");
                      else setActiveTab("program");
                    },
                    children: [
                      "Lanjut ke Selanjutnya",
                      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-5 h-5 ml-1", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" }) })
                    ]
                  }
                ) : /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "btn btn-success text-success-content shadow-lg shadow-success/30 flex-1 sm:flex-none text-base disabled:bg-success/50",
                    children: [
                      isSaving ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-sm" }) : /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", className: "w-5 h-5 mr-1", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12.75l6 6 9-13.5" }) }),
                      isSaving ? "Menyimpan..." : "Simpan & Selesai"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(TimelineProgress, { steps, contactUrl: "https://wa.me/123456789" }) })
      ] })
    ] }),
    notif.open && /* @__PURE__ */ jsx("div", { className: "toast toast-top toast-center z-50", children: /* @__PURE__ */ jsxs("div", { className: `alert ${notif.variant === "success" ? "alert-success" : "alert-error"} shadow-lg text-white font-medium`, children: [
      /* @__PURE__ */ jsx("span", { children: notif.message }),
      /* @__PURE__ */ jsx("button", { className: "btn btn-ghost btn-xs", onClick: () => setNotif({ ...notif, open: false }), children: "X" })
    ] }) }),
    /* @__PURE__ */ jsx("style", { children: `
  .animate-fade-in {
    animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
` })
  ] });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const session = await auth.api.getSession({
    headers: Astro2.request.headers
  });
  if (!session) {
    return Astro2.redirect("/login");
  }
  const userId = session.user.id;
  const registration = await ensureRegistration(userId);
  const [userData, profile, registrationPaths] = await Promise.all([
    getUser(userId),
    getProfileByUserId(userId),
    getRegistrationPaths(true)
  ]);
  const user = userData[0];
  const status = registration?.status || "DRAFT";
  const steps = [
    {
      title: "Daftar Akun",
      description: "Akun berhasil dibuat",
      status: "completed",
      href: "/user/dashboard"
    },
    {
      title: "Lengkapi Biodata",
      description: profile ? "Biodata sudah dilengkapi" : "Isi form data diri santri",
      status: profile ? "completed" : "current",
      href: "/user/biodata"
    },
    {
      title: "Pembayaran",
      description: "Bayar biaya pendaftaran",
      status: status === "PENDING" || status === "VERIFIED" ? "completed" : profile ? "current" : "upcoming",
      href: "/user/payment"
    },
    {
      title: "Upload Berkas",
      description: "KK, Akta Kelahiran, dll",
      status: status === "VERIFIED" ? "completed" : status === "PENDING" ? "current" : "upcoming",
      href: "/user/document"
    },
    {
      title: "Tes & Wawancara",
      description: "Tes masuk pondok",
      status: "upcoming",
      href: "#"
    },
    {
      title: "Hasil Seleksi",
      description: "Pengumuman Kelulusan",
      status: "upcoming",
      href: "#"
    }
  ];
  const dashboardUser = {
    name: user?.name || "User",
    registrationNumber: registration?.registrationNumber || null
  };
  const biodataInitialData = {
    ...registration,
    ...profile,
    // Ensure critical fields are explicitly present from profile if registration join was messy
    nik: profile?.nik || registration?.nik,
    nisn: profile?.nisn || registration?.nisn,
    placeOfBirth: profile?.placeOfBirth || registration?.placeOfBirth,
    dateOfBirth: profile?.dateOfBirth || registration?.dateOfBirth,
    gender: profile?.gender || registration?.gender,
    religion: profile?.religion || registration?.religion,
    hobby: profile?.hobby || registration?.hobby,
    ambition: profile?.ambition || registration?.ambition,
    program: profile?.program || registration?.program
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Biodata", "description": "Lengkapi Biodata" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Biodata", Biodata, { "client:load": true, "userId": userId, "user": dashboardUser, "initialData": biodataInitialData, "steps": steps, "programs": registrationPaths.map((p) => ({ id: p.id, name: p.name })), "client:component-hydration": "load", "client:component-path": "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/components/user/biodata", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/biodata/index.astro", void 0);

const $$file = "C:/Users/User/Documents/Rokib/Code/daftar-pondok/src/pages/user/biodata/index.astro";
const $$url = "/user/biodata";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
